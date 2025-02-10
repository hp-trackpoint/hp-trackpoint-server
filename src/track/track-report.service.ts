import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TrackBatchReportDto } from './dto/track-batch-report.dto';

@Injectable()
export class TrackReportService {
  constructor(private prisma: PrismaService) {}

  async batchReport(reportDto: TrackBatchReportDto) {
    const { baseInfo, eventInfo } = reportDto;

    // 批量处理所有事件
    const results = await Promise.all(
      eventInfo.map(async (event) => {
        // 查找页面埋点定义
        const pageTrack = await this.prisma.pageTrack.findUnique({
          where: { cid: event.cid },
        });

        if (!pageTrack) {
          throw new NotFoundException(`页面埋点 ${event.cid} 不存在`);
        }

        // 如果包含 bid，说明是模块埋点
        if (event.bid) {
          const moduleTrack = await this.prisma.moduleTrack.findUnique({
            where: { bid: event.bid },
          });

          if (!moduleTrack) {
            throw new NotFoundException(`模块埋点 ${event.bid} 不存在`);
          }

          // 创建模块埋点记录
          return this.prisma.moduleTrackRecord.create({
            data: {
              moduleId: moduleTrack.id,
              environment: baseInfo.environment,
              eventTime: new Date(event.eventTime),
              userId: parseInt(baseInfo.userId, 10),
              deviceInfo: JSON.parse(JSON.stringify(baseInfo.deviceInfo)),
              moduleInfo: event.pageInfo
                ? JSON.parse(JSON.stringify(event.pageInfo))
                : null,
              extraInfo: event.extraInfo
                ? JSON.parse(JSON.stringify(event.extraInfo))
                : null,
              sdkVersion: baseInfo.sdkVersion,
              eventType: event.eventType,
              eventName: event.eventName,
            },
          });
        }

        // 创建页面埋点记录
        return this.prisma.pageTrackRecord.create({
          data: {
            pageId: pageTrack.id,
            environment: baseInfo.environment,
            eventTime: new Date(event.eventTime),
            userId: parseInt(baseInfo.userId, 10),
            deviceInfo: JSON.parse(JSON.stringify(baseInfo.deviceInfo)),
            url: event.pageInfo?.pageUrl,
            referrer: event.pageInfo?.referrer,
            extraInfo: event.extraInfo,
            sdkVersion: baseInfo.sdkVersion,
            eventType: event.eventType,
            eventName: event.eventName,
          },
        });
      }),
    );

    return results;
  }
}
