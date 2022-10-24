import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register.user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  /**
   * 登录操作
   */
  async login(loginUserDto: LoginUserDto) {
    const userInfo = await this.prisma.user.findUnique({
      where: {
        account: loginUserDto.account,
      },
    });
    if (userInfo === null) {
      throw new HttpException('该用户账号不存在', HttpStatus.BAD_REQUEST);
    } else {
      return {
        token: userInfo.name,
        ...userInfo,
      };
    }
  }

  /**
   * 注册操作
   */
  async register(registerUserDto: RegisterUserDto) {
    const userInfo = await this.prisma.user.findUnique({
      where: {
        account: registerUserDto.account,
      },
    });
    if (userInfo === null) {
      return await this.prisma.user.create({
        data: registerUserDto,
      });
    } else {
      throw new HttpException('该用户账户已存在', HttpStatus.BAD_REQUEST);
    }
  }
}
