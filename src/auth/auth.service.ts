import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { hash, verify } from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { Cache } from '@nestjs/cache-manager';
import { RefreshDto } from './dto/Refresh.dto';
import { UserLoginDto } from 'src/users/dto/createUser.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('CACHE_MANAGER')
    private cacheManager: Cache,
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOneWithUserName(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(dto: UserLoginDto) {
    const { email, password } = dto;

    const user = await this.usersService.findOneWithUserName(email);

    if (!user) {
      return new NotFoundException();
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return new UnauthorizedException();
    }

    const payload = {
      id: user.id,
      email: user.email,
    };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '1h' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });
    const refresh = await hash(refreshToken);
    await this.cacheManager.set(user.id.toString(), refreshToken, 1000000);
    return {
      data: user,
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(dto: RefreshDto) {
    try {
      const refreshtoken = await this.jwtService.verify(dto.refreshToken);
      if (refreshtoken && refreshtoken.id) {
        const cachedRefreshToken = await this.cacheManager.get(
          refreshtoken.id.toString(),
        );
        if (!cachedRefreshToken) {
          return new UnauthorizedException();
        }
        if(cachedRefreshToken.toString()!==dto.refreshToken.toString()){
          return new UnauthorizedException();
        }
        
        const { id, email } = refreshtoken;
        const payload = {
          id: id.id,
          email: email,
        };
        const newAccessToken = this.jwtService.sign(payload, {
          expiresIn: '1h',
        });
        const newFefreshToken = this.jwtService.sign(payload, {
          expiresIn: '7d',
        });
        await this.cacheManager.set(
          id.toString(),
          newFefreshToken,
          1000000,
        );
        return {
          data: payload,
          accessToken: newAccessToken,
          refreshToken: newFefreshToken,
        };
      } else {
        return new UnauthorizedException();
      }
    } catch (err) {
      console.log(err);
    }
  }
}
