import { Col, Input, Row, Tooltip } from "antd";
import React, { useContext, useState } from "react";
import AddNote from "../components/AddNote";
import Notes, { Note } from "../components/Notes";
import { getNotes } from "../api/noteApi";
import { getUser } from "../api/userApi";
import { useQuery } from "react-query";
import { AuthContext, AuthData } from "../context/AuthContext";
import { useMatch } from "react-router-dom";
import "./content-page.css";

const { Search } = Input;

type ContentPageProps = {
  favorite?: boolean;
};

function stripHtml(html: string) {
  let tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
}

const ContentPage = ({ favorite }: ContentPageProps) => {
  const { data: notes } = useQuery("notes", getNotes);
  const [search, setSearch] = useState("");
  const { collapsed }: AuthData = useContext(AuthContext);
  const isFavoriteRoute = useMatch("dashboard/favorite");
  const isTrashRoute = useMatch("dashboard/trash");

  const onSearch = (e: React.FormEvent<HTMLInputElement>) =>
    setSearch(e.currentTarget.value);

  const { data: user } = useQuery("user", getUser);

  return (
    <div
      style={{
        width: collapsed ? "95.834%" : "87.5%",
      }}
    >
      <Col span={collapsed ? 23 : 21} className="top-bar-collapsed">
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
        <Row className="main-dashboard">
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
      </Col>
      <AddNote notesLength={notes?.length}></AddNote>
    </div>
  );
};

export default ContentPage;
