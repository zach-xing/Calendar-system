import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '../../prisma/prisma.service';
import { ScheduleService } from '../schedule/schedule.service';
import { TaskService } from '../task/task.service';
import { MemoService } from '../memo/memo.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '7 days' },
    }),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    PrismaService,
    ScheduleService,
    TaskService,
    MemoService,
  ],
})
export class UserModule {}
