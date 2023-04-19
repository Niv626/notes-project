import { QueryFunctionContext } from "react-query";
import app from "./authApi";

export const getUser = async () => {
  const res = await app.get("users/me");
  return res.data;
};
