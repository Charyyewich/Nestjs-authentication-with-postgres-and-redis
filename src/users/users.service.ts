import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dto/createUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private readonly User,
  ) {}
  
  async findOne(id: number) {
    return await this.User.findOne({ where: { id: id } });
  }

  async findOneWithEmail(email: string) {
    return await this.User.findOne({ where: { email: email } });
  }

  async create(createUserDto: CreateUserDto) {
    const user = await this.User.create(createUserDto);
    await this.User.save(user);
    const { password, ...result } = user;
    return result;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.User.update(id, updateUserDto);
  }
}