import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateNoteDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  text?: string;

  isFavorite: boolean = false;

  isDeleted: boolean = false;
}
