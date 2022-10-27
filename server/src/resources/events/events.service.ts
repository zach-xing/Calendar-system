import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  handleDateGap,
  removeEventById,
  sortEvent,
} from 'src/utils/handle-date';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { CreateImportantDayDto } from './dto/create-importantDay.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { UpdateImportantDayDto } from './dto/update-importantDay.dto';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  /**
   * 获取事件列表
   */
  async findList(id: string) {
    const { list: listString } = await this.prisma.event.findUnique({
      where: {
        id: id,
      },
      select: {
        list: true,
      },
    });
    return listString !== null ? JSON.parse(listString) : [];
  }

  /**
   * 处理创建或更改事件
   */
  async handleCreateOrUpdateEvent(id: string, newList: string) {
    try {
      this.prisma.event.update({
        where: { id: id },
        data: { list: newList },
      });
    } catch (error) {
      this.prisma.event.create({
        data: {
          id: id,
          list: newList,
        },
      });
    }
    return 'success';
  }

  /**
   * 创建 schedule 事件
   */
  async createSchedule(userId: string, event: CreateScheduleDto) {
    const key = `${userId}#${event.dateString.slice(0, 7)}`;
    const oldList = await this.findList(key);
    const id = '' + uuidv4();
    const list = handleDateGap(event, id);
    return await this.handleCreateOrUpdateEvent(
      key,
      JSON.stringify(sortEvent([...oldList, ...list])),
    );
  }

  /**
   * 编辑 schedule 事件
   */
  async updateSchedule(userId: string, event: UpdateScheduleDto) {
    const key = `${userId}#${event.dateString.slice(0, 7)}`;
    const oldList = await this.findList(key);
    const removedList = removeEventById(event.id, oldList);
    const newList = handleDateGap(event, event.id);
    return await this.handleCreateOrUpdateEvent(
      key,
      JSON.stringify(sortEvent([...newList, ...removedList])),
    );
  }

  /**
   * 创建 importantDay 事件
   */
  async createImportantDay(userId: string, event: CreateImportantDayDto) {
    const key = `${userId}#${event.dateString.slice(0, 7)}`;
    const oldList = await this.findList(key);
    const id = '' + uuidv4();
    return await this.handleCreateOrUpdateEvent(
      key,
      JSON.stringify(
        sortEvent([
          ...oldList,
          {
            ...event,
            id: id,
          },
        ]),
      ),
    );
  }

  /**
   * 编辑 importantDay 事件
   */
  async updateImportantDay(userId: string, event: UpdateImportantDayDto) {
    const key = `${userId}#${event.dateString.slice(0, 7)}`;
    const oldList = await this.findList(key);
    const removedList = removeEventById(event.id, oldList);
    return await this.handleCreateOrUpdateEvent(
      key,
      JSON.stringify(sortEvent([...removedList, event])),
    );
  }
}
