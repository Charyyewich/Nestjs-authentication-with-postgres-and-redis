import { Controller, Delete, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileEntity } from './upload.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Controller('upload')
export class UploadController {
  constructor(
    @InjectRepository(FileEntity)
    private readonly fileRepository: Repository<FileEntity>,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const newFile = await this.fileRepository.create({ filename: file.originalname });
    await this.fileRepository.save(newFile);
    return newFile;
  }

  @Delete('/:key')
  async deleteFile(@Param('key') filename: string) {
     return this.fileRepository.delete(filename);
  }
}
