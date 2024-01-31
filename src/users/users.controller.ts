import {
    Body,
    Controller,
    Post,
  } from '@nestjs/common';
  import { CreateUserDto} from './dto/createUser.dto';
  import { UsersService } from './users.service';
  
  @Controller('user')
  export class UsersController {
    constructor(
      private readonly userService: UsersService,
    ) {}
  
    @Post('register')
    create(@Body() createUserDto: CreateUserDto) {
      return this.userService.create(createUserDto);
    }
  }
  