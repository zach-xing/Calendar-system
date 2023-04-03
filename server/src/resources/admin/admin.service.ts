import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private db: PrismaService) {}

  /** 获取所有的用户数据 */
  async getUserData() {
    const list = await this.db.user.findMany();
    return {
      list: list,
      total: list.length,
    };
  }

  /** 根据账号获取所有的日程数据 */
  async getScheduleWithAccount(account: string) {
    if (account.length === 0) {
      return await this.db.schedule.findMany();
    }

    const user = await this.db.user.findUnique({
      where: {
        account,
      },
    });

    if (!user) {
      throw new HttpException('没有该账号', HttpStatus.BAD_REQUEST);
    }

    const list = await this.db.schedule.findMany({
      where: {
        uid: user.id,
      },
    });
    return list;
  }
}
