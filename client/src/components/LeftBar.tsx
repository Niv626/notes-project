import React, { useContext, useEffect, useState } from "react";
import {
  BookOutlined,
  DeleteOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ProfileOutlined,
  SettingOutlined,
} from "@ant-design/icons";

import { Col, MenuProps, Button, Menu } from "antd";
import "./leftbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext, AuthData } from "../context/AuthContext";
import "./leftbar.css";

type MenuItem = Required<MenuProps>["items"][number];

const routes = {
  "/dashboard": "1",
  "/dashboard/favorite": "2",
  "/dashboard/trash": "3",
  "/dashboard/about": "4",
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
    "Trash",
    "3",
    <Link replace to={"/dashboard/trash"}>
      <DeleteOutlined />
    </Link>
  ),
  getItem(
    "Settings",
    "4",
    <Link replace to={"/dashboard/about"}>
      <SettingOutlined />
    </Link>
  ),
];

const LeftBar = () => {
  const { setAuth, collapsed, setCollapsed }: AuthData =
    useContext(AuthContext);
  const [isMobile, setIsMobile] = useState(false);

  // const { data: notes, refetch } = useQuery("notes", getNotes);
  const navigate = useNavigate();
  const location = useLocation();
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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Change the threshold as per your requirements
    };

    handleResize(); // Initial check

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isMobile) {
      setCollapsed && setCollapsed(true);
      localStorage.setItem("collapsed", JSON.stringify(true));
    }
  }, [isMobile, setCollapsed]);

  return (
    <>
      <Col span={collapsed ? 1 : 3} style={{ height: "100vh", width: "100vh" }}>
        <div className="left-bar">
          <Button
            style={{ position: "absolute", left: 0 }}
            type="primary"
            onClick={toggleCollapsed}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}{" "}
          </Button>
          <Menu
            defaultSelectedKeys={routes[location.pathname]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            style={{ paddingTop: 81, backgroundColor: "#e9e9e9" }}
            inlineCollapsed={collapsed}
            items={items}
          />
          <div style={{ position: "absolute", bottom: 0, paddingBottom: 10 }}>
            {collapsed ? (
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
    </>
  );
};

export default LeftBar;
