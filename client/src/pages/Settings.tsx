import React from "react";
import { Button, Card, Form, Input } from "antd";
import { useMutation, useQuery } from "react-query";
import { editUser, getUser } from "../api/userApi";

const Settings: React.FC = () => {
  const { data: user } = useQuery("user", getUser);
  const [form] = Form.useForm();

  const mutation = useMutation({
    mutationFn: editUser,
    onSuccess: () => {
      form.resetFields(["password"]);
    },
  });

  return (
    <Card title="Settings" style={{ height: "100%", margin: 0 }}>
      <Card type="inner" title="Edit User Details">
        <Form
          name="settings-form"
          initialValues={{
            ["firstName"]: user?.firstName,
            ["lastName"]: user?.lastName,
          }}
          form={form}
          onFinish={(values) => mutation.mutate(values)}
        >
          <b>First Name</b>
          <Form.Item id="settings-first-name" name="firstName">
            <Input />
          </Form.Item>

          <b>Last Name</b>
          <Form.Item id="settings-last-name" name="lastName">
            <Input />
          </Form.Item>

          <b>Change Password</b>
          <Form.Item id="settings-password" name="password">
            <Input.Password placeholder="*********" />
          </Form.Item>

          <Form.Item
            id="settings-edit-btn"
            name="settings-edit-btn"
            style={{ marginBottom: 0 }}
          >
            <Button type="primary" htmlType="submit" size="middle">
              Edit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Card>
  );
};

export default Settings;
