import { IsNotEmpty, IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreatePageTrackDto {
  @IsNotEmpty({ message: '页面标识不能为空' })
  @IsString()
  cid: string;

  @IsNotEmpty({ message: '页面名称不能为空' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: '页面路径不能为空' })
  @IsString()
  path: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  status?: boolean;
}