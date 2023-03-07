import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateScheduleDto {
  @IsString()
  uid: string;

  @IsString()
  title: string;

  @IsBoolean()
  isFullDay: boolean;

  @IsString()
  startTime: string;

  @IsString()
  endTime: string;

  @IsNumber()
  remind: number;

  @IsString()
  desc: string;
}
