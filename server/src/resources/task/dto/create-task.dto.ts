import { IsString, IsBoolean, IsNumber } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  uid: string;

  @IsString()
  title: string;

  @IsBoolean()
  isDone: boolean;

  @IsString()
  time: string;

  @IsNumber()
  level: number;

  @IsString()
  desc: string;
}
