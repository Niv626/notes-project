import React, { useState } from "react";
import NoteContainer from "./NoteContainer";
import "./note.css";
import { PlusCircleOutlined } from "@ant-design/icons";
import AddNoteModal from "./Modals/AddEditModal/AddNoteModal";
import { useMatch, useParams } from "react-router-dom";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isFavoriteRoute = useMatch("dashboard/favorite");

  const templateNote = {
    text: (
      <PlusCircleOutlined
        onClick={() => setIsModalOpen(true)}
        style={{ fontSize: 80, paddingTop: 30 }}
      />
    ),
    title: "Add New Note",
    isFavorite: false,
    type: "template",
    id: 0,
  };

  return (
    <>
      <div className="grid-note">
        {!isFavoriteRoute && <NoteContainer key={"0"} note={templateNote} />}
        {notes
          ?.sort((a: { id: number }, b: { id: number }) =>
            a.id > b.id ? 1 : -1
          )
          ?.map((note: Note, idx: number) => (
            <NoteContainer key={idx} note={note} />
          ))}
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
