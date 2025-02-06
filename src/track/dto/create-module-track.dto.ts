import { IsNotEmpty, IsString, IsOptional, IsBoolean, IsNumber } from 'class-validator';

export class CreateModuleTrackDto {
  @IsNotEmpty({ message: '模块标识不能为空' })
  @IsString()
  bid: string;

  @IsNotEmpty({ message: '模块名称不能为空' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: '所属页面标识不能为空' })
  @IsString()
  pageCid: string;  // 改为 pageCid

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  status?: boolean;
}