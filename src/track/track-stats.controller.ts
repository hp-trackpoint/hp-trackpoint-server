import { Controller, Get, Query } from '@nestjs/common';
import { TrackStatsService } from './track-stats.service';
import { PageStatsQueryDto, RegionDto } from './dto/page-stats-query.dto';

@Controller('track-stats')
export class TrackStatsController {
  constructor(private readonly trackStatsService: TrackStatsService) {}

  @Get('page')
  getPageStats(@Query() query: PageStatsQueryDto) {
    return this.trackStatsService.getPageStats(query);
  }

  @Get('region')
  getRegion(@Query() query: RegionDto) {
    return this.trackStatsService.getRegion(query);
  }
}
