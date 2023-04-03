import { Injectable } from '@nestjs/common';
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
}
