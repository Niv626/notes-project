import { Col, Input, Row } from "antd";
import React, { useContext, useState } from "react";
import AddNote from "./AddNote";
import Notes, { Note } from "./Notes";
import asd from "../assets/avatar-user-svgrepo-com.svg"; //need to fix this
import { getNotes } from "../api/noteApi";
import { getUser } from "../api/userApi";

import { useQuery } from "react-query";
import { CollapsedContext, CollapsedData } from "../context/CollapesdContext";
import { AuthContext, AuthData } from "../context/AuthContext";

const { Search } = Input;

type ContentPageProps = {
  favorite?: boolean;
};

const ContentPage = ({ favorite }: ContentPageProps) => {
  const { data: notes } = useQuery("notes", getNotes);
  const [search, setSearch] = useState("");
  const { collapsed }: AuthData = useContext(AuthContext);
  console.log("favorite", favorite);

  const onSearch = (e: React.FormEvent<HTMLInputElement>) =>
    setSearch(e.currentTarget.value);

  const { data: user } = useQuery("user", getUser);
  console.log("firstcollapsed", collapsed);
  return (
    <Col
      span={collapsed ? 23 : 21}
      style={{ height: "100vh", width: "100vh", position: "static" }}
    >
      <Row
        className="menu-left-bar"
        style={{
          padding: 25,
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
                Hello <b>{user?.email} </b>
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
              (note.text.includes(search) || note.title.includes(search)) &&
              (favorite ? note.isFavorite === true : true)
            );
          })}
        ></Notes>
      </Row>
    </Col>
  );
};

export default ContentPage;
