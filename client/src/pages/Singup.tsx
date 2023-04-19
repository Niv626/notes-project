import React, { SetStateAction, Dispatch, useContext } from "react";
import { Card, Form, Input, Button } from "antd";
import "./singup.css";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/authApi";
import { AuthContext } from "../context/AuthContext";
import { openNotification } from "../utils/openNotification";

interface SingupProps {
  setAuth: Dispatch<SetStateAction<boolean>>;
  email: string;
  password: string;
}

const Singup = () => {
  const { setAuth }: any = useContext(AuthContext);
  const navigate = useNavigate();

  const onFinish = (values: SingupProps) => {
    // use react query instead
    const userData = async () => {
      api
        .post(
          `/auth/signup`,
          JSON.stringify({ email: values.email, password: values.password })
        )
        .then((res) => {
          if (true) {
            setAuth({ accessToken: res.data["access_token"] });
            navigate("../dashboard", { replace: true });
          } else {
            openNotification("topLeft");
          }
        })
        .catch((e) => openNotification("topLeft"));
    };

    userData();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="site-card-border-less-wrapper">
      <Card title="Signup" className="signup-login-card">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
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
          <Form.Item
            label="Password Confirmation"
            name="password-confirm"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password className="signup-input" />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
          Already have an account? <Link to="/login">Log In</Link>
        </Form>
      </Card>
    </div>
  );
};

export default Singup;
