import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { CreateUserDto, UserLoginDto } from 'src/users/dto/createUser.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { RefreshJwtStrategy } from './strategies/refreshToken.strategy';
import { RefreshDto } from './dto/Refresh.dto';
import { SkipAuth } from './decorators/skip-auth';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @Post('student-signin')
  async registerUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Post('student-login')
  async login(@Body() dto:UserLoginDto) {
    return await this.authService.login(dto);
  }

  @UseGuards(RefreshJwtStrategy)
  @Post('refresh')
  async refreshToken(@Request() req, @Body() dto:RefreshDto) {
    return this.authService.refreshToken(dto);
  }
}