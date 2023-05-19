import { Col, Input, Row, Tooltip } from "antd";
import React, { useContext, useState } from "react";
import AddNote from "../../components/AddNote";
import Notes, { Note } from "../../components/Notes/Notes";
import { getNotes } from "../../api/noteApi";
import { getUser } from "../../api/userApi";
import { useQuery } from "react-query";
import { useMatch, useOutletContext } from "react-router-dom";
import "./content-page.css";
import SearchNote from "../../components/SearchNote";

const { Search } = Input;

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

  // const { data: user } = useQuery("user", getUser);

  return (
    <>
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
        <AddNote
          notesLength={notes?.filter(({ isDeleted }) => !isDeleted)?.length}
        ></AddNote>
      )}
    </>
  );
};

export default ContentPage;

// <Row className="menu-left-bar">
//         <Col
//           span={15}
//           style={{
//             display: "flex",
//             paddingLeft: 15,
//             alignItems: "center",
//           }}
//         >
//           {/* <SearchNote onSearch={onSearch}></SearchNote> */}
//           {/* <Search
//             placeholder="Search notes"
//             onChange={onSearch}
//             style={{ width: "80%" }}
//             size="large"
//             allowClear
//           /> */}
//         </Col>
//         <Col span={9}>
//           <div
//             style={{
//               display: "flex",
//               flexWrap: "nowrap",
//               justifyContent: "flex-end",
//             }}
//           >
//             {/* create component */}
//             <Tooltip
//               title={
//                 <>
//                   <div className="text-capitalize">{`${user?.firstName} ${user?.lastName}`}</div>
//                   <div className="uppercase-first-letter">{user?.email}</div>
//                 </>
//               }
//             >
//               <div className="user-details">
//                 <b>{user?.firstName.at(0).toUpperCase()}</b>
//               </div>
//             </Tooltip>
//           </div>
//         </Col>
//       </Row>
