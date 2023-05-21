import React, { useContext, useEffect, useState } from "react";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import Singup from "./components/Signup/Singup";
import Login from "./components/Login/Login";
import { AuthContext, AuthData } from "./context/AuthContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import ProtectedRoutes from "./components/ProtectedRoutes";
import ContentPage from "./pages/ContentPage/ContentPage";
import LeftBar from "./components/LeftBar/LeftBar";
import Background from "./assets/cork-board.jpg";
import Settings from "./pages/Settings";
import { Col, Row } from "antd";
import AuthPage from "./pages/AuthPage/AuthPage";
import Whiteboard from "./components/Whiteboard/Whiteboard";
import { ReactFlowProvider } from "reactflow";
import LeftBars from "./components/LeftBar/LeftBars";

const queryClient = new QueryClient();

export const LayoutPage = () => {
  const { collapsed }: AuthData = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const onSearch = (e: React.FormEvent<HTMLInputElement>) =>
    setSearch(e.currentTarget.value);

  return (
    <Row style={{ width: "100%" }}>
      <Col span={collapsed ? 1 : 3} style={{ height: "100svh" }}>
        <LeftBars onSearch={onSearch} setSearch={setSearch} />
      </Col>
      <Col
        span={collapsed ? 23 : 21}
        className="top-bar-collapsed"
        style={{
          backgroundImage: `url(${Background})`,
          width: collapsed ? "95.834%" : "87.5%",
          position: "relative",
        }}
      >
        <Outlet context={[search, onSearch]} />
      </Col>
    </Row>
  );
};

function App() {
  const { auth, setAuth }: AuthData = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth?.accessToken) return;

    setTimeout(() => {
      setAuth && setAuth({ accessToken: "" });
      localStorage.removeItem("access_token");
      navigate("/", { replace: true });
    }, 1 * 60 * 60 * 1000); // 1hr
  }, [auth]);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactFlowProvider>
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path="/dashboard" element={<LayoutPage />}>
              <Route index element={<ContentPage />}></Route>
              <Route path="favorite" element={<ContentPage />}></Route>
              <Route path="trash" element={<ContentPage />}></Route>
              <Route path="account-settings" element={<Settings />}></Route>
              <Route path="whiteboard" element={<Whiteboard />}></Route>
            </Route>
          </Route>
          <Route path="/" element={<AuthPage />}>
            <Route path="/signup" element={<Singup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Login />} />
          </Route>
        </Routes>
      </ReactFlowProvider>
      <ReactQueryDevtools initialIsOpen position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
