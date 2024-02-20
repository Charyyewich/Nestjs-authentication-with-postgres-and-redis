import { Body, Controller, Delete, Get, Param, Patch, Post, } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/createBook.dto';
import { UpdateBookDto } from './dto/updateBook.dto';


@Controller('books')
export class BooksController {
  constructor(
    private readonly booksService: BooksService,
  ) {}


  @Get() 
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    console.log(typeof id); 
   return this.booksService.findOne('' + id);
  }

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    console.log(createBookDto instanceof CreateBookDto);
    return this.booksService.create(createBookDto)
  }

  @Patch(':id')
  update(@Param('id') id: string, updateBookDto: UpdateBookDto ) {
    return this.booksService.update(id, updateBookDto)
  }

  @Delete(':id')
  remove(@Param('id')id: string, body ) {
    return this.booksService.remove(id);
  }
}
