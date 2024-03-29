import { Controller, Get, Query } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('users')
  async getUserData() {
    return await this.adminService.getUserData();
  }

  @Get('schedule')
  async getScheduleWithAccount(@Query('account') account: string) {
    return await this.adminService.getScheduleWithAccount(account);
  }

  @Get('task')
  async getTaskWithAccount(@Query('account') account: string) {
    return await this.adminService.getTaskWithAccount(account);
  }

  @Get('memo')
  async getMemoWithAccount(@Query('account') account: string) {
    return await this.adminService.getMemoWithAccount(account);
  }

  @Get('userIncrement')
  async getHomeUserInfo() {
    return await this.adminService.getUserInCrement();
  }
}
