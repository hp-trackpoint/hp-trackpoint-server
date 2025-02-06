import { Controller, Post, Body } from '@nestjs/common';
import { TrackReportService } from './track-report.service';
import { TrackReportDto } from './dto/track-report.dto';

@Controller('track-report')
export class TrackReportController {
  constructor(private readonly trackReportService: TrackReportService) {}

  @Post()
  report(@Body() reportDto: TrackReportDto) {
    return this.trackReportService.report(reportDto);
  }
}