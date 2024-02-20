import { PartialType } from '@nestjs/mapped-types';
import { Expose } from 'class-transformer';
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, Matches, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from 'class-validator';
import { Role } from '../roles/roles.enum';

@ValidatorConstraint({ async: false })
export class PasswordMatchConstraint implements ValidatorConstraintInterface {
  validate(value: any) {
    const { password, confirmpassword } = value;
    return password === confirmpassword;
  }

  defaultMessage() {
    return 'password does not match';
  }
}

export function IsPasswordMatch(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: PasswordMatchConstraint,
    });
  };
}

export class CreateUserDto {
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  public firstname: string;

  @IsString()
  @IsNotEmpty()
  public lastname: string;

  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //   message: 'parol gaty gysga',
  // })
  public password: string;

  @IsString()
  @IsNotEmpty()
  @IsPasswordMatch({ message: 'parol dogry gelenok' })
  public confirmpassword: string;

  @IsEnum(Role)
  @IsNotEmpty()
  public role: string;
}

// export class UserDto {
//   @Expose()
//   public id: number;

//   @Expose()
//   public email: string;
// }


export class UserLoginDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  @IsString()
  public password: string;

  @IsNotEmpty()
  @IsString()
  public role: string;
}

// export class UserRole {
//   @Expose()
//   public id: number;

//   @Expose()
//   public role: string;
// }

export class UpdateUserDto extends PartialType(CreateUserDto) {}


