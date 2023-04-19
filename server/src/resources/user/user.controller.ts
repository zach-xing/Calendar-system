import { Controller, Post, Body, Get, Query, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login.dto';
import { ModifyUserPasswordDto } from './dto/modify-user-password.dto';

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

  /** 搜索 */
  @Get('search')
  async searchEvent(@Query('id') uid: string, @Query('title') title: string) {
    return await this.userService.searchEvent(uid, title);
  }

  @Get('firstScreen/:uid')
  async getFirstScreenData(@Param('uid') uid: string) {
    return await this.userService.getFirstScreenData(uid);
  }

  @Post('modifyPassword')
  async modifyUserPassword(@Body() dto: ModifyUserPasswordDto) {
    return await this.userService.modifyUserPassword(dto);
  }

  // @Post('video')
  // async getVideoData(@Body() dto: { buffer: any }) {
  //   console.log(dto);
  // }
}
