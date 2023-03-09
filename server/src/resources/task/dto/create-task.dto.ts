import { IsString, IsBoolean } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  uid: string;

  @IsString()
  title: string;

  @IsBoolean()
  isDone: boolean;

  @IsString()
  time: string;

  @IsString()
  desc: string;
}
