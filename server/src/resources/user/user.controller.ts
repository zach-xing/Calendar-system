import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * 注册操作
   */
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.userService.register(createUserDto);
  }

  /**
   * 登录操作
   */
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.userService.login(loginUserDto);
  }

  @Get('search')
  async searchEvent(@Query('id') uid: string, @Query('title') title: string) {
    return await this.userService.searchEvent(uid, title);
  }
}
