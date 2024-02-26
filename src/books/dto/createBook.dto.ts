import { IsString, IsNotEmpty, IsArray } from "class-validator";

export class CreateBookDto {
  @IsString()
  readonly id: number;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  readonly rating: number;

  @IsString({ each: true })
  @IsArray()
  readonly report: string[];
}