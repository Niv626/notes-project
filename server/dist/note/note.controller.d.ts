import { CreateNoteDto, EditNoteDto } from './dto';
import { NoteService } from './note.service';
export declare class NoteController {
    private notesService;
    constructor(notesService: NoteService);
    createNote(userId: number, dto: CreateNoteDto): Promise<import(".prisma/client").Note>;
    getNotes(userId: number): Promise<import(".prisma/client").Note[]>;
    getNoteById(userId: number, noteId: number): void;
    editNoteById(userId: number, noteId: number, dto: EditNoteDto): Promise<import(".prisma/client").Note>;
    deleteNoteById(userId: number, noteId: number): Promise<void>;
    setNoteFavorite(userId: number, noteId: number, dto: Partial<EditNoteDto>): Promise<void>;
}
