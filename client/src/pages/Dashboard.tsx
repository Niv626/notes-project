// // import { Row, Col, Input, Button } from "antd";
// // import React, { useState, useContext, useEffect } from "react";
// // import { AuthContext, AuthData } from "../context/AuthContext";
// // import Notes, { Note } from "../components/Notes";
// // import { useQuery } from "react-query";
// // import { getNotes } from "../api/noteApi";
// // import { getUser } from "../api/userApi";
// // import { ReactQueryDevtools } from "react-query/devtools";
// // import AddNote from "../components/AddNote";
// // import asd from "../assets/avatar-user-svgrepo-com.svg";
// // import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
// // import LeftBar from "../components/LeftBar";
// // import ContentPage from "../components/ContentPage";

// // const { Search } = Input;

// // const Dashboard = () => {
// //   const { setAuth }: AuthData = useContext(AuthContext);
// //   const { data: notes, refetch } = useQuery("notes", getNotes);
// //   const navigate = useNavigate();
// //   const [collapsed, setCollapsed] = useState(false);

// //   useEffect(() => {}, []);

// //   const logout = () => {
// //     setAuth && setAuth({ accessToken: "" });
// //     localStorage.removeItem("access_token");
// //     navigate("../", { replace: true });
// //   };

// //   return (
// //     <>
// //       <Col span={collapsed ? 1 : 3} style={{ height: "100vh", width: "100vh" }}>
// //         <div className="">
// //           <LeftBar
// //             refetch={refetch}
// //             collapsed={collapsed}
// //             setCollapsed={setCollapsed}
// //             logout={logout}
// //           />
// //         </div>
// //       </Col>
// //     </>
// //   );
// // };

// // export default Dashboard;

// import React, { useContext, useState } from "react";
// import {
//   ContainerOutlined,
//   DesktopOutlined,
//   MenuFoldOutlined,
//   MenuUnfoldOutlined,
//   PieChartOutlined,
// } from "@ant-design/icons";
// import { Col, MenuProps } from "antd";
// import { Button, Menu } from "antd";
// import "./leftbar.css";
// import { Link, useNavigate } from "react-router-dom";
// import { useQuery } from "react-query";
// import { getNotes } from "../api/noteApi";
// import { AuthContext, AuthData } from "../context/AuthContext";
// import "./leftbar.css";

// type MenuItem = Required<MenuProps>["items"][number];

// function getItem(
//   label: React.ReactNode,
//   key: React.Key,
//   icon?: React.ReactNode,
//   children?: MenuItem[],
//   type?: "group"
// ): MenuItem {
//   return {
//     key,
//     icon,
//     children,
//     label,
//     type,
//   } as MenuItem;
// }

// const LeftBar = () => {
//   // fix props type

//   const { setAuth }: AuthData = useContext(AuthContext);
//   const { data: notes, refetch } = useQuery("notes", getNotes);
//   const navigate = useNavigate();
//   const [collapsed, setCollapsed] = useState(false);

//   const logout = () => {
//     setAuth && setAuth({ accessToken: "" });
//     localStorage.removeItem("access_token");
//     navigate("../", { replace: true });
//   };

//   const items: MenuItem[] = [
//     getItem(
//       "Home",
//       "1",
//       <Link replace to={"/dashboard"}>
//         <PieChartOutlined />
//       </Link>
//     ),
//     getItem(
//       "Favorite",
//       "2",
//       <Link replace to={"/dashboard/favorite"}>
//         <DesktopOutlined />
//       </Link>
//     ),
//     getItem(
//       "Archive",
//       "3",
//       <Link replace to={"/dashboard/about"}>
//         <ContainerOutlined />
//       </Link>
//     ),
//   ];
//   const toggleCollapsed = () => {
//     setCollapsed(!collapsed);
//   };

//   return (
//     <>
//       <Col span={collapsed ? 1 : 3} style={{ height: "100vh", width: "100vh" }}>
//         <div className="left-bar">
//           <Button
//             style={{ position: "absolute", left: 0 }}
//             type="primary"
//             onClick={toggleCollapsed}
//           >
//             {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}{" "}
//             {/* TODO: Change icons */}
//           </Button>
//           <Menu
//             defaultSelectedKeys={["1"]}
//             defaultOpenKeys={["sub1"]}
//             mode="inline"
//             theme="dark"
//             style={{ paddingTop: 50 }}
//             inlineCollapsed={collapsed}
//             items={items}
//             onClick={refetch}
//           />
//           <div style={{ position: "absolute", bottom: 0, paddingBottom: 10 }}>
//             {collapsed ? (
//               // <MenuUnfoldOutlined />
//               <>asasas</>
//             ) : (
//               <Button onClick={logout}>Logout</Button>
//             )}
//           </div>
//         </div>
//       </Col>
//       {/* <Outlet /> */}
//     </>
//   );
// };

// export default LeftBar;
