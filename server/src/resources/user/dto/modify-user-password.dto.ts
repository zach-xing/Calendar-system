import { IsString } from 'class-validator';

export class ModifyUserPasswordDto {
  @IsString()
  id: string;

  @IsString()
  password: string;
}
