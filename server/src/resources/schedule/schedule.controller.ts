import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { IScheduleListArgs } from 'types';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { ModifyScheduleDto } from './dto/modify-schedule.dto';

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  /**
   * 根据 args 获取对应的 scheduleList
   */
  @Get(':uid')
  async getScheuleList(
    @Param('uid') uid: string,
    @Query('dateString') dateString?: string,
  ) {
    return this.scheduleService.getScheduleList(uid, dateString);
  }

  /** 创建 schedule */
  @Post()
  async createSchedule(@Body() dto: CreateScheduleDto) {
    return this.scheduleService.createSchedule(dto);
  }

  /** 修改 schedule */
  @Put()
  async modifySchedule(@Body() dto: ModifyScheduleDto) {
    return this.scheduleService.modifySchedule(dto);
  }

  @Delete(':id')
  async deleteSchedule(@Param('id') id: string) {
    return this.scheduleService.deleteScheduleById(id);
  }
}
