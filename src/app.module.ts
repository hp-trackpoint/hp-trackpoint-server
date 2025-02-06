import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { RedisModule } from './redis/redis.module';
import { TrackManageModule } from './track/track-manage.module';

@Module({
  imports: [PrismaModule, RedisModule, TrackManageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
