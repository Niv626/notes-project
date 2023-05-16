import {
  BookOutlined,
  DeleteOutlined,
  LogoutOutlined,
  ProfileOutlined,
  SettingOutlined,
} from "@ant-design/icons";

import { MenuProps } from "antd";
import "./leftbar.css";
import { Link } from "react-router-dom";
import "./leftbar.css";
import React from "react";

type MenuItem = Required<MenuProps>["items"][number];

export const routes = {
  "/dashboard": "1",
  "/dashboard/favorite": "2",
  "/dashboard/trash": "3",
  "/dashboard/settings": "4",
  "/dashboard/whiteboard": "5",
};

function getItem(
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

export const items: MenuItem[] = [
  getItem(
    "All Notes",
    "1",
    <Link replace to={"/dashboard"}>
      <ProfileOutlined />
    </Link>
  ),
  getItem(
    "Favorites Notes",
    "2",
    <Link replace to={"/dashboard/favorite"}>
      <BookOutlined />
    </Link>
  ),
  getItem(
    "Trash",
    "3",
    <Link replace to={"/dashboard/trash"}>
      <DeleteOutlined />
    </Link>
  ),
  getItem(
    "Settings",
    "4",
    <Link replace to={"/dashboard/settings"}>
      <SettingOutlined />
    </Link>
  ),
  getItem(
    "Whiteboard",
    "5",
    <Link replace to={"/dashboard/whiteboard"}>
      <SettingOutlined />
    </Link>
  ),
  getItem("Logout", "6", <LogoutOutlined />),
];
