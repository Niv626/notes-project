import React, { useState, SetStateAction, Dispatch } from "react";
import { Modal, Input } from "antd";
import api from "../../api/authApi";
import { AxiosRequestConfig } from "axios";
import { Note } from "../Notes";
import { useMutation, useQueryClient } from "react-query";
import { addNote } from "../../api/noteApi";

const { TextArea } = Input;

interface EditNoteModalProps {
  title: string;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  isModalOpen: boolean;
  route: string;
}

type event = {
  target: { value: React.SetStateAction<string> };
};

const AddNoteModal = ({
  title,
  isModalOpen,
  setIsModalOpen,
}: EditNoteModalProps) => {
  const [noteTitle, setNoteTitle] = useState("");
  const [noteText, setNoteText] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addNote,
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
    const note = { title: noteTitle, text: noteText };
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

export default AddNoteModal;
