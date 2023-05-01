import React, { useState, createContext } from "react";

export const AuthContext = createContext({});

type Auth = {
  accessToken: string;
};

export type Collapsed = {
  collapsed: boolean;
};

export interface AuthData {
  auth?: Auth;
  setAuth?: React.Dispatch<React.SetStateAction<Auth>>;
  collapsed?: boolean;
  setCollapsed?: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState({
    accessToken: localStorage.getItem("access_token") || "",
  });
  const localCollapsed = localStorage.getItem("collapsed");
  const [collapsed, setCollapsed] = useState(
    JSON.parse(localCollapsed || "false") || false
  );

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        collapsed,
        setCollapsed,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
