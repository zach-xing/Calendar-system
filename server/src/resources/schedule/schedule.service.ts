import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IScheduleListArgs } from 'types';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ScheduleService {
  constructor(private db: PrismaService) {}

  async getScheduleList(args: IScheduleListArgs) {
    try {
      const list = await this.db.schedule.findMany({
        where: {
          uid: args.uid,
          OR: [
            {
              startTime: {
                contains: args.dateString,
              },
            },
            {
              endTime: {
                contains: args.dateString,
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
}
