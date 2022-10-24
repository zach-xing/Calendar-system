import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('login')
  async login(loginUserDto: LoginUserDto) {
    return await this.userService.login(loginUserDto);
  }
}
