import { Controller, Post, Body } from '@nestjs/common';
import { TrackReportService } from './track-report.service';
import { TrackBatchReportDto } from './dto/track-batch-report.dto';

@Controller('track-report')
export class TrackReportController {
  constructor(private readonly trackReportService: TrackReportService) {}

  @Post()
  report(@Body() reportDto: TrackBatchReportDto) {
    return this.trackReportService.batchReport(reportDto);
  }
}
