import React from "react";
import NoteContainer from "./NoteContainer";
import "./note.css";

export interface Note {
  text: any;
  title: string;
  isFavorite: boolean;
  type: string;
  id: number;
}

export interface NotesProps {
  notes: Note[];
}

const Notes = ({ notes }: NotesProps) => {
  return (
    <>
      <div className="grid-note">
        {notes
          ?.sort((a: { id: number }, b: { id: number }) =>
            a.id > b.id ? 1 : -1
          )
          ?.map((note: Note, idx: number) => (
            <NoteContainer key={idx} note={note} />
          ))}
      </div>
    </>
  );
};

export default Notes;
