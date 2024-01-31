import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { Cache } from '@nestjs/cache-manager';


@Injectable()
export class AuthService {
  constructor(
    @Inject('CACHE_MANAGER')
    private cacheManager: Cache,
    private usersService: UsersService,
    private jwtService: JwtService) {}
  

  async signIn(
    id: number,
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOneWithEmail(email);
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOneWithEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async refreshToken(email: string) {
    const payload = {
     email: email,
      sub: {
      
      },
    };

   return {
      accessToken: this.jwtService.sign(payload)
    }; 
  }

  // async getUsers() {
  //     await this.cacheManager.set('id1', 'Salam123');
  //     return this.cacheManager.get('Acar1');
  // }

  async retrieveUsersFromDb() {
    return new Promise((resolve) => {
        setTimeout(() => {
            const users = [
                {
                email: 'Kerem@gmail.com', password:'123', RefreshToken: 'werwshcxjvbsdnbfmwnbjhbkaj'
                },
            ];
            resolve(users);
        }, 1000);
    })
  }
}
   

