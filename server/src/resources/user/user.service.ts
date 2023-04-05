import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { ScheduleService } from '../schedule/schedule.service';
import { TaskService } from '../task/task.service';
import { MemoService } from '../memo/memo.service';
import { format, isAfter, isEqual } from 'date-fns';
import { AdminService } from '../admin/admin.service';

@Injectable()
export class UserService {
  constructor(
    private db: PrismaService,
    private jwtService: JwtService,
    private scheduleService: ScheduleService,
    private taskService: TaskService,
    private memoService: MemoService,
    private adminService: AdminService,
  ) {}

  /** 注册 */
  async register(createUserDto: CreateUserDto) {
    try {
      await this.db.user.create({
        data: createUserDto,
      });
      await this.adminService.modifyUserInCrement('more');
      return new HttpException('创建成功', HttpStatus.OK);
    } catch (error) {
      throw new HttpException('创建用户出错', HttpStatus.BAD_REQUEST);
    }
  }

  /** 登录 */
  async login(loginUserDto: LoginUserDto) {
    const user = await this.db.user.findUnique({
      where: { account: loginUserDto.account },
    });
    if (user === null) {
      throw new HttpException('该账号不存在', HttpStatus.BAD_REQUEST);
    }

    if (user.password !== loginUserDto.password) {
      throw new HttpException('密码错误', HttpStatus.BAD_REQUEST);
    }

    const token = this.jwtService.sign({
      account: loginUserDto.account,
      password: loginUserDto.password,
    });
    return {
      id: user.id,
      name: user.name,
      account: user.account,
      access_token: token,
    };
  }

  /** 搜索 */
  async searchEvent(uid: string, title: string) {
    try {
      if (title.length === 0) {
        return {
          scheduleList: [],
          taskList: [],
        };
      }
      const scheduleList = await this.db.schedule.findMany({
        where: {
          uid: uid,
          title: {
            contains: title,
          },
        },
      });
      const taskList = await this.db.task.findMany({
        where: {
          uid: uid,
          title: {
            contains: title,
          },
        },
      });
      return {
        scheduleList: scheduleList,
        taskList,
      };
    } catch (error) {
      throw new HttpException('输入有误', HttpStatus.BAD_REQUEST);
    }
  }

  private isAfterAndEqual(time: Date): boolean {
    const curDayStr = format(new Date(), 'yyyy-MM-dd');

    const newTime = format(time, 'yyyy-MM-dd');

    return (
      isAfter(new Date(newTime), new Date(curDayStr)) ||
      isEqual(new Date(newTime), new Date(curDayStr))
    );
  }

  /**
   * 获取首屏数据
   * - 待开始日程
   * - 待完成日程
   * - 备忘录总数
   */
  async getFirstScreenData(uid: string) {
    const { list: scheduleList } = await this.scheduleService.getScheduleList(
      uid,
    );
    const { list: taskList } = await this.taskService.tasks(uid);
    const memoList = await this.memoService.getMemoList(uid);

    const afterScheduleSize = scheduleList.filter((item) =>
      this.isAfterAndEqual(new Date(item.startTime)),
    ).length;
    const afterTaskSize = taskList.filter(
      (item) => this.isAfterAndEqual(new Date(item.time)) && !item.isDone,
    ).length;
    return {
      afterScheduleSize,
      afterTaskSize,
      memoSize: memoList.length,
    };
  }
}
