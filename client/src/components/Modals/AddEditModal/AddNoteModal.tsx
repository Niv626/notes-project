import React, { useState, SetStateAction, Dispatch, memo } from "react";
import { Modal, Input, Button } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { addNote } from "../../../api/noteApi";
import AddEditModal from "./AddEditModal";

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
    <AddEditModal
      content={"<p></p>"}
      destroyOnClose
      defaultValue={""}
      title={"Add New Note"}
      isModalOpen={isModalOpen}
      saveClick={saveClick}
      handleCancel={handleCancel}
      noteTitle={noteTitle}
      handleTitleChange={handleTitleChange}
      handleTextChange={setNoteText}
      updatedAt={null}
    ></AddEditModal>
  );
};

export default memo(AddNoteModal);
