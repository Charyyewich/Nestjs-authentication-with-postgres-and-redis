import { PartialType } from '@nestjs/mapped-types';
import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AuthDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public password: string;
}

export class AuthServiceDto {
  @Expose()
  public id: number;

  @Expose()
  public email: string;
}
export class UpdateAuthDto extends PartialType(AuthDto) {}


