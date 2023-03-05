import { IsString } from 'class-validator';

export class LoginUserDto {
  @IsString()
  account: string;

  @IsString()
  password: string;
}
