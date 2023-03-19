import { IsString } from 'class-validator';
import { CreateMemoDto } from './create-memo.dto';

export class ModifyMemoDto extends CreateMemoDto {
  @IsString()
  id: string;
}
