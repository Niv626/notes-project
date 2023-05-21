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
