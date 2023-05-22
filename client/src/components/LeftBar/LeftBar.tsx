import React, { useContext, useEffect, useRef, useState } from "react";
import {
  BookOutlined,
  DeleteOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ProfileOutlined,
  SearchOutlined,
  SettingOutlined,
  SnippetsOutlined,
} from "@ant-design/icons";

import { MenuProps, Button, Menu, Popover, InputRef, Tooltip } from "antd";
import "./leftbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext, AuthData } from "../../context/AuthContext";
import "./leftbar.css";
import { routes } from "./items";
import SearchNote from "../SearchNote";
import { getUser } from "../../api/userApi";
import { useQuery } from "react-query";

const LeftBar = ({ onSearch }) => {
  const { setAuth, collapsed, setCollapsed }: AuthData =
    useContext(AuthContext);
  const [isMobile, setIsMobile] = useState(false);
  const { data: user } = useQuery("user", getUser);

  const inputRef = useRef<InputRef>(null);

  const navigate = useNavigate();
  const location = useLocation();

  const onClick: MenuProps["onClick"] = (e) => {
    if (e.key === "menuitem-logout") logout();
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
      setIsMobile(window.innerWidth < 1347);
    };

    handleResize();
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
        <Tooltip
          placement="right"
          title={
            <>
              <div className="text-capitalize">{`${user?.firstName} ${user?.lastName}`}</div>
              <div className="uppercase-first-letter">{user?.email}</div>
            </>
          }
        >
          <div className="user-details">
            <b>{user?.firstName.at(0).toUpperCase()}</b>
          </div>
        </Tooltip>
        <Menu
          defaultSelectedKeys={routes[location.pathname]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          style={{
            paddingTop: 130,
            backgroundColor: "#344152",
            color: "white",
            paddingLeft: 0,
          }}
          inlineCollapsed={collapsed}
          onClick={onClick}
          theme="dark"
        >
          <Menu.Item
            disabled
            style={{ cursor: "default" }}
            icon={
              <>
                {collapsed ? (
                  <Popover
                    placement="rightBottom"
                    className="leftbar-search-popover"
                    color="#1f1f1f"
                    showArrow={false}
                    popupVisible
                    content={
                      <SearchNote onSearch={onSearch} allowClear></SearchNote>
                    }
                  >
                    <SearchOutlined />
                  </Popover>
                ) : (
                  <SearchOutlined />
                )}
              </>
            }
            key="1"
          >
            <SearchNote
              refVal={inputRef}
              onSearch={onSearch}
              allowClear
            ></SearchNote>
          </Menu.Item>
          <Menu.Item key="2" icon={<ProfileOutlined />}>
            <Link replace to={"/dashboard"}>
              All Notes
            </Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<SnippetsOutlined />}>
            <Link replace to={"/dashboard/whiteboard"}>
              Whiteboard
            </Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<BookOutlined />}>
            <Link replace to={"/dashboard/favorite"}>
              Favorites
            </Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<DeleteOutlined />}>
            <Link replace to={"/dashboard/trash"}>
              Trash
            </Link>
          </Menu.Item>
          <Menu.Item key="6" icon={<SettingOutlined />}>
            <Link replace to={"/dashboard/account-settings"}>
              Account Settings
            </Link>
          </Menu.Item>
          <Menu.Item key="menuitem-logout" icon={<LogoutOutlined />}>
            Logout
          </Menu.Item>
        </Menu>
      </div>
    </>
  );
};

export default LeftBar;
