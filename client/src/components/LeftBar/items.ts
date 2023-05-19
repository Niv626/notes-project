import {
  BookOutlined,
  DeleteOutlined,
  LogoutOutlined,
  ProfileOutlined,
  SearchOutlined,
  SettingOutlined,
  SnippetsOutlined,
} from "@ant-design/icons";

import { Input, MenuProps, Popover } from "antd";
import "./leftbar.css";
import { Link } from "react-router-dom";
import "./leftbar.css";
import React, { useContext } from "react";
import { AuthContext, AuthData } from "../../context/AuthContext";

type MenuItem = Required<MenuProps>["items"][number];

export const routes = {
  "/search": "1",
  "/dashboard": "2",
  "/dashboard/whiteboard": "3",
  "/dashboard/favorite": "4",
  "/dashboard/trash": "5",
  "/dashboard/account-settings": "6",
};

export function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

// export const items: MenuItem[] = [
//   getItem(
//     <>
//       {/* <SearchOutlined /> */}
//       <Input
//         className="leftbar-search-input"
//         // prefix={<>sad</>}
//         // addonBefore={<>asd</>}
//         placeholder="Search"
//       ></Input>
//     </>,
//     "1",
//     <>
//       <Popover
//         placement="right"
//         className="leftbar-search-popover"
//         color="#1f1f1f"
//         content={
//           <Input
//             prefix={<>sad</>}
//             className="leftbar-search-input"
//             // placeholder={<></>}
//           ></Input>
//         }
//       >
//         <SearchOutlined />
//       </Popover>
//     </>
//   ),
//   getItem(
//     "All Notes",
//     "2",
//     <Link replace to={"/dashboard"}>
//       <ProfileOutlined />
//     </Link>
//   ),
//   getItem(
//     "Whiteboard",
//     "3",
//     <Link replace to={"/dashboard/whiteboard"}>
//       <SnippetsOutlined />
//     </Link>
//   ),
//   getItem(
//     "Favorites Notes",
//     "4",
//     <Link replace to={"/dashboard/favorite"}>
//       <BookOutlined />
//     </Link>
//   ),
//   getItem(
//     "Trash",
//     "5",
//     <Link replace to={"/dashboard/trash"}>
//       <DeleteOutlined />
//     </Link>
//   ),
//   getItem(
//     "Settings",
//     "6",
//     <Link replace to={"/dashboard/account-settings"}>
//       <SettingOutlined />
//     </Link>
//   ),

//   getItem("Logout", "7", <LogoutOutlined />),
// ];

// export const getItems = () => {
//   const { collapsed }: AuthData = useContext(AuthContext);

//   return [
//     getItem(
//       <>
//         {/* <SearchOutlined /> */}
//         <Input
//           className="leftbar-search-input"
//           // prefix={<>sad</>}
//           // addonBefore={<>asd</>}
//           placeholder="Search"
//         ></Input>
//       </>,
//       "1",
//       <>
//         <Popover
//           placement="right"
//           className="leftbar-search-popover"
//           color="#1f1f1f"
//           content={
//             <Input
//               prefix={<>sad</>}
//               style={{}}
//               className="leftbar-search-input"
//               // placeholder={<></>}
//             ></Input>
//           }
//         >
//           <SearchOutlined />
//         </Popover>
//       </>
//     ),
//     getItem(
//       "All Notes",
//       "2",
//       <Link replace to={"/dashboard"}>
//         <ProfileOutlined />
//       </Link>
//     ),
//     getItem(
//       "Whiteboard",
//       "3",
//       <Link replace to={"/dashboard/whiteboard"}>
//         <SnippetsOutlined />
//       </Link>
//     ),
//     getItem(
//       "Favorites Notes",
//       "4",
//       <Link replace to={"/dashboard/favorite"}>
//         <BookOutlined />
//       </Link>
//     ),
//     getItem(
//       "Trash",
//       "5",
//       <Link replace to={"/dashboard/trash"}>
//         <DeleteOutlined />
//       </Link>
//     ),
//     getItem(
//       "Settings",
//       "6",
//       <Link replace to={"/dashboard/account-settings"}>
//         <SettingOutlined />
//       </Link>
//     ),

//     getItem("Logout", "7", <LogoutOutlined />),
//   ] as MenuItem[];
// };
