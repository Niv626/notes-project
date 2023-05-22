import { QueryFunctionContext } from "react-query";
import app from "./authApi";

export const getUser = async () => {
  const res = await app.get("users/me");
  return res.data;
};

export const editUser = async ({ password, firstName, lastName, email }) => {
  const res = await app.patch("users/edit-user", {
    password,
    firstName,
    lastName,
    email,
  });
  return res.data;
};
