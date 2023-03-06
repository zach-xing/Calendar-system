import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './resources/user/user.module';
import { ScheduleModule } from './resources/schedule/schedule.module';

@Module({
  imports: [UserModule, ScheduleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
