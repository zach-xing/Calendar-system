import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class UpdateImportantDayDto {
  @IsString()
  id: string;

  @IsString()
  category: string;

  @IsString()
  title: string;

  @IsString()
  dateString: string;

  @IsNumber()
  remind: number; // 提醒

  @IsNumber()
  repeat: number;

  @IsString()
  desc?: string;
}
