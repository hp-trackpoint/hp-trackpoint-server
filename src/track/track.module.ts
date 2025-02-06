import { Module } from '@nestjs/common';
import { TrackManageController } from './track-manage.controller';
import { TrackManageService } from './track-manage.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TrackManageController],
  providers: [TrackManageService],
})
export class TrackModule {}