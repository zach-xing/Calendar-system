import { IsString } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  name: string;

  @IsString()
  account: string;

  @IsString()
  password: string;
}
