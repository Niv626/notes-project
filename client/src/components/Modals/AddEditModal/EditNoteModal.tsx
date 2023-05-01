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
    // <Modal
    //   title={title}
    //   open={isModalOpen}
    //   onOk={saveClick}
    //   onCancel={handleCancel}
    //   style={{ width: 1500, minWidth: 735 }}
    //   bodyStyle={{ height: 500 }}
    //   footer={[
    //     <Button onClick={handleCancel} key="2">
    //       Cancel
    //     </Button>,
    //     <Button type="primary" onClick={saveClick} key="Ok">
    //       Save
    //     </Button>,
    //   ]}
    // >
    //   <Input
    //     showCount
    //     maxLength={20}
    //     onChange={handleTitleChange}
    //     value={noteTitle}
    //     placeholder="title.."
    //     required
    //   />
    //   <br />
    //   <br />
    //   <div style={{ border: "1px solid" }}>
    //     <TextEditor
    //       defaultValue={note.text}
    //       handleTextChange={setNoteText}
    //     ></TextEditor>
    //   </div>

    //   {/* <TextArea
    //         showCount
    //         maxLength={500}
    //         onChange={handleTextChange}
    //         value={noteText}
    //         placeholder="add text.."
    //         style={{ height: "80%", width: "100%" }}
    //       /> */}
    // </Modal>
  );
};

export default EditNoteModal;
