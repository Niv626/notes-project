import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class EditNoteDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  text?: string;

  isFavorite: boolean = false;
}
