import { QueryFunctionContext } from "react-query";
import app from "./authApi";

export const getUser = async () => {
  const res = await app.get("users/me");
  return res.data;
};

export const editUser = async ({ password, firstName, lastName }) => {
  console.log("{ password, firstName, lastName }", {
    password,
    firstName,
    lastName,
  });
  const res = await app.patch("users/edit-user", {
    password,
    firstName,
    lastName,
  });
  return res.data;
};
