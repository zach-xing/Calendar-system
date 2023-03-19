import { IsString } from 'class-validator';

export class CreateMemoDto {
  @IsString()
  title: string;

  @IsString()
  text: string;

  @IsString()
  uid: string;
}
