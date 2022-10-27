import { Controller, Post, Body, Get } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register.user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * 获取用户列表
   */
  @Get()
  async fetchUserList() {
    return this.userService.fetchUserList();
  }

  /**
   * 登录操作
   */
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const data = await this.userService.login(loginUserDto);
    console.log(data);
    return await this.userService.login(loginUserDto);
  }

  /**
   * 注册操作
   */
  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    return await this.userService.register(registerUserDto);
  }
}
