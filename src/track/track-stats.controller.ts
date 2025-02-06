import { Controller, Get, Query } from '@nestjs/common';
import { TrackStatsService } from './track-stats.service';
import { PageStatsQueryDto } from './dto/page-stats-query.dto';

@Controller('track-stats')
export class TrackStatsController {
  constructor(private readonly trackStatsService: TrackStatsService) {}

  @Get('page')
  getPageStats(@Query() query: PageStatsQueryDto) {
    return this.trackStatsService.getPageStats(query);
  }
}