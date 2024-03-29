import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dto/createUser.dto';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepo: Repository<Users>,
) {}
  
  findAall() {
    return this.userRepo.find()
   }

  async findById(id: number) {
    return await this.userRepo.findOne({ where: { id: id } });
  }

  async findOneWithUserName(email: string) {
    return await this.userRepo.findOne({ where: { email: email } });
  }

  async findOne(id: string) {
    const book = await this.userRepo.findOne({ where: { id: parseInt(id) }})
  if (!book) {
      throw new NotFoundException(`Kitap #${id} tapylmady`);
  }
  return book;
 }

  async create(createUserDto: CreateUserDto) {
    const student = await this.userRepo.create(createUserDto);
    await this.userRepo.save(student);
    const { password, ...result } = student;
    return result;
  }

  async count(): Promise<number> {
    return this.userRepo.count();
  }

  async getUserFavorites(userId: number): Promise<string[]> {
    const user = await this.userRepo.findOneOrFail({ where: { id: userId }});
    return user.favorites || [];
  }
}

 