import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { format } from 'date-fns';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateMemoDto } from './dto/create-memo.dto';
import { ModifyMemoDto } from './dto/modify-memo.dto';

@Injectable()
export class MemoService {
  constructor(private db: PrismaService) {}

  async getMemoList(uid: string) {
    try {
      const data = await this.db.memo.findMany({
        where: {
          uid: uid,
        },
      });
      return data;
    } catch (error) {
      throw new HttpException('获取备忘录失败', HttpStatus.BAD_REQUEST);
    }
  }

  async createMemo(dto: CreateMemoDto) {
    try {
      console.log(dto);
      const now = format(new Date(), 'yyyy-MM-dd HH:mm');
      console.log(now);
      await this.db.memo.create({
        data: {
          ...dto,
          createTime: now,
          lastModifiedTime: now,
        },
      });
      return {
        message: '创建成功',
      };
    } catch (error) {
      console.error(error);
      throw new HttpException('传入数据有误', HttpStatus.BAD_REQUEST);
    }
  }

  async modifyMemo(dto: ModifyMemoDto) {
    try {
      const now = format(new Date(), 'yyyy-MM-dd HH:mm');
      await this.db.memo.update({
        data: {
          ...dto,
          lastModifiedTime: now,
        },
        where: {
          id: dto.id,
        },
      });
      return {
        message: '修改成功',
      };
    } catch (error) {
      throw new HttpException('传入数据有误', HttpStatus.BAD_REQUEST);
    }
  }

  async deleteMemo(id: string) {
    try {
      await this.db.memo.delete({
        where: {
          id,
        },
      });
      return {
        message: '删除成功',
      };
    } catch (error) {
      throw new HttpException('传入参数有误', HttpStatus.BAD_REQUEST);
    }
  }
}
