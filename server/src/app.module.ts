import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './resources/user/user.module';
import { ScheduleModule } from './resources/schedule/schedule.module';
import { TaskModule } from './resources/task/task.module';
import { MemoModule } from './resources/memo/memo.module';
import { AdminModule } from './resources/admin/admin.module';

@Module({
  imports: [UserModule, ScheduleModule, TaskModule, MemoModule, AdminModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
