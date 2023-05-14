import React from "react";
import { Card, Col } from "antd";
import { Outlet } from "react-router-dom";
import NoteBackground from "../../assets/pexels-polina-zimmerman-3782226.jpg";

const AuthPage = () => {
  return (
    <div className="site-card-border-less-wrapper">
      <Card
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          backgroundColor: "#F5F5F5",
          border: "none",
        }}
        bodyStyle={{ padding: 0, height: "100%" }}
        className="signup-login-card"
      >
        <Col span={10} style={{ backgroundColor: "rgb(52, 65, 82)" }}>
          <Outlet />
        </Col>
        <Col
          span={14}
          style={{
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundImage: `url(${NoteBackground})`,
          }}
        ></Col>
      </Card>
    </div>
  );
};

export default AuthPage;
