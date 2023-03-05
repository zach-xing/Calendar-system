import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private db: PrismaService, private jwtService: JwtService) {}

  /** 注册 */
  async register(createUserDto: CreateUserDto) {
    try {
      await this.db.user.create({
        data: createUserDto,
      });
      return new HttpException('创建成功', HttpStatus.OK);
    } catch (error) {
      throw new HttpException('创建用户出错', HttpStatus.BAD_REQUEST);
    }
  }

  /** 登录 */
  async login(loginUserDto: LoginUserDto) {
    const user = await this.db.user.findUnique({
      where: { account: loginUserDto.account },
    });
    if (user === null) {
      throw new HttpException('该账号不存在', HttpStatus.BAD_REQUEST);
    }

    if (user.password !== loginUserDto.password) {
      throw new HttpException('密码错误', HttpStatus.BAD_REQUEST);
    }

    const token = this.jwtService.sign({
      account: loginUserDto.account,
      password: loginUserDto.password,
    });
    return {
      id: user.id,
      name: user.name,
      account: user.account,
      access_token: token,
    };
  }
}
