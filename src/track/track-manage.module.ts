import { Module } from '@nestjs/common';
import { TrackManageController } from './track-manage.controller';
import { TrackManageService } from './track-manage.service';
import { TrackReportController } from './track-report.controller';
import { TrackReportService } from './track-report.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TrackManageController, TrackReportController],
  providers: [TrackManageService, TrackReportService],
})
export class TrackManageModule {}