import { Module } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteController } from './favorite.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';
import { Book } from 'src/books/entities/books.entity';
import { UsersService } from 'src/users/users.service';

@Module({
  providers: [FavoriteService, UsersService],
  controllers: [FavoriteController],
  imports: [TypeOrmModule.forFeature([
    Users, Book
  ])]
})
export class FavoriteModule {}
