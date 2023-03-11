import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { ModifyTaskDto } from './dto/modify-task.dto';

@Injectable()
export class TaskService {
  constructor(private db: PrismaService) {}

  /** 获取 task 列表 */
  async tasks(uid: string, dateString: string) {
    try {
      const list = await this.db.task.findMany({
        where: {
          uid: uid,
          time: {
            contains: dateString || '',
          },
        },
      });
      return {
        total: list.length,
        list,
      };
    } catch (error) {
      throw new HttpException(
        error.meta.message || '服务器获取tasks出错',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createTask(dto: CreateTaskDto) {
    const user = await this.db.user.findUnique({
      where: {
        id: dto.uid,
      },
    });
    if (!user) {
      throw new HttpException('没有该用户', HttpStatus.BAD_REQUEST);
    }
    try {
      await this.db.task.create({
        data: dto,
      });
      return 'create task success';
    } catch (error) {
      throw new HttpException(
        error?.meta?.message || '服务端创建失败',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async modifyTask(dto: ModifyTaskDto) {
    const user = await this.db.user.findUnique({
      where: {
        id: dto.uid,
      },
    });
    if (!user) {
      throw new HttpException('没有该用户', HttpStatus.BAD_REQUEST);
    }
    try {
      await this.db.task.update({
        data: dto,
        where: {
          id: dto.id,
        },
      });
      return {
        message: 'modify task successed',
      };
    } catch (error) {
      throw new HttpException(
        error?.meta?.message || '服务端修改task失败',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteTaskById(id: string) {
    try {
      await this.db.task.delete({
        where: {
          id,
        },
      });
      return {
        message: 'delete task successed',
      };
    } catch (error) {
      throw new HttpException(
        error?.meta?.message || '删除失败',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
