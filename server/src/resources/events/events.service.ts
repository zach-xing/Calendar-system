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
    try {
      const { list } = await this.prisma.event.findUniqueOrThrow({
        where: {
          id: id,
        },
        select: {
          list: true,
        },
      });
      return JSON.parse(list);
    } catch (error) {
      return [];
    }
  }

  /**
   * 处理创建或更改事件
   */
  async handleOperateEvent(id: string, newList: string) {
    try {
      await this.prisma.event.update({
        where: { id: id },
        data: { list: newList },
      });
    } catch (error) {
      await this.prisma.event.create({
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
    const list = handleDateGap({ ...event, id }, id);
    return await this.handleOperateEvent(
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
    return await this.handleOperateEvent(
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
    return await this.handleOperateEvent(
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
    return await this.handleOperateEvent(
      key,
      JSON.stringify(sortEvent([...removedList, event])),
    );
  }

  /**
   * 删除 事件
   */
  async removeEvent(userId: string, monthString: string, eventId: string) {
    const key = `${userId}#${monthString}`;
    const oldList = await this.findList(key);
    const removedList = removeEventById(eventId, oldList);
    return await this.handleOperateEvent(key, JSON.stringify(removedList));
  }
}
