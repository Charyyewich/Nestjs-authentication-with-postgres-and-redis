import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Roles } from 'src/entities/roles.entity';
import { BooksService } from 'src/books/books.service';
import { Book } from 'src/books/entities/books.entity';
import { Activities } from 'src/entities/activities.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Activities, Roles, Book])],
  controllers: [UsersController],
  providers: [UsersService, BooksService],
})

export class UsersModule {}