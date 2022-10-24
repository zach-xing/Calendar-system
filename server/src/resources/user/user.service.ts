import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // loginUserDto: LoginUserDto
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
}
