import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { CreateImportantDayDto } from './dto/create-importantDay.dto';
import { UpdateImportantDayDto } from './dto/update-importantDay.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  /**
   * 获取事件列表
   */
  @Get()
  async findList(@Query() params: { dateString: string; userId: string }) {
    return await this.eventsService.findList(
      `${params.userId}#${params.dateString}`,
    );
  }

  /**
   * 创建 schedule 事件
   */
  @Post('create/schedule/:id')
  async createSchedule(
    @Param('id') userId: string,
    @Body() body: CreateScheduleDto,
  ) {
    return await this.eventsService.createSchedule(userId, body);
  }

  /**
   * 编辑 schedule 事件
   */
  @Post('update/schedule/:id')
  async updateSchedule(
    @Param('id') userId: string,
    @Body() body: UpdateScheduleDto,
  ) {
    return await this.eventsService.updateSchedule(userId, body);
  }

  /**
   * 创建 importantDay 事件
   */
  @Post('create/importantDay/:id')
  async createImportantDay(
    @Param('id') userId: string,
    @Body() body: CreateImportantDayDto,
  ) {
    return await this.eventsService.createImportantDay(userId, body);
  }

  /**
   * 编辑 importantDay 事件
   */
  @Post('update/importantDay/:id')
  async updateImportantDay(
    @Param('id') userId: string,
    @Body() body: UpdateImportantDayDto,
  ) {
    return await this.eventsService.updateImportantDay(userId, body);
  }
}
