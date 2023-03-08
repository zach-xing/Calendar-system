import { IsString } from 'class-validator';
import { CreateScheduleDto } from './create-schedule.dto';

export class ModifyScheduleDto extends CreateScheduleDto {
  @IsString()
  id: string;
}
