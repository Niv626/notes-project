import React, { useState } from "react";
import { Note } from "./Notes";
import {
  EditOutlined,
  DeleteOutlined,
  StarOutlined,
  StarFilled,
} from "@ant-design/icons";
import "./note.css";
import EditNoteModal from "./Modals/EditNoteModal";
import { removeNoteById, setFavoriteNote } from "../api/noteApi";
import { useMutation, useQueryClient } from "react-query";

export interface NoteProps {
  note: Note;
}

const NoteContainer = ({ note }: NoteProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(note.isFavorite);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: removeNoteById,
    onSuccess: () => queryClient.invalidateQueries("notes"),
  });
  console.log("note", note);

  const favoriteNoteMutation = useMutation({
    mutationFn: setFavoriteNote,
    onSuccess: () => {
      queryClient.invalidateQueries("notes");
      setIsFavorite((prev) => !prev);
    },
  });

  const { id: noteId } = note;

  return (
    <>
      <div className="note">
        <h1 className="title-truncate">{note.title}</h1>
        <h3 className="body-truncate">{note.text}</h3>

        <div className="note-footer">
          {/* <small>{note?.date}</small>  // need to add date */}

          <div
            className="update-note"
            style={{ float: "left", paddingRight: 10 }}
          >
            <EditOutlined
              onClick={() => {
                setIsModalOpen(true);
              }}
            />
            <EditNoteModal
              title={"Edit Note"}
              setIsModalOpen={setIsModalOpen}
              isModalOpen={isModalOpen}
              route={`/notes/${noteId}`}
              noteId={noteId}
              note={note}
            ></EditNoteModal>
            <span
              onClick={() => favoriteNoteMutation.mutate(note)}
              style={{ paddingLeft: 10, cursor: "pointer" }}
            >
              {isFavorite ? <StarFilled /> : <StarOutlined />}
            </span>
          </div>
          <div style={{ float: "right", paddingRight: 10 }}>
            <DeleteOutlined
              onClick={() => mutation.mutate(noteId)}
            ></DeleteOutlined>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteContainer;
