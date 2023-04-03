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
}
