import { Injectable, NotFoundException } from "@nestjs/common";
import { Book } from "./entities/books.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateBookDto } from "./dto/createBook.dto";
import { UpdateBookDto } from "./dto/updateBook.dto";



@Injectable()
export class BooksService {
    constructor(
      @InjectRepository(Book)
      private readonly bookRepository: Repository<Book>
   ) {}

   findAll() {
    return this.bookRepository.find()
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
}