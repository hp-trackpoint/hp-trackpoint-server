import { IsNotEmpty, IsString, IsNumber, IsOptional, IsObject } from 'class-validator';

export class TrackReportDto {
  @IsNotEmpty()
  @IsString()
  environment: string;

  @IsNotEmpty()
  @IsNumber()
  eventTime: number;

  @IsOptional()
  @IsNumber()
  userId?: number;

  @IsNotEmpty()
  @IsString()
  cid: string;

  @IsOptional()
  @IsString()
  bid?: string;

  @IsOptional()
  @IsObject()
  deviceInfo?: {
    os?: string;
    osVersion?: string;
    browser?: string;
    browserVersion?: string;
    deviceType?: string;
    region?: string;
  };

  @IsOptional()
  @IsString()
  url?: string;

  @IsOptional()
  @IsString()
  referrer?: string;

  @IsOptional()
  @IsObject()
  moduleInfo?: Record<string, any>;

  @IsOptional()
  @IsObject()
  extraInfo?: Record<string, any>;

  @IsNotEmpty()
  @IsString()
  sdkVersion: string;
}