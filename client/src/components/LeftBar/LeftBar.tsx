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
import { AuthContext, AuthData } from "../../context/AuthContext";
import "./leftbar.css";
import { items, routes } from "./items";

type MenuItem = Required<MenuProps>["items"][number];

const LeftBar = () => {
  const { setAuth, collapsed, setCollapsed }: AuthData =
    useContext(AuthContext);
  const [isMobile, setIsMobile] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const onClick: MenuProps["onClick"] = (e) => {
    if (e.key === "6") logout();
  };

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
      setIsMobile(window.innerWidth < 1347); // Change the threshold as per your requirements
    };

    handleResize(); // Initial check

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isMobile) {
      setCollapsed && setCollapsed(isMobile);
      localStorage.setItem("collapsed", JSON.stringify(isMobile));
    }
  }, [isMobile, setCollapsed]);

  return (
    <>
      <div className="left-bar" style={{ height: "100svh", width: "100vh" }}>
        {!isMobile && (
          <Button
            style={{ position: "absolute", left: 0 }}
            type="primary"
            onClick={toggleCollapsed}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
        )}

        <Menu
          defaultSelectedKeys={routes[location.pathname]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          style={{ paddingTop: 81, backgroundColor: "#344152", color: "white" }}
          inlineCollapsed={collapsed}
          items={items}
          onClick={onClick}
          theme="dark"
        />
      </div>
      {/* </Col> */}
    </>
  );
};

export default LeftBar;