import React, { useContext } from "react";
import { Card, Form, Input, Button, Col } from "antd";
import "./singup.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { login } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { openNotification } from "../utils/openNotification";
import { useMutation, useQueryClient } from "react-query";
import LoginImage from "../assets/pexels-lukas-317356.jpg";

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
      <Card
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
        bodyStyle={{ padding: 0 }}
        className="signup-login-card"
      >
        <Col span={24}>
          <Form
            name="basic"
            initialValues={{ remember: false }}
            onFinish={onFinish}
            autoComplete="off"
            style={{ width: "100%" }}
          >
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
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <div style={{ marginBottom: 16 }}>
              Need an account?{" "}
              <Link to="../signup">
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
        </Col>
        {/* <Col>
          <img width="100%" height="100%" src={LoginImage}></img>
        </Col> */}
      </Card>
    </div>
  );
};

export default Login;
