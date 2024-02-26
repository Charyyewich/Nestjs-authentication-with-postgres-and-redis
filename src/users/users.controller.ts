import {
    Controller,
    Get,
  } from '@nestjs/common';
  import { UsersService } from './users.service';
import { JwtGuard } from 'src/auth/guard/jwt-auth.guard';

  
  @Controller('user')
  export class UsersController {
    constructor(
      private readonly userService: UsersService,
    ) {}
    
    @Get()
    findAall() {
      return this.userService.findAall()
    }

    @Get('loans/current')
    async getCur() {
      return 'current';
    }

    @Get('loans/previous')
    async getPrev() {
      return 'previous';
    }

    @Get('rules')
    async getRules() {
      return 'Everyone is required to maintain silence in library.Users can directly search for the books and their availability using the website.A book will be issued against a user only after production of their authorized library cards.Users are requested to check their loans on the website from time to time.';
    }
  }

