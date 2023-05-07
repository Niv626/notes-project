import axios from "axios";
import jwtDecode, { JwtDecodeOptions, JwtPayload } from "jwt-decode";
import useAuth from "../hooks/useAuth";

const UNAUTHORIZED = 401;

export const login = async ({ email, password, firstName, lastName }) => {
  const res = await app.post(
    `/auth/signin`,
    JSON.stringify({ email, password, firstName, lastName })
  );
  return res;
};

export const app = axios.create({
  baseURL: "https://note-me-server.onrender.com:3333",
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
    // console.log(
    //   "token && exp && Date.now() < exp * 1000",
    //   token && exp && Date.now() < exp * 1000
    // );
    // console.log("token ", token);
    // console.log("Date.now()", Date.now());

    if (token && exp && Date.now() < exp * 1000) {
      config.headers = {
        Authorization: `Bearer ${token}`,
      };
    } else {
      console.log("not valid token");
      localStorage.removeItem("access_token");
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
    }
    return Promise.reject(error);
  }
);

export default app;
