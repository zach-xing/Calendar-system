import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateEventDto {
  @IsString()
  category: string;

  @IsString()
  title: string;

  @IsBoolean()
  isFullDay?: boolean;

  @IsString()
  dateString: string;

  @IsString()
  startTime?: string;
  @IsString()
  endTime?: string;

  @IsNumber()
  remind: number; // 提醒
  @IsNumber()
  repeat?: number; // 重复

  @IsString()
  desc?: string;
}
