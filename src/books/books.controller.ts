import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards, Request, ParseIntPipe } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/createBook.dto';
import { UpdateBookDto } from './dto/updateBook.dto';
import { JwtGuard } from 'src/auth/guard/jwt-auth.guard';


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

  @Put(':id/rate')
  rateBook(@Param('id') id: string, @Body('rating') rating: number) {
      return this.booksService.rateBook(id, rating);
  }

  @Get(':id/rating')
  getBookRating(@Param('id') id: string) {
      return this.booksService.getBookRating(id);
  }

  @Post(':id/report')
async reportBook(@Param('id') id: string, @Body('report') report: string) {
  return this.booksService.reportBook(id, report);
  }

  // @UseGuards(JwtGuard)
  @Get(':id/report')
  async getBookReports(@Param('id') id: string, @Request() req) {
    const request = req;
  }

  @Post(':bookId/favorite/:userId')
    async addToFavorites(
        @Param('bookId') bookId: string,
        @Param('userId', ParseIntPipe) userId: number
    ) {
        await this.booksService.addToFavorites(bookId, userId);
        return 'Книга добавлена в избранное';
    }

}
