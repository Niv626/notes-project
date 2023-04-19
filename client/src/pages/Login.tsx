import React, { Dispatch, SetStateAction, useContext } from "react";
import { Card, Form, Input, Button } from "antd";
import "./singup.css";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api, { login } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { openNotification } from "../utils/openNotification";
import { useMutation, useQueryClient } from "react-query";

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
        openNotification("topLeft");
      }
      queryClient.invalidateQueries("notes");
    },
  });

  const onFinish = (values: { email: string; password: string }) => {
    mutation.mutate(values);
  };

  return (
    <div className="site-card-border-less-wrapper">
      <Card title="Login" className="signup-login-card">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
          Need an account? <Link to="/signup">Sign Up</Link>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
