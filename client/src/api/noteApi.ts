import { Note } from "../components/Notes/Notes";
import app from "./authApi";

export const getNotes = async () => {
  const res = await app.get("/notes");
  return res.data;
};

export const editNote = async (note: Note) => {
  const res = await app.patch(`/notes/${note.id}`, note);
  return res.data;
};

export const addNote = async (note: Partial<Note>) => {
  const res = await app.post(`/notes/create-note`, note);
  return res.data;
};

export const removeNoteById = async (noteId: number) => {
  const res = await app.delete(`/notes/${noteId}`);
  return res.data;
};

export const setFavoriteNote = async (note: Note) => {
  const res = await app.patch(`/notes/favorite/${note.id}`, {
    isFavorite: !note.isFavorite,
  });
  return res.data;
};

export const setDeletedNote = async (note: Note) => {
  const res = await app.patch(`/notes/trash/${note.id}`, {
    isDeleted: !note.isDeleted,
  });
  return res.data;
};
