import React, { useState, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

type Auth = {
  accessToken: string;
};

type Collapsed = {
  collapsed: boolean;
};

export interface AuthData {
  auth?: Auth;
  setAuth?: React.Dispatch<React.SetStateAction<Auth>>;
  collapsed?: Collapsed;
  setCollapsed?: React.Dispatch<React.SetStateAction<Collapsed>>;
}

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState({
    accessToken: localStorage.getItem("access_token") || "",
  });
  const localCollapsed = localStorage.getItem("collapsed");
  // console.log("localCollapsed", localCollapsed);
  const [collapsed, setCollapsed] =
    useState(JSON.parse(localCollapsed || "false")) || false;

  return (
    <AuthContext.Provider value={{ auth, setAuth, collapsed, setCollapsed }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
