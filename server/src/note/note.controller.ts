import {
  Controller,
  Get,
  UseGuards,
  Patch,
  Body,
  Post,
  Delete,
  Param,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';

import { JwtGuard } from '../auth/guard';
import { CreateNoteDto, EditNoteDto } from './dto';
import { NoteService } from './note.service';

@UseGuards(JwtGuard)
@Controller('notes')
export class NoteController {
  constructor(private notesService: NoteService) {}

  @Post('create-note')
  createNote(@GetUser('id') userId: number, @Body() dto: CreateNoteDto) {
    return this.notesService.createNote(userId, dto);
  }

  @Get()
  getNotes(@GetUser('id') userId: number) {
    return this.notesService.getNotes(userId);
  }

  @Get()
  getNoteById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) noteId: number,
  ) {}

  @Patch(':id')
  editNoteById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) noteId: number,
    @Body() dto: EditNoteDto,
  ) {
    return this.notesService.editNoteById(userId, noteId, dto);
  }

  // @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteNoteById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) noteId: number,
  ) {
    return this.notesService.deleteNoteById(userId, noteId);
  }

  @Patch('favorite/:id')
  setNoteFavorite(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) noteId: number,
    @Body() dto: Partial<EditNoteDto>,
  ) {
    return this.notesService.setNoteFavorite(userId, noteId, dto);
  }
}
