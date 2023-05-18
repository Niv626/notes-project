import React, { memo, useState } from "react";
import { Note } from "./Notes";
import {
  EditOutlined,
  DeleteOutlined,
  StarOutlined,
  StarFilled,
  RestOutlined,
} from "@ant-design/icons";
import "./note.css";
import { editNote, removeNoteById, setDeletedNote } from "../../api/noteApi";
import { useMutation, useQueryClient } from "react-query";
import EditNoteModal from "../Modals/AddEditModal/EditNoteModal";
import { Tooltip } from "antd";
import { useMatch } from "react-router-dom";
import TextEditor from "../TextEditor/TextEditor";
import { useReactFlow } from "reactflow";

export interface NoteProps {
  note: Note;
  className?: string;
  styles?;
}

const NoteContainer = ({ note, className, styles }: NoteProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isTrashRoute = useMatch("dashboard/trash");
  const reactFlowInstance = useReactFlow();

  const queryClient = useQueryClient();

  const deleteNoteForeverMutation = useMutation({
    mutationFn: removeNoteById,
    onSuccess: () => {
      queryClient.invalidateQueries("notes");
    },
  });

  const deleteNoteMutation = useMutation({
    mutationFn: setDeletedNote,
    onSuccess: () => {
      queryClient.invalidateQueries("notes");
    },
  });

  const mutation = useMutation({
    mutationFn: editNote,
    onSuccess: (data) => {
      if (reactFlowInstance && data.isDeleted) {
        const node = reactFlowInstance.getNodes().find((node) => {
          return parseInt(node.id) === data.id;
        });
        if (node) reactFlowInstance.deleteElements({ nodes: [node] });
      }
      queryClient.invalidateQueries("notes");
    },
  });

  const { id: noteId } = note;

  return (
    <>
      <div
        className={className || "note"}
        style={{
          backgroundColor: note.color,
        }}
      >
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
                content={note.text}
                defaultValue={note.text}
                isNoteContainer
              ></TextEditor>
            </div>
            <div className="note-footer">
              <div
                className="update-note"
                style={{ float: "left", paddingRight: 10 }}
              >
                {!isTrashRoute && (
                  <Tooltip title="Edit Note">
                    <EditOutlined
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
                  onClick={() =>
                    mutation.mutate({
                      ...note,
                      isFavorite: !note.isFavorite,
                    })
                  }
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
                        : mutation.mutate({
                            ...note,
                            isDeleted: !note.isDeleted,
                          });
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
          </>
        )}
      </div>
    </>
  );
};

export default memo(NoteContainer);
