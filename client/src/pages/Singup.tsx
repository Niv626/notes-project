import React, { SetStateAction, Dispatch, useContext } from "react";
import { Card, Form, Input, Button } from "antd";
import "./singup.css";
import { Link, useNavigate } from "react-router-dom";
import api, { signup } from "../api/authApi";
import { AuthContext } from "../context/AuthContext";
import { openNotification } from "../utils/openNotification";
import { useMutation } from "react-query";

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

  const mutation = useMutation({
    mutationFn: signup,
    onSuccess: (response) => {
      setAuth({ accessToken: response.data["access_token"] });
      navigate("../login", { replace: true });
    },
    onError: ({ response }) => {
      if (response.status === 403)
        openNotification("topLeft", "Email is already taken");
      else
        openNotification("topLeft", response.data.message || "Unknown Error");
    },
  });

  const onFinish = (values) => {
    const { passwordConfirm, ...rest } = values;
    mutation.mutate(rest);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="site-card-border-less-wrapper">
      <Card title={<b>Sing Up</b>} className="signup-login-card">
        <Form
          name="basic"
          initialValues={{ remember: false }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          style={{ width: "100%" }}
        >
          <b>Email</b>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input />
          </Form.Item>

          <b>First Name</b>
          <Form.Item
            name="firstName"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input />
          </Form.Item>

          <b>Last Name</b>
          <Form.Item
            name="lastName"
            rules={[
              { required: true, message: "Please input your last name!" },
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
          <b>Password Confirmation</b>
          <Form.Item
            name="passwordConfirm"
            style={{ width: "100%", marginBottom: 5 }}
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password className="signup-input" />
          </Form.Item>
          <div>
            <div style={{ marginBottom: 30, paddingTop: 15 }}>
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
