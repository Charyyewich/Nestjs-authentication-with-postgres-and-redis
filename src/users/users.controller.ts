import {
    Body,
    Controller,
    Post,
    Get,
    Patch,
  } from '@nestjs/common';
  import { UsersService } from './users.service';
  
  @Controller('user')
  export class UsersController {
    constructor(
      private readonly userService: UsersService,
    ) {}


    @Get('loans/current')
    async getCur() {
      return 'current';
    }

    @Get('loans/previous')
    async getPrev() {
      return 'previous';
    }

    @Get('dashboard')
    async getDash() {
      return 'dashboard';
    }

    @Get('activities')
    async getAct() {
      return 'activities';
    }

    @Get('books')
    async getBook() {
      return 'books';
    }

    @Get('rules')
    async getRules() {
      return 'rules';
    }

    @Get('profile')
    async getProf() {
      return 'profile';
    }

    @Patch('profile')
    async patchProf() {
      return 'profile';
    }
    
}
