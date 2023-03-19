import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { MemoService } from './memo.service';
import { CreateMemoDto } from './dto/create-memo.dto';
import { ModifyMemoDto } from './dto/modify-memo.dto';

@Controller('memo')
export class MemoController {
  constructor(private readonly memoService: MemoService) {}

  @Get(':uid')
  async getMemoList(@Param('uid') uid: string) {
    return this.memoService.getMemoList(uid);
  }

  @Post()
  async createMemo(@Body() dto: CreateMemoDto) {
    return this.memoService.createMemo(dto);
  }

  @Put()
  async modifyMemo(@Body() dto: ModifyMemoDto) {
    return this.memoService.modifyMemo(dto);
  }

  @Delete(':id')
  async deleteMemo(@Param('id') id: string) {
    return this.memoService.deleteMemo(id);
  }
}
