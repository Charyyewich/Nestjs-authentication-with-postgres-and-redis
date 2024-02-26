import { Controller, Get, Request } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Controller('favorite')
export class FavoriteController {
   constructor(
    private readonly usersService: UsersService
   ) {}

    @Get()
    async getUserFavorites(@Request() req): Promise<string[]> {
      const user = req.user;
      return this.usersService.getUserFavorites(user.id);
    }
}
