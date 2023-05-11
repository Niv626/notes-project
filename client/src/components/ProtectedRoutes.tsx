import React from "react";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext, AuthData } from "../context/AuthContext";
import { Row } from "antd";

const ProtectedRoutes = () => {
  const { auth }: AuthData = useContext(AuthContext);
  return auth?.accessToken ? (
    <Row>
      <Outlet />
    </Row>
  ) : (
    <Navigate to="/" replace />
  );
};
export default ProtectedRoutes;
