import React, { memo, useState } from "react";
import { Note } from "./Notes";
import {
  EditOutlined,
  DeleteOutlined,
  StarOutlined,
  StarFilled,
  PushpinOutlined,
  RestOutlined,
} from "@ant-design/icons";
import "./note.css";
import {
  removeNoteById,
  setDeletedNote,
  setFavoriteNote,
} from "../../api/noteApi";
import { useMutation, useQueryClient } from "react-query";
import EditNoteModal from "../Modals/AddEditModal/EditNoteModal";
import { Tooltip } from "antd";
import { useMatch } from "react-router-dom";
import TextEditor from "../TextEditor/TextEditor";

export interface NoteProps {
  note: Note;
}

const NoteContainer = ({ note }: NoteProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isTrashRoute = useMatch("dashboard/trash");

  const { updatedAt } = note;
  const lastUpdate = new Date(updatedAt);

  const queryClient = useQueryClient();

  const deleteNoteForeverMutation = useMutation({
    mutationFn: removeNoteById,
    onSuccess: () => queryClient.invalidateQueries("notes"),
  });

  const deleteNoteMutation = useMutation({
    mutationFn: setDeletedNote,
    onSuccess: () => {
      queryClient.invalidateQueries("notes");
    },
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
      <div
        className="note"
        style={{
          backgroundColor: note.color,
        }}
      >
        <PushpinOutlined />
        <h1 className="title-truncate">{note.title}</h1>
        {note.type === "template" ? (
          <>{note.text}</>
        ) : (
          <>
            <div
              style={{
                overflow: "hidden",
              }}
            >
              <TextEditor
                disable
                disableToolbar
                hideToolbar
                content={note.text}
                defaultValue={note.text}
                setDefaultStyle={`background-color: ${note.color}; font-size: 50 px;border: none;     text-overflow: ellipsis;
                              overflow: hidden;
                              display: -webkit-box;
                              -webkit-line-clamp: 9;max-height: 180px; 
                              -webkit-box-orient: vertical; padding: 0px`}
              ></TextEditor>
            </div>
            <div className="note-footer">
              {/* <small>{note?.date}</small>  // need to add date */}
              <div
                className="update-note"
                style={{ float: "left", paddingRight: 10 }}
              >
                {!isTrashRoute && (
                  <Tooltip title="Edit Note">
                    <EditOutlined
                      // style={{ filter: "drop-shadow(9px 8px 3px black)" }}
                      // onMouseMove={(e) => console.log("e", e)}
                      onClick={() => {
                        setIsModalOpen(true);
                      }}
                    />
                  </Tooltip>
                )}
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
                  <Tooltip
                    title={`${
                      note.isFavorite ? "Undo Favorite" : "Set Favorite"
                    }`}
                  >
                    {!isTrashRoute &&
                      (note.isFavorite ? <StarFilled /> : <StarOutlined />)}
                  </Tooltip>
                </span>
              </div>
              {/* <small style={{ color: "rgba(0,0,0,0.7)", paddingRight: 7 }}>
                Last Update:&nbsp;
                {lastUpdate.toLocaleString("en-US", {
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  month: "short",
                })}
              </small> */}
              <div
                style={{ float: "right", paddingRight: 10, cursor: "pointer" }}
              >
                <Tooltip
                  title={`${
                    isTrashRoute ? "Delete Note Forever" : "Remove Note"
                  }`}
                >
                  <DeleteOutlined
                    onClick={() => {
                      isTrashRoute
                        ? deleteNoteForeverMutation.mutate(noteId)
                        : deleteNoteMutation.mutate(note);
                    }}
                  />
                </Tooltip>
                {isTrashRoute && (
                  <Tooltip title="Restore Note">
                    <RestOutlined
                      style={{ paddingLeft: 10 }}
                      onClick={() => deleteNoteMutation.mutate(note)}
                    />
                  </Tooltip>
                )}
              </div>
            </div>
            {/* <small style={{ color: "rgba(0,0,0,0.7)", paddingRight: 7 }}>
              Last Update:&nbsp;
              {lastUpdate.toLocaleString("en-US", {
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                month: "short",
              })}
            </small> */}
          </>
        )}
      </div>
    </>
  );
};

export default memo(NoteContainer);
