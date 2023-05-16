import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class EditNoteDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  text?: string;

  @IsBoolean()
  isFavorite: boolean = false;
  @IsBoolean()
  isDeleted: boolean = false;

  @IsOptional()
  x?: number;

  @IsOptional()
  y?: number;

  @IsOptional()
  width?: number;

  @IsOptional()
  height?: number;
}
