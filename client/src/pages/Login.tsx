import React, { Dispatch, SetStateAction, useContext } from "react";
import { Card, Form, Input, Button } from "antd";
import "./singup.css";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api, { login } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { openNotification } from "../utils/openNotification";
import { useMutation, useQueryClient } from "react-query";
import { AxiosResponse } from "axios";

interface LoginProps {
  setAuth: Dispatch<SetStateAction<boolean>>;
}

const Login = () => {
  const { setAuth, auth }: any = useContext(AuthContext);
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
    <div className="site-card-border-less-wrapper">
      <Card title="Login" className="signup-login-card">
        <Form
          name="basic"
          // labelCol={{ span: 15 }}
          // wrapperCol={{ span: 60 }}
          initialValues={{ remember: false }}
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
          style={{ width: "100%" }}
        >
          <b>Email</b>
          <Form.Item
            // label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input />
          </Form.Item>
          <b>Password</b>
          <Form.Item
            // label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <div style={{ marginBottom: 16 }}>
            Need an account?{" "}
            <Link to="/signup">
              <b>Sign Up</b>
            </Link>
          </div>
          <Form.Item style={{ display: "flex", justifyContent: "center" }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: 200, height: 40 }}
            >
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
