import { Type } from 'class-transformer';
import { IsArray, IsObject, ValidateNested } from 'class-validator';

export class DeviceInfoDto {
  os: string;
  osVersion: string;
  browser: string;
  browserVersion: string;
  deviceType: string;
  region: string;
}

export class BaseInfoDto {
  environment: string;
  userId: string;
  @Type(() => DeviceInfoDto)
  @ValidateNested()
  deviceInfo: DeviceInfoDto;
  sdkVersion: string;
}

export class PageInfoDto {
  pageUrl: string;
  referrer: string;
}

export class EventInfoDto {
  eventType: string;
  eventName: string;
  eventTime: number;
  cid: string;
  bid?: string;
  @Type(() => PageInfoDto)
  @ValidateNested()
  pageInfo?: PageInfoDto;
  @IsObject()
  extraInfo?: Record<string, any>;
}

export class TrackBatchReportDto {
  @ValidateNested()
  @Type(() => BaseInfoDto)
  baseInfo: BaseInfoDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EventInfoDto)
  eventInfo: EventInfoDto[];
}
