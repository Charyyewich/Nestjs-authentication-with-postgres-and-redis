import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { Book } from "./entities/books.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateBookDto } from "./dto/createBook.dto";
import { UpdateBookDto } from "./dto/updateBook.dto";
import { CurrentUser } from "src/auth/decorators";
import { Users } from "src/entities/users.entity";



@Injectable()
export class BooksService {
    constructor(
      @InjectRepository(Book)
      private readonly bookRepository: Repository<Book>,
      @InjectRepository(Users)
      private readonly userRepo: Repository<Users> 
   ) {}

   findAll() {
    return this.bookRepository.find()
   }

   async addToFavorites(bookId: string, userId: number) {
    const book = await this.bookRepository.findOne({ where: { id: parseInt(bookId) }});
    if (!book) {
        throw new NotFoundException(`Книга с id ${bookId} не найдена`);
    }

    const user = await this.userRepo.findOne({ where: { id: userId }});
    if (!user) {
        throw new NotFoundException(`Пользователь с id ${userId} не найден`);
    }

    if (!user.favorites) {
        user.favorites = [];
    }

    if (!user.favorites.includes(bookId)) {
        user.favorites.push(bookId);
        await this.userRepo.save(user);
    }
}

   async findOne(id: string) {
      const book = await this.bookRepository.findOne({ where: { id: parseInt(id) }})
    if (!book) {
        throw new NotFoundException(`Kitap #${id} tapylmady`);
    }
    return book;
   }

   create(createBookDto: CreateBookDto) {
    const book = this.bookRepository.create(createBookDto);
    return this.bookRepository.save(book);
   }

   async update(id: string, updateBookDto: UpdateBookDto) {
     const book = await this.bookRepository.preload({
        id: +id,
        ...updateBookDto,
     });
     if(!book) {
        throw new NotFoundException(`Kitap #${id} tapylmady`);
     }
     return this.bookRepository.save(book);
   }

   async remove(id: string) {
    const book = await this.findOne(id);
    return this.bookRepository.remove(book);
   }

   async count(): Promise<number> {
      return this.bookRepository.count();
    }

    async rateBook(id: string, rating: number) {
      const book = await this.findOne(id);
      book.rating = rating;
      return this.bookRepository.save(book);
  }

  async getBookRating(id: string) {
      const book = await this.findOne(id);
      return book.rating;
  }
  
  async reportBook(id: string, report: string) {
    const book = await this.findOne(id);
    book.report.push(report);
    return this.bookRepository.save(book);
  }

  async getBookReports(id: string, currentUser: any) {
    const book = await this.findOne(id);
    if (!book) {
      throw new NotFoundException(`Книга #${id} не найдена`);
    }
    if (currentUser.role !== 'admin') {
      throw new UnauthorizedException('Недостаточно прав доступа');
    }
    return book.report;
  }
}