import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IScheduleListArgs } from 'types';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { ModifyScheduleDto } from './dto/modify-schedule.dto';

@Injectable()
export class ScheduleService {
  constructor(private db: PrismaService) {}

  /** 根据 args 获取对应的 scheduleList */
  async getScheduleList(args: IScheduleListArgs) {
    if (Object.keys(args).length === 0) {
      throw new HttpException('uid 不能为空', HttpStatus.BAD_REQUEST);
    }
    try {
      const list = await this.db.schedule.findMany({
        where: {
          uid: args.uid,
          OR: [
            {
              startTime: {
                contains: args.dateString || '',
              },
            },
            {
              endTime: {
                contains: args.dateString || '',
              },
            },
          ],
        },
      });
      return {
        total: list.length,
        list,
      };
    } catch (error) {
      throw new HttpException(
        '内部服务器错误',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /** 创建 schedule */
  async createSchedule(dto: CreateScheduleDto) {
    const user = await this.db.user.findUnique({
      where: {
        id: dto.uid,
      },
    });
    if (!user) {
      throw new HttpException('没有该用户', HttpStatus.BAD_REQUEST);
    }
    try {
      await this.db.schedule.create({
        data: dto,
      });
      return 'create successed';
    } catch (error) {
      console.error(error);
      throw new HttpException(
        '内部服务器创建失败',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /** 修改 schedule */
  async modifySchedule(dto: ModifyScheduleDto) {
    const user = await this.db.user.findUnique({
      where: {
        id: dto.uid,
      },
    });
    if (!user) {
      throw new HttpException('没有该用户', HttpStatus.BAD_REQUEST);
    }
    try {
      await this.db.schedule.update({
        where: {
          id: dto.id,
        },
        data: dto,
      });
      return 'modify successed';
    } catch (error) {
      console.error(error);
      throw new HttpException('修改失败', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
