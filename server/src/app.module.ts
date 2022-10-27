import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './resources/user/user.module';
import { EventsModule } from './resources/events/events.module';

@Module({
  imports: [PrismaModule, UserModule, EventsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
