import { Row } from "antd";
import React from "react";
import AddNote from "../../components/AddNote";
import Notes, { Note } from "../../components/Notes/Notes";
import { getNotes } from "../../api/noteApi";
import { useQuery } from "react-query";
import { useMatch, useOutletContext } from "react-router-dom";
import "./content-page.css";

function stripHtml(html: string) {
  let tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
}

const ContentPage = () => {
  const { data: notes } = useQuery("notes", getNotes);
  const isFavoriteRoute = useMatch("dashboard/favorite");
  const isTrashRoute = useMatch("dashboard/trash");
  const [search] = useOutletContext() as [string];

  return (
    <>
      <Row className="main-dashboard" style={{ marginLeft: 38 }}>
        <Notes
          notes={notes?.filter((note: Note) => {
            return (
              (stripHtml(note?.text)?.includes(search) ||
                note.title.includes(search)) &&
              (isFavoriteRoute ? note.isFavorite === true : true) &&
              (isTrashRoute ? note.isDeleted === true : !note.isDeleted)
            );
          })}
        ></Notes>
      </Row>
      {!isFavoriteRoute && !isTrashRoute && (
        <AddNote
          notesLength={notes?.filter(({ isDeleted }) => !isDeleted)?.length}
        ></AddNote>
      )}
    </>
  );
};

export default ContentPage;
