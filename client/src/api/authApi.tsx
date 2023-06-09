import axios from "axios";
import jwtDecode, { JwtPayload } from "jwt-decode";
import useAuth from "../hooks/useAuth";

const UNAUTHORIZED = 401;

export const login = async ({ email, password }) => {
  const res = await app.post(
    `/auth/signin`,
    JSON.stringify({ email, password })
  );
  return res;
};

export const signup = async ({ email, password, firstName, lastName }) => {
  const res = await app.post(
    `/auth/signup`,
    JSON.stringify({ email, password, firstName, lastName })
  );
  return res;
};

export const app = axios.create({
  baseURL: "https://note-me-server.onrender.com",
  // baseURL: "http://localhost:3333",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    withCredentials: true,
  },
});

app.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("access_token");
    if (!token) return config;
    const { exp }: JwtPayload = ({} = jwtDecode(token));

    if (token && exp && Date.now() < exp * 1000) {
      config.headers = {
        Authorization: `Bearer ${token}`,
      };
    } else {
      console.log("not valid token");
      localStorage.removeItem("access_token");
      window.location.replace("/");
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { status } = error.response;
    if (status === UNAUTHORIZED) {
      localStorage.removeItem("access_token");
      window.location.replace("/");
    }
    return Promise.reject(error);
  }
);

export default app;
