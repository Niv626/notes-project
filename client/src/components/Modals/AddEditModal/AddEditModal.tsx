import React, { memo } from "react";
import { Modal, Input, Button } from "antd";
import TextEditor from "../../TextEditor/TextEditor";

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
  updatedAt,
}) => {
  const lastUpdate = updatedAt ? new Date(updatedAt) : null;
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
        <>
          {" "}
          {lastUpdate && (
            <small
              style={{
                color: "rgba(0,0,0,0.7)",
                paddingRight: 7,
                float: "left",
                paddingTop: 5,
              }}
            >
              Last Update:&nbsp;
              {lastUpdate?.toLocaleString("en-US", {
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                month: "short",
              }) || "Invalid Date"}
            </small>
          )}
        </>,
      ]}
    >
      <Input
        name={`unput-note-${title}`}
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
