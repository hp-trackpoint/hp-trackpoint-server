import { IsNotEmpty, IsString, IsNumber, IsOptional, IsObject } from 'class-validator';

export class TrackPerformanceDto {
  @IsNotEmpty()
  @IsString()
  cid?: string;

  @IsOptional()
  @IsString()
  bid?: string;

  @IsOptional()
  @IsObject()
  extraInfo?: Record<string, any>;
}
