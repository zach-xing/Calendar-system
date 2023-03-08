import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
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
  @Get()
  async getScheuleList(@Query() args: IScheduleListArgs) {
    return this.scheduleService.getScheduleList(args);
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
}
