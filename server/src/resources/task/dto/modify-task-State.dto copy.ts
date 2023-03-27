import { IsString, IsBoolean } from 'class-validator';

export class ModifyTaskStateDto {
  @IsString()
  id: string;

  @IsBoolean()
  isDone: boolean;
}
