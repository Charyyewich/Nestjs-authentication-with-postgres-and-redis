import { Inject, Injectable, NotFoundException } from "@nestjs/common";

import { InjectRepository } from "@nestjs/typeorm";
import { BooksService } from "src/books/books.service";
import { StatsResponseDto } from "src/dashboard/dashboard.dto";
import { UsersService } from "src/users/users.service";
import { Repository } from "typeorm";

@Injectable()
export class DashboardService {
  constructor(
    private readonly usersService: UsersService,
    private readonly booksService: BooksService,
  ) {}
  async getStats(): Promise<StatsResponseDto> {
    const numberOfUsers = await this.usersService.count();
    const numberOfBooks = await this.booksService.count();

    return { numberOfUsers, numberOfBooks };
  }
}