import React, { useEffect, useState } from "react";
import { Avatar, Button, Card, Form, Input } from "antd";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { editUser, getUser } from "../../api/userApi";
import { EditOutlined, UserOutlined } from "@ant-design/icons";
import "./settings.css";

const Settings: React.FC = () => {
  const { data: user } = useQuery("user", getUser);
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditable, setIsEditable] = useState(true);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: editUser,
    onSuccess: () => {
      form.resetFields(["password"]);
      queryClient.invalidateQueries("user");
    },
    onMutate: () => setIsLoading(true),
    onSettled: () => {
      setIsLoading(false);
      setIsEditable(true);
    },
  });

  useEffect(() => {
    form.setFieldValue("firstName", user?.firstName);
    form.setFieldValue("lastName", user?.lastName);
    form.setFieldValue("email", user?.email);
  }, [user]);

  const gridStyle: React.CSSProperties = {
    textAlign: "center",
    marginTop: 30,
  };

  return (
    <Card
      bodyStyle={{}}
      headStyle={{ display: "flex", justifyContent: "space-around" }}
      title={
        <div style={{ paddingLeft: "8%" }}>
          <b>Account Settings</b>
        </div>
      }
      style={{
        height: "100vh",
        marginLeft: 0,
      }}
    >
      <Card.Grid
        style={{
          ...gridStyle,
          width: "20%",
          backgroundColor: "rgb(233, 233, 233)",
          marginLeft: 70,
        }}
        title="Edit User Details"
        className="avatar-grid"
      >
        <div>
          <Avatar
            className="avatar-profile"
            icon={<UserOutlined style={{ position: "relative", top: 10 }} />}
          />
          <div className="text-capitalize" style={{ marginTop: 30 }}>
            <b>{`${user?.firstName} ${user?.lastName}`}</b>
          </div>
          <b>{user?.email}</b>
          <div style={{ marginTop: 15 }}>
            <Button
              type="primary"
              disabled={!isEditable}
              onClick={() => setIsEditable(false)}
            >
              <EditOutlined />
              Edit Profile
            </Button>
          </div>
        </div>
      </Card.Grid>
      <div style={{ color: "white" }}>temp</div>
      <Card.Grid
        style={{
          ...gridStyle,
          width: "70%",
          backgroundColor: "rgb(233, 233, 233)",
        }}
        className="edit-user-forn-grid"
        title="Edit User Details"
      >
        <b style={{ fontSize: 16 }}>Edit Account Details</b>

        <Form
          name="settings-form"
          disabled={isEditable}
          labelCol={{ span: 80 }}
          style={{
            paddingLeft: "15%",
            paddingRight: "15%",
            paddingTop: 60,
          }}
          initialValues={{
            ["firstName"]: user?.firstName,
            ["lastName"]: user?.lastName,
            ["email"]: user?.email,
          }}
          form={form}
          onFinish={(values) => mutation.mutate(values)}
        >
          <Form.Item
            label="First Name"
            id="settings-first-name"
            name="firstName"
          >
            <Input />
          </Form.Item>
          <Form.Item label="Last Name" id="settings-last-name" name="lastName">
            <Input />
          </Form.Item>
          <Form.Item label="Email" id="settings-last-name" name="email">
            <Input />
          </Form.Item>
          <Form.Item
            label="Change Password"
            id="settings-password"
            name="password"
          >
            <Input.Password placeholder="*********" />
          </Form.Item>
          <Form.Item
            id="settings-edit-btn"
            name="settings-edit-btn"
            style={{
              marginBottom: 0,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Button
              loading={isLoading}
              type="primary"
              htmlType="submit"
              size="middle"
            >
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      </Card.Grid>
    </Card>
  );
};

export default Settings;
