import React, { useState, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

type Auth = {
  accessToken: string;
};

export interface AuthData {
  auth?: Auth;
  setAuth?: React.Dispatch<React.SetStateAction<Auth>>;
}

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState({
    accessToken: localStorage.getItem("access_token") || "",
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
