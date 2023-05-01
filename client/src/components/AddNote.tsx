import { Button } from "antd";
import React, { useState } from "react";
import AddNoteModal from "./Modals/AddEditModal/AddNoteModal";
import { PlusCircleOutlined } from "@ant-design/icons";

const AddNote = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <Button
        style={{
          width: 150,
          color: "white",
          backgroundColor: "black",
        }}
        onClick={() => setIsModalOpen(true)}
      >
        <PlusCircleOutlined style={{ fontSize: 15 }} />
        Add new note
      </Button>
      <AddNoteModal
        title="Add Note"
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        route={`/notes/create-note`}
      ></AddNoteModal>
    </div>
  );
};

export default AddNote;
