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

import { Col, MenuProps, Button, Menu, Input, Popover, InputRef } from "antd";
import "./leftbar.css";
import {
  Link,
  useLocation,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import { AuthContext, AuthData } from "../../context/AuthContext";
import "./leftbar.css";
import { getItem, routes } from "./items";
import SearchNote from "../SearchNote";

type MenuItem = Required<MenuProps>["items"][number];

const LeftBar = ({ onSearch }) => {
  const { setAuth, collapsed, setCollapsed }: AuthData =
    useContext(AuthContext);
  const [isMobile, setIsMobile] = useState(false);
  const [isSerching, setIsSerching] = useState(false);

  const inputRef = useRef<InputRef>(null);

  const navigate = useNavigate();
  const location = useLocation();

  const onClick: MenuProps["onClick"] = (e) => {
    if (e.key === "7") logout();
    if (e.key === "1") {
      // setIsSerching((prev) => !prev);
      // inputRef.current?.focus();
      // if (inputRef.current) inputRef.current.focus();
    }
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

  const items = [
    getItem(
      <>
        {/* <SearchOutlined /> */}
        <SearchNote onSearch={onSearch}></SearchNote>
        {/* <Input
          className="leftbar-search-input"
          // prefix={<>sad</>}
          // addonBefore={<>asd</>}
          placeholder="Search"
        ></Input> */}
      </>,
      "1",
      <>
        {collapsed ? (
          <Popover
            placement="right"
            className="leftbar-search-popover"
            color="#1f1f1f"
            onOpenChange={(e) => console.log("onOpenChange", e)}
            showArrow={false}
            // open={isSerching}
            content={
              <SearchNote onSearch={onSearch}></SearchNote>

              // <Input
              //   ref={inputRef}
              //   prefix={<SearchOutlined />}
              //   style={{}}
              //   className="leftbar-search-input"
              //   // placeholder={<></>}
              // ></Input>
            }
          >
            <SearchOutlined />
          </Popover>
        ) : (
          <SearchOutlined />
        )}
      </>
    ),
    getItem(
      "All Notes",
      "2",
      <Link replace to={"/dashboard"}>
        <ProfileOutlined />
      </Link>
    ),
    getItem(
      "Whiteboard",
      "3",
      <Link replace to={"/dashboard/whiteboard"}>
        <SnippetsOutlined />
      </Link>
    ),
    getItem(
      "Favorites Notes",
      "4",
      <Link replace to={"/dashboard/favorite"}>
        <BookOutlined />
      </Link>
    ),
    getItem(
      "Trash",
      "5",
      <Link replace to={"/dashboard/trash"}>
        <DeleteOutlined />
      </Link>
    ),
    getItem(
      "Settings",
      "6",
      <Link replace to={"/dashboard/account-settings"}>
        <SettingOutlined />
      </Link>
    ),

    getItem("Logout", "7", <LogoutOutlined />),
  ] as MenuItem[];

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
          style={{
            paddingTop: 81,
            backgroundColor: "#344152",
            color: "white",
            paddingLeft: 0,
          }}
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
