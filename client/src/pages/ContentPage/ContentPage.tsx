import { Col, Input, Row, Tooltip } from "antd";
import React, { useContext, useState } from "react";
import AddNote from "../../components/AddNote";
import Notes, { Note } from "../../components/Notes/Notes";
import { getNotes } from "../../api/noteApi";
import { getUser } from "../../api/userApi";
import { useQuery } from "react-query";
import { useMatch } from "react-router-dom";
import "./content-page.css";

const { Search } = Input;

function stripHtml(html: string) {
  let tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
}

const ContentPage = () => {
  const { data: notes } = useQuery("notes", getNotes);
  const [search, setSearch] = useState("");
  const isFavoriteRoute = useMatch("dashboard/favorite");
  const isTrashRoute = useMatch("dashboard/trash");

  const onSearch = (e: React.FormEvent<HTMLInputElement>) =>
    setSearch(e.currentTarget.value);

  const { data: user } = useQuery("user", getUser);

  return (
    <>
      <Row className="menu-left-bar">
        <Col
          span={15}
          style={{
            display: "flex",
            paddingLeft: 15,
            alignItems: "center",
          }}
        >
          <Search
            placeholder="Search notes"
            onChange={onSearch}
            style={{ width: "80%" }}
            size="large"
            allowClear
          />
        </Col>
        <Col span={9}>
          <div
            style={{
              display: "flex",
              flexWrap: "nowrap",
              justifyContent: "flex-end",
            }}
          >
            {/* create component */}
            <Tooltip
              title={
                <>
                  <div className="text-capitalize">{`${user?.firstName} ${user?.lastName}`}</div>
                  <div className="uppercase-first-letter">{user?.email}</div>
                </>
              }
            >
              <div className="user-details">
                <b>{user?.firstName.at(0).toUpperCase()}</b>
              </div>
            </Tooltip>
          </div>
        </Col>
      </Row>
      <Row className="main-dashboard" style={{ paddingLeft: 38 }}>
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
        <AddNote notesLength={notes?.length}></AddNote>
      )}
    </>
  );
};

export default ContentPage;
