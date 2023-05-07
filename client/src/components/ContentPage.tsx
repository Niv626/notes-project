import { Col, Input, Row } from "antd";
import React, { useContext, useMemo, useState } from "react";
import AddNote from "./AddNote";
import Notes, { Note } from "./Notes";
import asd from "../assets/avatar-user-svgrepo-com.svg"; //need to fix this
import { getNotes } from "../api/noteApi";
import { getUser } from "../api/userApi";
import Background from "../assets/pexels-fwstudio-129731.jpg";

import { useQuery } from "react-query";
import { CollapsedContext, CollapsedData } from "../context/CollapesdContext";
import { AuthContext, AuthData } from "../context/AuthContext";
import { useMatch } from "react-router-dom";

const { Search } = Input;

type ContentPageProps = {
  favorite?: boolean;
};

function stripHtml(html: string) {
  let tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
}

// rename and move to pages
const ContentPage = ({ favorite }: ContentPageProps) => {
  const { data: notes } = useQuery("notes", getNotes);
  const [search, setSearch] = useState("");
  const { collapsed }: AuthData = useContext(AuthContext);
  const isFavoriteRoute = useMatch("dashboard/favorite");

  const onSearch = (e: React.FormEvent<HTMLInputElement>) =>
    setSearch(e.currentTarget.value);

  const { data: user } = useQuery("user", getUser);

  return (
    <div
      style={{
        backgroundImage: `url(${Background})`,
        width: collapsed ? "95.834%" : "87.5%",
      }}
    >
      <Col
        span={collapsed ? 23 : 21}
        style={{
          height: "100vh",
          width: "100%",
          position: "fixed",
          overflowX: "hidden",
        }}
      >
        <Row
          className="menu-left-bar"
          style={{
            padding: 23,
            backgroundColor: "#5350508c",
            top: 0,
            zIndex: 1,
          }}
        >
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
              <div>
                <img
                  color="rgb(214, 215, 216)"
                  height={15}
                  width={26}
                  src={asd}
                ></img>
                <div
                  style={{
                    position: "relative",
                    bottom: 2,
                    color: "black",
                  }}
                >
                  Hello <b>{user?.firstName} </b>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row
          style={{
            paddingRight: 28,
            paddingTop: 10,
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
          }}
        >
          <AddNote></AddNote>
        </Row>
        <Row className="main-dashboard">
          <Notes
            notes={notes?.filter((note: Note) => {
              return (
                (stripHtml(note?.text)?.includes(search) ||
                  note.title.includes(search)) &&
                (isFavoriteRoute ? note.isFavorite === true : true)
              );
            })}
          ></Notes>
        </Row>
      </Col>
    </div>
  );
};

export default ContentPage;
