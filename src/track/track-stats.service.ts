import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PageStatsQueryDto } from './dto/page-stats-query.dto';

@Injectable()
export class TrackStatsService {
  constructor(private prisma: PrismaService) {}

  async getPageStats(query: PageStatsQueryDto) {
    const { cid, startTime, endTime } = query;

    const whereCondition: any = {
      page: { cid },
      ...(startTime && { eventTime: { gte: new Date(startTime) } }),
      ...(endTime && { eventTime: { lte: new Date(endTime) } }),
    };

    // 基础统计数据
    const basicStats = await this.prisma.pageTrackRecord.groupBy({
      by: ['environment'],
      where: whereCondition,
      _count: { id: true },
      _min: { eventTime: true },
      _max: { eventTime: true },
    });

    // UV 统计
    const uniqueUsers = await this.prisma.pageTrackRecord.groupBy({
      by: ['userId'],
      where: {
        ...whereCondition,
        userId: { not: null },
      },
    });

    // 设备统计
    const deviceStats = await this.prisma.pageTrackRecord.groupBy({
      by: ['deviceInfo'],
      where: whereCondition,
      _count: { id: true },
    });

    // 模块点击统计
    const moduleStats = await this.prisma.moduleTrackRecord.groupBy({
      by: ['moduleId'],
      where: {
        module: {
          page: { cid },
        },
        ...(startTime && { eventTime: { gte: new Date(startTime) } }),
        ...(endTime && { eventTime: { lte: new Date(endTime) } }),
      },
      _count: { id: true },
    });

    return {
      pageInfo: {
        cid,
        totalPV: basicStats.reduce((sum, item) => sum + item._count.id, 0),
        totalUV: uniqueUsers.length,
      },
      environmentStats: basicStats.map(stat => ({
        environment: stat.environment,
        pv: stat._count.id,
        firstVisit: stat._min.eventTime,
        lastVisit: stat._max.eventTime,
      })),
      deviceStats: deviceStats.map(stat => ({
        deviceInfo: stat.deviceInfo,
        count: stat._count.id,
      })),
      moduleStats: {
        totalClicks: moduleStats.reduce((sum, item) => sum + item._count.id, 0),
        modules: moduleStats,
      },
    };
  }
}