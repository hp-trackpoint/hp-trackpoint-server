import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TrackReportDto } from './dto/track-report.dto';

@Injectable()
export class TrackReportService {
  constructor(private prisma: PrismaService) {}

  async report(reportDto: TrackReportDto) {
    // 查找页面埋点定义
    const pageTrack = await this.prisma.pageTrack.findUnique({
      where: { cid: reportDto.cid },
    });

    if (!pageTrack) {
      throw new NotFoundException(`页面埋点 ${reportDto.cid} 不存在`);
    }

    // 如果包含 bid，说明是模块埋点
    if (reportDto.bid) {
      const moduleTrack = await this.prisma.moduleTrack.findUnique({
        where: { bid: reportDto.bid },
      });

      if (!moduleTrack) {
        throw new NotFoundException(`模块埋点 ${reportDto.bid} 不存在`);
      }

      // 创建模块埋点记录
      return this.prisma.moduleTrackRecord.create({
        data: {
          moduleId: moduleTrack.id,
          environment: reportDto.environment,
          eventTime: new Date(reportDto.eventTime),
          userId: reportDto.userId,
          deviceInfo: reportDto.deviceInfo,
          moduleInfo: reportDto.moduleInfo,
          extraInfo: reportDto.extraInfo,
          sdkVersion: reportDto.sdkVersion,
        },
      });
    }

    // 创建页面埋点记录
    return this.prisma.pageTrackRecord.create({
      data: {
        pageId: pageTrack.id,
        environment: reportDto.environment,
        eventTime: new Date(reportDto.eventTime),
        userId: reportDto.userId,
        deviceInfo: reportDto.deviceInfo,
        url: reportDto.url,
        referrer: reportDto.referrer,
        extraInfo: reportDto.extraInfo,
        sdkVersion: reportDto.sdkVersion,
      },
    });
  }
}