import { IsString } from 'class-validator';
import { CreateTaskDto } from './create-task.dto';

export class ModifyTaskDto extends CreateTaskDto {
  @IsString()
  id: string;
}
