import React, { memo } from "react";
import { Modal, Input, Button } from "antd";
import TextEditor from "../../TextEditor";

const AddEditModal = ({
  title,
  isModalOpen,
  saveClick,
  handleCancel,
  noteTitle,
  handleTitleChange,
  content,
  defaultValue,
  destroyOnClose,
  handleTextChange,
}) => {
  return (
    <Modal
      title={title}
      open={isModalOpen}
      onOk={saveClick}
      destroyOnClose={destroyOnClose}
      onCancel={handleCancel}
      style={{ width: 1500, minWidth: "45%" }}
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
        autoFocus
        maxLength={20}
        onChange={handleTitleChange}
        value={noteTitle}
        placeholder="title..."
        required
      />
      <br />
      <br />

      <div style={{ outline: "1px solid #dadada" }}>
        <TextEditor
          content={content}
          handleTextChange={handleTextChange}
          defaultValue={defaultValue}
        ></TextEditor>
      </div>
    </Modal>
  );
};

export default memo(AddEditModal);
