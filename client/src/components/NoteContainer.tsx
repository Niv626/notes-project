import React, { useCallback, useContext, useEffect, useState } from "react";
import { Note } from "./Notes";
import {
  EditOutlined,
  DeleteOutlined,
  StarOutlined,
  StarFilled,
  PushpinOutlined,
} from "@ant-design/icons";
import "./note.css";
import { removeNoteById, setFavoriteNote } from "../api/noteApi";
import { useMutation, useQueryClient } from "react-query";
import SunEditor from "suneditor-react";
import EditNoteModal from "./Modals/AddEditModal/EditNoteModal";

export interface NoteProps {
  note: Note;
}

const NoteContainer = ({ note }: NoteProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: removeNoteById,
    onSuccess: () => queryClient.invalidateQueries("notes"),
  });

  const favoriteNoteMutation = useMutation({
    mutationFn: setFavoriteNote,
    onSuccess: () => {
      queryClient.invalidateQueries("notes");
    },
  });

  const { id: noteId } = note;

  return (
    <>
      <div className="note">
        <PushpinOutlined />
        <h1 className="title-truncate">{note.title}</h1>
        {/* <h3 className="body-truncate">{note.text}</h3> */}
        <div style={{ overflow: "hidden", paddingBottom: 100 }}>
          <SunEditor
            height="155px"
            disable
            disableToolbar
            hideToolbar
            setContents={note.text}
            defaultValue={note.text}
            setDefaultStyle="background-color: #f4f2e6; font-size: 50 px;border: none"
          ></SunEditor>
        </div>

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
              {note.isFavorite ? <StarFilled /> : <StarOutlined />}
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
