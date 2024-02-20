import {
    Body,
    Controller,
    Post,
    Get,
    Patch,
    UseGuards,
    Request,
    Param,
    Delete,
    Put,
  } from '@nestjs/common';
  import { UsersService } from './users.service';
import { Roles } from './roles/roles.decorator';
import { BooksService } from 'src/books/books.service';
import { CreateBookDto } from 'src/books/dto/createBook.dto';
import { Role } from './roles/roles.enum';
import { UpdateBookDto } from 'src/books/dto/updateBook.dto';
import { CreateUserDto, UpdateUserDto } from './dto/createUser.dto';

  
  @Controller('user')
  export class UsersController {
    constructor(
      private readonly userService: UsersService,
      private readonly booksService: BooksService,
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

    // @Get('activities')
    // findAaall() {
    //   return this.userService.findAaall();
    // }

    @Get('books') 
    findAll() {
      return this.booksService.findAll();
    }

    @Post('books')
    @Roles(Role.Admin)
    create(@Body() createBookDto: CreateBookDto) {
      console.log(createBookDto instanceof CreateBookDto);
      return this.booksService.create(createBookDto)
    }

     @Patch(':id')
     @Roles(Role.Admin)
  update(@Param('id') id: string, updateBookDto: UpdateBookDto ) {
    return this.booksService.update(id, updateBookDto)
  }

  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id')id: string, body ) {
    return this.booksService.remove(id);
  }


    @Get('rules')
    async getRules() {
      return 'Everyone is required to maintain silence in library.Users can directly search for the books and their availability using the website.A book will be issued against a user only after production of their authorized library cards.Users are requested to check their loans on the website from time to time.';
    }

    // @Put('profile')
    // updatePro(@Body() dto: CreateUserDto) {
    //   return this.userService.update(dto);
    // }
  }

