import React, { useState } from "react";
import NoteContainer from "./NoteContainer";
import "./note.css";
import { PlusCircleOutlined } from "@ant-design/icons";
import AddNoteModal from "./Modals/AddEditModal/AddNoteModal";
import { useMatch, useParams } from "react-router-dom";

const colorsArray = [
  "#C0C8F3",
  "#E7F3CD",
  "#D4FFE3",
  "#FFF4BD",
  "#F5B1DF",
  "#DEF3B3",
];

export interface Note {
  text: any;
  title: string;
  isFavorite: boolean;
  isDeleted: boolean;
  type: string;
  id: number;
  color?: string;
  updatedAt: Date;
}

export interface NotesProps {
  notes: Note[];
}

const Notes = ({ notes }: NotesProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="grid-note">
        {notes
          ?.sort((a: { id: number }, b: { id: number }) =>
            a.id > b.id ? 1 : -1
          )
          ?.map((note: Note, idx: number) => {
            return (
              <NoteContainer
                key={idx}
                note={{ ...note, color: colorsArray[idx % colorsArray.length] }}
              />
            );
          })}
        <AddNoteModal
          title="Add Note"
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          route={`/notes/create-note`}
        ></AddNoteModal>
      </div>
    </>
  );
};

export default Notes;
