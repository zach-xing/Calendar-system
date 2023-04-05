import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  addDays,
  format,
  getDaysInMonth,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
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

  /** 获取首页的用户情况 */
  async getUserInCrement() {
    try {
      const day = await this.getUserInCrementWithCurDay();
      const week = await this.getUserInCrementWithWeek();
      const month = await this.getUserInCrementWithMonth();
      return {
        day,
        week,
        month,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException('获取用户的增长情况失败', HttpStatus.BAD_REQUEST);
    }
  }

  /** 获取当天用户的增长情况 */
  async getUserInCrementWithCurDay() {
    const v = await this.db.userIncrement.findUnique({
      where: {
        date: format(new Date(), 'yyyy-MM-dd'),
      },
    });
    return v?.num || 0;
  }

  /** 获取本周用户的增长情况 */
  async getUserInCrementWithWeek() {
    const dateStrings: string[] = [];
    const startOfWeekDate = startOfWeek(new Date(), { weekStartsOn: 1 });
    for (let i = 0; i < 7; i++) {
      const date = addDays(startOfWeekDate, i);
      const dateString = format(date, 'yyyy-MM-dd');
      dateStrings.push(dateString);
    }

    const res: number[] = [];
    for (const str of dateStrings) {
      const v = await this.db.userIncrement.findUnique({
        where: {
          date: str,
        },
      });
      res.push(v?.num || 0);
    }
    return res;
  }

  /** 获取本月用户的增长情况 */
  async getUserInCrementWithMonth() {
    const dateStrings = [];
    const startOfMonthDate = startOfMonth(new Date());
    const daysInMonth = getDaysInMonth(startOfMonthDate);
    for (let i = 0; i < daysInMonth; i++) {
      const date = addDays(startOfMonthDate, i);
      const dateString = format(date, 'yyyy-MM-dd');
      dateStrings.push(dateString);
    }

    const res: number[] = [];
    for (const str of dateStrings) {
      const v = await this.db.userIncrement.findUnique({
        where: {
          date: str,
        },
      });
      res.push(v?.num || 0);
    }
    return res;
  }

  /** 修改用户增长情况 */
  async modifyUserInCrement(method: 'more' | 'less') {
    try {
      const newDateStr = format(new Date(), 'yyyy-MM-dd');
      const data = await this.db.userIncrement.findUnique({
        where: {
          date: newDateStr,
        },
      });
      if (data === null) {
        await this.db.userIncrement.create({
          data: {
            date: newDateStr,
            num: 1,
          },
        });
      } else {
        const newNum = method === 'more' ? data.num + 1 : data.num - 1;
        await this.db.userIncrement.create({
          data: {
            date: newDateStr,
            num: newNum,
          },
        });
      }
      return {
        message: 'ok',
      };
    } catch (error) {
      console.error(error);
      throw new HttpException('修改增长出错', HttpStatus.BAD_REQUEST);
    }
  }

  /** 根据账号获取所有的日程数据 */
  async getScheduleWithAccount(account: string) {
    if (account.length === 0) {
      throw new HttpException('必须要填入账号', HttpStatus.BAD_REQUEST);
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
    return {
      userData: {
        name: user.name,
        account: user.account,
      },
      list,
    };
  }

  /** 根据账号获取对应的任务数据 */
  async getTaskWithAccount(account: string) {
    if (account.length === 0) {
      throw new HttpException('必须要填入账号', HttpStatus.BAD_REQUEST);
    }

    const user = await this.db.user.findUnique({
      where: {
        account,
      },
    });

    if (!user) {
      throw new HttpException('没有该账号', HttpStatus.BAD_REQUEST);
    }

    const list = await this.db.task.findMany({
      where: {
        uid: user.id,
      },
    });
    return {
      userData: {
        name: user.name,
        account: user.account,
      },
      list,
    };
  }

  /** 根据账号获取对应的备忘录信息 */
  async getMemoWithAccount(account: string) {
    if (account.length === 0) {
      throw new HttpException('必须要填入账号', HttpStatus.BAD_REQUEST);
    }

    const user = await this.db.user.findUnique({
      where: {
        account,
      },
    });

    if (!user) {
      throw new HttpException('没有该账号', HttpStatus.BAD_REQUEST);
    }

    const list = await this.db.memo.findMany({
      where: {
        uid: user.id,
      },
    });
    return {
      userData: {
        name: user.name,
        account: user.account,
      },
      list,
    };
  }
}
