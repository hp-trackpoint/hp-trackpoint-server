import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  PageStatsQueryDto,
  RegionDto,
  toDayRegionDto,
} from './dto/page-stats-query.dto';

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
      environmentStats: basicStats.map((stat) => ({
        environment: stat.environment,
        pv: stat._count.id,
        firstVisit: stat._min.eventTime,
        lastVisit: stat._max.eventTime,
      })),
      deviceStats: deviceStats.map((stat) => ({
        deviceInfo: stat.deviceInfo,
        count: stat._count.id,
      })),
      moduleStats: {
        totalClicks: moduleStats.reduce((sum, item) => sum + item._count.id, 0),
        modules: moduleStats,
      },
    };
  }
  async getRegion(query: RegionDto) {
    const { cid } = query;

    const whereCondition: any = {
      page: { cid },
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
      },
      _count: { id: true },
    });
    return {
      totalPV: basicStats.reduce((sum, item) => sum + item._count.id, 0),
      totalUV: uniqueUsers.length,
      ip: deviceStats.length,
      bounceRate: moduleStats.length / deviceStats.length,
      avgDuration:
        basicStats.reduce(
          (pre, cur: any) =>
            pre +
            (new Date(cur.lastVisit).getTime() -
              new Date(cur.firstVisit).getTime()),
          0,
        ) / basicStats.length,
    };
  }
  async getTodayRegion(query: toDayRegionDto) {
    const { cid, startTime, endTime } = query;
    const YesterdayParams: any = {
      page: { cid },
      ...(startTime && {
        eventTime: { gte: new Date(startTime).getTime() - 1 },
      }),

      ...(endTime && { eventTime: { lte: new Date(endTime).getTime() - 1 } }),
    };

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
    const YesterBasicStats = await this.prisma.pageTrackRecord.groupBy({
      by: ['environment'],
      where: YesterdayParams,
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
    const YesterUniqueUsers = await this.prisma.pageTrackRecord.groupBy({
      by: ['userId'],
      where: {
        ...YesterdayParams,
        userId: { not: null },
      },
    });
    // 设备统计
    const deviceStats = await this.prisma.pageTrackRecord.groupBy({
      by: ['deviceInfo'],
      where: whereCondition,
      _count: { id: true },
    });
    const YesterDeviceStats = await this.prisma.pageTrackRecord.groupBy({
      by: ['deviceInfo'],
      where: YesterdayParams,
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
      PV: [
        basicStats.reduce((sum, item) => sum + item._count.id, 0),
        YesterBasicStats.reduce((sum, item) => sum + item._count.id, 0),
      ], //pv
      totalUV: [uniqueUsers.length, YesterUniqueUsers.length], //uv
      IPNumbers: [deviceStats.length, YesterDeviceStats.length], //用户量
      newCount: YesterDeviceStats.length, //昨天用户(新用户)
      avgDuration:
        basicStats.reduce(
          (pre, cur: any) =>
            pre +
            (new Date(cur.lastVisit).getTime() -
              new Date(cur.firstVisit).getTime()),
          0,
        ) / basicStats.length,
    };
  }
}
