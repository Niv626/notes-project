import React from "react";
import { Modal, Input, Button } from "antd";
import TextEditor from "../../TextEditor";

const AddEditModal = ({
  title,
  isModalOpen,
  saveClick,
  handleCancel,
  noteTitle,
  handleTitleChange,
  handleTextChange,
  setNoteText,
  noteText,
  defaultValue,
}) => {
  return (
    <Modal
      title={title}
      open={isModalOpen}
      onOk={saveClick}
      onCancel={handleCancel}
      style={{ width: 1500, minWidth: 735 }}
      bodyStyle={{ height: 460 }}
      footer={[
        <Button onClick={handleCancel} key="2">
          Cancel
        </Button>,
        <Button
          type="primary"
          onClick={saveClick}
          key="Ok"
          disabled={noteTitle === ""}
        >
          Save
        </Button>,
      ]}
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

      <div style={{ outline: "1px solid #dadada" }}>
        <TextEditor
          handleTextChange={setNoteText}
          defaultValue={defaultValue}
        ></TextEditor>
      </div>
    </Modal>
  );
};

export default AddEditModal;
