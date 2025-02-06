import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TrackManageService } from './track-manage.service';
import { CreatePageTrackDto } from './dto/create-page-track.dto';
import { CreateModuleTrackDto } from './dto/create-module-track.dto';

@Controller('track-manage')
export class TrackManageController {
  constructor(private readonly trackManageService: TrackManageService) {}

  // 页面埋点管理
  @Post('page')
  createPageTrack(@Body() createPageTrackDto: CreatePageTrackDto) {
    return this.trackManageService.createPageTrack(createPageTrackDto);
  }

  @Get('page')
  findAllPageTracks(@Query('page') page?: number, @Query('pageSize') pageSize?: number) {
    return this.trackManageService.findAllPageTracks(page, pageSize);
  }

  @Get('page/:cid')
  findOnePageTrack(@Param('cid') cid: string) {
    return this.trackManageService.findOnePageTrack(cid);
  }

  @Patch('page/:cid')
  updatePageTrack(@Param('cid') cid: string, @Body() updateDto: Partial<CreatePageTrackDto>) {
    return this.trackManageService.updatePageTrack(cid, updateDto);
  }

  @Delete('page/:cid')
  removePageTrack(@Param('cid') cid: string) {
    return this.trackManageService.removePageTrack(cid);
  }

  // 模块埋点管理
  @Post('module')
  createModuleTrack(@Body() createModuleTrackDto: CreateModuleTrackDto) {
    return this.trackManageService.createModuleTrack(createModuleTrackDto);
  }

  @Get('module')
  findAllModuleTracks(@Query('page') page?: number, @Query('pageSize') pageSize?: number) {
    return this.trackManageService.findAllModuleTracks(page, pageSize);
  }

  @Get('module/:bid')
  findOneModuleTrack(@Param('bid') bid: string) {
    return this.trackManageService.findOneModuleTrack(bid);
  }

  @Patch('module/:bid')
  updateModuleTrack(@Param('bid') bid: string, @Body() updateDto: Partial<CreateModuleTrackDto>) {
    return this.trackManageService.updateModuleTrack(bid, updateDto);
  }

  @Delete('module/:bid')
  removeModuleTrack(@Param('bid') bid: string) {
    return this.trackManageService.removeModuleTrack(bid);
  }
}