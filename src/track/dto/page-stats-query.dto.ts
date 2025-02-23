import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class PageStatsQueryDto {
  @IsNotEmpty()
  @IsString()
  cid: string;

  @IsOptional()
  @IsDateString()
  startTime?: string;

  @IsOptional()
  @IsDateString()
  endTime?: string;
}

export class RegionDto {
  @IsNotEmpty()
  @IsString()
  cid: string;
}
