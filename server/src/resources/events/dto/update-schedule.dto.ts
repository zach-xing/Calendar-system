import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class UpdateScheduleDto {
  @IsString()
  id: string;

  @IsString()
  category: string;

  @IsString()
  title: string;

  @IsBoolean()
  isFullDay?: boolean;

  @IsString()
  dateString: string;

  @IsString()
  startTime: string;
  @IsString()
  endTime: string;

  @IsNumber()
  remind: number; // 提醒

  @IsString()
  desc?: string;
}
