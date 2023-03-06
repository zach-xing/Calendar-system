import { Controller, Get, Query } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { IScheduleListArgs } from 'types';

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
}
