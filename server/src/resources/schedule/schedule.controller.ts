import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { IScheduleListArgs } from 'types';
import { CreateScheduleDto } from './dto/create-schedule.dto';

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  /**
   * 根据 args 获取对应的 scheduleList
   */
  @Get('list')
  async getScheuleList(@Query() args: IScheduleListArgs) {
    return this.scheduleService.getScheduleList(args);
  }

  /** 创建 schedule */
  @Post('create')
  async createSchedule(@Body() dto: CreateScheduleDto) {
    return this.scheduleService.createSchedule(dto);
  }
}
