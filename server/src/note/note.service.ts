import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNoteDto, EditNoteDto } from './dto';

@Injectable()
export class NoteService {
  constructor(private prisma: PrismaService) {}

  async createNote(userId: number, dto: CreateNoteDto) {
    const note = await this.prisma.note.create({
      data: {
        userId,
        ...dto,
      },
    });
    return note;
  }

  async getNotes(userId: number) {
    const notes = await this.prisma.note.findMany({
      where: {
        userId,
      },
    });

    return notes.sort((a, b) => (a.userId - b.userId ? -1 : 1));
  }

  async editNoteById(userId: number, noteId: number, dto: EditNoteDto) {
    // get the note by id
    const note = await this.prisma.note.findUnique({
      where: {
        id: noteId,
      },
    });

    // check if user has the note
    if (!note || note.userId !== userId)
      throw new ForbiddenException('Access to resources denied');

    return this.prisma.note.update({
      where: {
        id: noteId,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteNoteById(userId: number, noteId: number) {
    const note = await this.prisma.note.findUnique({
      where: {
        id: noteId,
      },
    });

    // check if user owns the note
    if (!note || note.userId !== userId)
      throw new ForbiddenException('Access to resources denied');

    await this.prisma.note.delete({
      where: {
        id: noteId,
      },
    });
  }

  async setNoteFavorite(
    userId: number,
    noteId: number,
    dto: Partial<EditNoteDto>,
  ) {
    const note = await this.prisma.note.findUnique({
      where: {
        id: noteId,
      },
    });

    // check if user owns the note
    if (!note || note.userId !== userId)
      throw new ForbiddenException('Access to resources denied');

    await this.prisma.note.update({
      where: {
        id: noteId,
      },
      data: {
        isFavorite: dto.isFavorite,
        ...dto,
      },
    });
  }

  async setDeletedNote(
    userId: number,
    noteId: number,
    dto: Partial<EditNoteDto>,
  ) {
    const note = await this.prisma.note.findUnique({
      where: {
        id: noteId,
      },
    });

    // check if user owns the note
    if (!note || note.userId !== userId)
      throw new ForbiddenException('Access to resources denied');

    await this.prisma.note.update({
      where: {
        id: noteId,
      },
      data: {
        isDeleted: dto.isDeleted,
        ...dto,
      },
    });
  }
}
