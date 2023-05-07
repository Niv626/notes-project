import React, { SetStateAction, Dispatch, useContext } from "react";
import { Card, Form, Input, Button } from "antd";
import "./singup.css";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/authApi";
import { AuthContext } from "../context/AuthContext";
import { openNotification } from "../utils/openNotification";

// switch to react query

interface SingupProps {
  setAuth: Dispatch<SetStateAction<boolean>>;
  email: string;
  password: string;
  name?: string;
  lastName?: string;
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
          JSON.stringify({
            email: values.email,
            password: values.password,
            firstName: values.name,
            lastName: values.lastName,
          })
        )
        .then((res) => {
          if (true) {
            setAuth({ accessToken: res.data["access_token"] });
            navigate("../dashboard", { replace: true });
          } else {
            openNotification("topLeft", "");
          }
        })
        .catch((e) => openNotification("topLeft", ""));
    };

    userData();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="site-card-border-less-wrapper">
      <Card title={<b>Sing Up</b>} className="signup-login-card">
        <Form
          name="basic"
          // labelCol={{ span: 15 }}
          // wrapperCol={{ span: 60 }}
          initialValues={{ remember: false }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
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

          <b>First Name</b>
          <Form.Item
            // label="Email"
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input />
          </Form.Item>

          <b>Last Name</b>
          <Form.Item
            // label="Email"
            name="lastName"
            rules={[
              { required: true, message: "Please input your last name!" },
            ]}
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
          <b>Password Confirmation</b>
          <Form.Item
            // label="Password Confirmation"
            name="password-confirm"
            style={{ width: "100%", marginBottom: 5 }}
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password className="signup-input" />
          </Form.Item>
          <div>
            <div style={{ marginBottom: 30 }}>
              Already have an account?{" "}
              <Link to="/login">
                <b>Log In</b>
              </Link>
            </div>
            <Form.Item style={{ display: "flex", justifyContent: "center" }}>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: 200, height: 40 }}
              >
                Sign Up
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Singup;
