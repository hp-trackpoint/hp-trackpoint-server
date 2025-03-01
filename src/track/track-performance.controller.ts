import { Controller, Post, Body } from '@nestjs/common';
import { TrackReportService } from './track-report.service';
import { TrackPerformanceDto } from './dto/track-performance.dto';

@Controller('track-performance')
export class TrackPerformanceController {
  constructor(private readonly trackReportService: TrackReportService) {}

  @Post()
  report(@Body() reportDto: TrackPerformanceDto) {
    return this.trackReportService.report(reportDto);
  }
}