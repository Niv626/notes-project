import React, { useContext, useState } from "react";
import { Card, Form, Input, Button, Col } from "antd";
import "./login.css";

import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { login } from "../../api/authApi";
import { useNavigate } from "react-router-dom";
import { openNotification } from "../../utils/openNotification";
import { useMutation, useQueryClient } from "react-query";

const Login = () => {
  const { setAuth, auth }: any = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  localStorage.removeItem("access_token");
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      if (response.status === 200) {
        const accessToken = response.data["access_token"];
        setAuth({ accessToken: accessToken });
        localStorage.setItem("access_token", accessToken);
        const expiration = new Date();
        expiration.setSeconds(expiration.getSeconds() + 5);
        localStorage.setItem("expiration", expiration.toISOString());
        navigate("../dashboard", { replace: true });
      } else {
        openNotification("topLeft", "Unknown error occurred");
      }
      queryClient.invalidateQueries("notes");
    },
    onMutate: () => setIsLoading(true),
    onSettled: () => setIsLoading(false),
    onError: ({ response }) => {
      if (response.status === 403) {
        openNotification("topLeft", "Username or password are incorrect");
      }
      if (response.status === 400) {
        console.log("response", response);
        openNotification("topLeft", response.data.message?.[0]);
      }
    },
  });

  const onFinish = (values: { email: string; password: string }) => {
    mutation.mutate({ ...values, firstName: " ", lastName: " " });
  };

  return (
    <Form
      name="basic"
      initialValues={{ remember: false }}
      onFinish={onFinish}
      autoComplete="off"
      style={{ margin: "6%", color: "white" }}
    >
      <div className="login-title " style={{}}>
        Note Me
      </div>

      <div
        style={{
          marginLeft: "calc(50% - 20px)",
          paddingTop: 80,
          fontSize: 18,
        }}
      >
        <b>Login</b>{" "}
      </div>

      <b>Email</b>
      <Form.Item
        name="email"
        rules={[
          {
            type: "email",
            message: "The input is not valid email!",
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <b>Password</b>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <div style={{ marginBottom: 16 }}>
        Need an account?{" "}
        <Link style={{ color: "#ee4b2b" }} to="../signup">
          Sign Up
        </Link>
      </div>
      <Form.Item style={{ display: "flex", justifyContent: "center" }}>
        <Button
          type="primary"
          loading={isLoading}
          htmlType="submit"
          style={{ height: 40, backgroundColor: "#7a598e" }}
        >
          Sign In
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
