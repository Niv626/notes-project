import React, { useState, SetStateAction, Dispatch } from "react";
import { Note } from "../../Notes";
import { useMutation, useQueryClient } from "react-query";
import { editNote } from "../../../api/noteApi";
import AddEditModal from "./AddEditModal";

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

  const handleTitleChange = (event: event) => {
    setNoteTitle(event.target.value);
  };

  const saveClick = () => {
    const note = {
      title: noteTitle,
      text: noteText,
      id: noteId,
      isFavorite: false,
      type: "note",
    };
    mutation.mutate(note);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <AddEditModal
      defaultValue={note.text}
      title={title}
      isModalOpen={isModalOpen}
      saveClick={saveClick}
      handleCancel={handleCancel}
      noteTitle={noteTitle}
      handleTitleChange={handleTitleChange}
      handleTextChange={setNoteText}
      setNoteText={setNoteText}
      noteText={noteText}
    ></AddEditModal>
  );
};

export default EditNoteModal;
