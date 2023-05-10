import { PrismaService } from '../prisma/prisma.service';
import { CreateNoteDto, EditNoteDto } from './dto';
export declare class NoteService {
    private prisma;
    constructor(prisma: PrismaService);
    createNote(userId: number, dto: CreateNoteDto): Promise<import(".prisma/client").Note>;
    getNotes(userId: number): Promise<import(".prisma/client").Note[]>;
    editNoteById(userId: number, noteId: number, dto: EditNoteDto): Promise<import(".prisma/client").Note>;
    deleteNoteById(userId: number, noteId: number): Promise<void>;
    setNoteFavorite(userId: number, noteId: number, dto: Partial<EditNoteDto>): Promise<void>;
    setDeletedNote(userId: number, noteId: number, dto: Partial<EditNoteDto>): Promise<void>;
}
