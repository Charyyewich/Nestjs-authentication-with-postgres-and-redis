import { IsString, IsNotEmpty } from "class-validator";

export class CreateBookDto {
  @IsString()
  readonly id: number;

  @IsString()
  @IsNotEmpty()
  readonly name: string;


}