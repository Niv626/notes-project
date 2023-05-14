import { Button, Tooltip } from "antd";
import React, { useState } from "react";
import AddNoteModal from "./Modals/AddEditModal/AddNoteModal";
import { PlusCircleTwoTone } from "@ant-design/icons";
import Icon from "../assets/3209265-modified.png";
import { useMatch } from "react-router-dom";

const AddNote = ({ notesLength }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isFavoriteRoute = useMatch("dashboard/favorite");

  return (
    <>
      {notesLength !== undefined &&
        (notesLength < 1 ? (
          <div
            style={{
              position: "absolute",
              bottom: "40%",
              right: "49%",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "",
                flexDirection: "column",
              }}
            >
              <img
                width="150"
                height="150"
                src={Icon}
                style={{
                  paddingBottom: 20,
                  filter: "drop-shadow(9px 6px 24px black)",
                }}
              ></img>
              {!isFavoriteRoute && (
                <Button onClick={() => setIsModalOpen(true)} type="primary">
                  Add note
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div style={{ position: "fixed", bottom: 35, right: 35, zIndex: 1 }}>
            <Tooltip title="Add New Note" defaultOpen>
              <PlusCircleTwoTone
                onClick={() => {
                  setIsModalOpen(true);
                }}
                style={{ fontSize: "5rem" }}
              />
            </Tooltip>
          </div>
        ))}

      <AddNoteModal
        title="Add Note"
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        route={`/notes/create-note`}
      ></AddNoteModal>
    </>
  );
};

export default AddNote;
