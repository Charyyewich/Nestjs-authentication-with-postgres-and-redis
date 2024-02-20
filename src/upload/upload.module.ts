import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from './upload.entity';


@Module({
  providers: [UploadService],
  controllers: [UploadController],
  imports: [TypeOrmModule.forFeature([FileEntity])]
})
export class UploadModule {}
