import React, { useContext, useEffect } from "react";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Singup from "./pages/Singup";
import { AuthContext, AuthData } from "./context/AuthContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import ProtectedRoutes from "./components/ProtectedRoutes";
import ContentPage from "./components/ContentPage";
import LeftBar from "./components/LeftBar";

const queryClient = new QueryClient();

// function getAuthExpiration() {
//   const storedExpirationDate = localStorage.getItem("expiration");
//   const expirationDate = new Date(storedExpirationDate as any);
//   const now = new Date();
//   const duration = expirationDate.getTime() - now.getTime();
//   return duration;
// }

export const LayoutPage = () => {
  return (
    <>
      <LeftBar />
      <Outlet />
    </>
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
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<LayoutPage />}>
            <Route index element={<ContentPage />}></Route>
            <Route
              path="favorite"
              element={<ContentPage favorite={true} />}
            ></Route>
            <Route path="about" element={<>about</>}></Route>
          </Route>
        </Route>
        <Route path="/signup" element={<Singup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
      </Routes>
      <ReactQueryDevtools initialIsOpen position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
