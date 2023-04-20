import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import AuthProvider from "./context/AuthContext";
import CollapsedProvider from "./context/CollapesdContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <>error page</>,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        {/* <CollapsedProvider> */}
        <App />
        {/* </CollapsedProvider> */}
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
