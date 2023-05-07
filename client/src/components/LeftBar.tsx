import React, { useContext, useState } from "react";
import {
  BookOutlined,
  ContainerOutlined,
  DesktopOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { Col, MenuProps } from "antd";
import { Button, Menu } from "antd";
import "./leftbar.css";
import { Link, useLocation, useMatch, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { getNotes } from "../api/noteApi";
import { AuthContext, AuthData } from "../context/AuthContext";
import "./leftbar.css";

type MenuItem = Required<MenuProps>["items"][number];

const routes = {
  "/dashboard": "1",
  "/dashboard/favorite": "2",
  "/dashboard/about": "3",
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

const items: MenuItem[] = [
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
    "Settings",
    "3",
    <Link replace to={"/dashboard/about"}>
      <ContainerOutlined />
    </Link>
  ),
];

const LeftBar = () => {
  const { setAuth, collapsed, setCollapsed }: AuthData =
    useContext(AuthContext);
  // const { data: notes, refetch } = useQuery("notes", getNotes);
  const navigate = useNavigate();
  const isFavoriteRoute = useMatch("dashboard");
  const location = useLocation();
  console.log("location", routes[location.pathname]);
  const logout = () => {
    setAuth && setAuth({ accessToken: "" });
    localStorage.removeItem("access_token");
    navigate("../", { replace: true });
  };

  const toggleCollapsed = () => {
    if (setCollapsed) {
      setCollapsed((prev) => !prev);
    }
    localStorage.setItem("collapsed", JSON.stringify(!collapsed));
  };

  return (
    <>
      <Col span={collapsed ? 1 : 3} style={{ height: "100vh", width: "100vh" }}>
        <div className="left-bar">
          <Button
            style={{ position: "absolute" }}
            type="primary"
            onClick={toggleCollapsed}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}{" "}
            {/* TODO: Change icons */}
          </Button>
          <Menu
            defaultSelectedKeys={routes[location.pathname]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            theme="dark"
            style={{ paddingTop: 50 }}
            inlineCollapsed={collapsed}
            items={items}
          />
          <div style={{ position: "absolute", bottom: 0, paddingBottom: 10 }}>
            {collapsed ? (
              // <MenuUnfoldOutlined />
              <LogoutOutlined
                onClick={logout}
                style={{ color: "white", fontSize: 25 }}
              />
            ) : (
              <Button onClick={logout}>
                <LogoutOutlined style={{ color: "black", fontSize: 16 }} />
                <b> Logout</b>
              </Button>
            )}
          </div>
        </div>
      </Col>
      {/* <Outlet /> */}
    </>
  );
};

export default LeftBar;
