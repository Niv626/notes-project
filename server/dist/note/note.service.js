"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let NoteService = class NoteService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createNote(userId, dto) {
        const note = await this.prisma.note.create({
            data: Object.assign({ userId }, dto),
        });
        return note;
    }
    async getNotes(userId) {
        const notes = await this.prisma.note.findMany({
            where: {
                userId,
            },
        });
        return notes.sort((a, b) => (a.userId - b.userId ? -1 : 1));
    }
    async editNoteById(userId, noteId, dto) {
        const note = await this.prisma.note.findUnique({
            where: {
                id: noteId,
            },
        });
        if (!note || note.userId !== userId)
            throw new common_1.ForbiddenException('Access to resources denied');
        return this.prisma.note.update({
            where: {
                id: noteId,
            },
            data: Object.assign({}, dto),
        });
    }
    async deleteNoteById(userId, noteId) {
        const note = await this.prisma.note.findUnique({
            where: {
                id: noteId,
            },
        });
        if (!note || note.userId !== userId)
            throw new common_1.ForbiddenException('Access to resources denied');
        await this.prisma.note.delete({
            where: {
                id: noteId,
            },
        });
    }
    async setNoteFavorite(userId, noteId, dto) {
        const note = await this.prisma.note.findUnique({
            where: {
                id: noteId,
            },
        });
        if (!note || note.userId !== userId)
            throw new common_1.ForbiddenException('Access to resources denied');
        await this.prisma.note.update({
            where: {
                id: noteId,
            },
            data: Object.assign({ isFavorite: dto.isFavorite }, dto),
        });
    }
};
NoteService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], NoteService);
exports.NoteService = NoteService;
//# sourceMappingURL=note.service.js.map