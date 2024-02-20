import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { BooksService } from 'src/books/books.service';
import { UsersService } from 'src/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';
import { Book } from 'src/books/entities/books.entity';

@Module({
  controllers: [DashboardController],
  providers: [DashboardService, BooksService, UsersService],
  imports: [TypeOrmModule.forFeature([Users, Book])]
})
export class DashboardModule {}
