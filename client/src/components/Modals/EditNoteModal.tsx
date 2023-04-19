import React, { useState, SetStateAction, Dispatch } from "react";
import { Modal, Input } from "antd";
import api from "../../api/authApi";
import { AxiosRequestConfig } from "axios";
import { Note } from "../Notes";
import { useMutation, useQueryClient } from "react-query";
import { editNote } from "../../api/noteApi";

const { TextArea } = Input;

interface EditNoteModalProps {
  title: string;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  isModalOpen: boolean;
  route: string;
  noteId: number;
  note: Note;
}

type event = {
  target: { value: React.SetStateAction<string> };
};

const EditNoteModal = ({
  title,
  isModalOpen,
  setIsModalOpen,
  noteId,
  note,
}: EditNoteModalProps) => {
  const [noteTitle, setNoteTitle] = useState(note.title);
  const [noteText, setNoteText] = useState(note.text);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: editNote,
    onSuccess: () => {
      queryClient.invalidateQueries("notes");
    },
  });

  const handleTextChange = (event: event) => {
    setNoteText(event.target.value);
  };

  const handleTitleChange = (event: event) => {
    setNoteTitle(event.target.value);
  };

  const saveClick = () => {
    const note = {
      title: noteTitle,
      text: noteText,
      id: noteId,
      isFavorite: false,
    };
    mutation.mutate(note);
    setNoteText("");
    setNoteTitle("");
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      title={title}
      open={isModalOpen}
      onOk={saveClick}
      onCancel={handleCancel}
    >
      <Input
        showCount
        maxLength={20}
        onChange={handleTitleChange}
        value={noteTitle}
        placeholder="title.."
        required
      />
      <br />
      <br />
      <TextArea
        showCount
        maxLength={500}
        onChange={handleTextChange}
        value={noteText}
        placeholder="add text.."
      />
      <br />
      <br />
    </Modal>
  );
};

export default EditNoteModal;
