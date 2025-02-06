import { Module } from '@nestjs/common';
import { TrackManageController } from './track-manage.controller';
import { TrackManageService } from './track-manage.service';
import { TrackReportController } from './track-report.controller';
import { TrackReportService } from './track-report.service';
import { PrismaModule } from '../prisma/prisma.module';
import { TrackStatsController } from './track-stats.controller';
import { TrackStatsService } from './track-stats.service';

@Module({
  imports: [PrismaModule],
  controllers: [TrackManageController, TrackReportController, TrackStatsController],
  providers: [TrackManageService, TrackReportService, TrackStatsService],
})
export class TrackManageModule {}