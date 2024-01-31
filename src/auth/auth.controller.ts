import { Body, Controller, Post, HttpCode, HttpStatus, UseGuards, Request, UseInterceptors, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RefreshJwtGuard } from './guard/refresh-jwt-auth.guard';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';

@UseInterceptors(CacheInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.id, signInDto.email, signInDto.password);
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refrshToken(@Request() req) {
    const { id } = req.user;
    return this.authService.refreshToken(id);
  }

  @CacheTTL(60 * 1000)
  @Get()
  async getUsers() {
    return this.authService.retrieveUsersFromDb();
  }
}