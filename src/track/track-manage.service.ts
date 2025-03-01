import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePageTrackDto } from './dto/create-page-track.dto';
import { CreateModuleTrackDto } from './dto/create-module-track.dto';

@Injectable()
export class TrackManageService {
  constructor(private prisma: PrismaService) {}

  // 创建页面埋点（Create）
  async createPageTrack(createPageTrackDto: CreatePageTrackDto) {
    return this.prisma.pageTrack.create({
      data: createPageTrackDto,
    });
  }

  // 查询所有页面埋点（Read）
  async findAllPageTracks(page = 1, pageSize = 10) {//查询全部PageTrackRecord表
    const total = await this.prisma.pageTrack.count();
    const items = await this.prisma.pageTrack.findMany({
      skip: (page - 1) * pageSize, // 跳过前面的记录，实现分页的原理
      take: pageSize * 1,  // 确保是数字类型
      include: {
        _count: {
          select: { records: true }
        }
      },
      orderBy: { createTime: 'desc' },
    });

    return { items, total, page, pageSize };
  }

  // 查询单个页面埋点（Read）
  async findOnePageTrack(cid: string) {//根据cid查询PageTrackRecord表
    const pageTrack = await this.prisma.pageTrack.findUnique({
      where: { cid },
      include: {
        _count: {
          select: { records: true },
        },
      },
    });

    if (!pageTrack) {
      throw new NotFoundException(`页面埋点 ${cid} 不存在`);
    }

    return pageTrack;
  }

  // 更新页面埋点（Update）
  async updatePageTrack(cid: string, updateDto: Partial<CreatePageTrackDto>) {
    await this.findOnePageTrack(cid);
    return this.prisma.pageTrack.update({
      where: { cid },
      data: updateDto,
    });
  }

  // 删除页面埋点（Delete）
  async removePageTrack(cid: string) {
    await this.findOnePageTrack(cid);
    return this.prisma.pageTrack.delete({
      where: { cid },
    });
  }

  // 模块埋点管理
  async createModuleTrack(createModuleTrackDto: CreateModuleTrackDto) {
    // 验证页面是否存在
    const pageTrack = await this.prisma.pageTrack.findUnique({
      where: { cid: createModuleTrackDto.pageCid },
    });
  
    if (!pageTrack) {
      throw new NotFoundException(`页面埋点 ${createModuleTrackDto.pageCid} 不存在`);
    }
    
    // 构建完整的模块埋点创建数据
    const moduleTrackData = {
      ...createModuleTrackDto,
      page: {
        connect: {
          id: pageTrack.id
        }
      }
    };
    
    return this.prisma.moduleTrack.create({
      data: {
        bid: moduleTrackData.bid,
        name: moduleTrackData.name,
        description: moduleTrackData.description,
        status: moduleTrackData.status,
        page: moduleTrackData.page
      },
    });
  }

  async findAllModuleTracks(page = 1, pageSize = 10) {
    const total = await this.prisma.moduleTrack.count();
    const items = await this.prisma.moduleTrack.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize * 1,
      include: {
        page: true,
        _count: {
          select: { records: true },
        },
      },
      orderBy: { createTime: 'desc' },
    });

    return { items, total, page, pageSize };
  }

  async findOneModuleTrack(bid: string) {
    const moduleTrack = await this.prisma.moduleTrack.findUnique({
      where: { bid },
      include: {
        page: true,
        _count: {
          select: { records: true },
        },
      },
    });

    if (!moduleTrack) {
      throw new NotFoundException(`模块埋点 ${bid} 不存在`);
    }

    return moduleTrack;
  }

  async updateModuleTrack(bid: string, updateDto: Partial<CreateModuleTrackDto>) {
    await this.findOneModuleTrack(bid);
    return this.prisma.moduleTrack.update({
      where: { bid },
      data: updateDto,
    });
  }

  async removeModuleTrack(bid: string) {
    await this.findOneModuleTrack(bid);
    return this.prisma.moduleTrack.delete({
      where: { bid },
    });
  }
}