import React, { useRef } from "react";
import { Button, Card, Form, Input } from "antd";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { editUser, getUser } from "../api/userApi";
import { InputRef } from "antd/lib/input/Input";

const Settings: React.FC = () => {
  const { data: user } = useQuery("user", getUser);
  const [form] = Form.useForm();

  const mutation = useMutation({
    mutationFn: editUser,
    onSuccess: () => {
      form.resetFields(["password"]);
    },
    // onError: ({ response }) => {

    // },
  });

  //   const editUser = mutation

  return (
    <Card title="Settings" style={{ height: "90%", margin: 50 }}>
      <Card type="inner" title="Edit User Details">
        <Form form={form} onFinish={(values) => mutation.mutate(values)}>
          <b>First Name</b>
          <Form.Item name="firstName">
            <Input defaultValue={user?.firstName} />
          </Form.Item>

          <b>Last Name</b>
          <Form.Item name="lastName">
            <Input defaultValue={user?.lastName} />
          </Form.Item>

          <b>Change Password</b>
          <Form.Item name="password">
            <Input.Password placeholder="*********" />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <Button type="primary" htmlType="submit" size="middle">
              Edit
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card
        style={{ marginTop: 16 }}
        type="inner"
        title="Export Notes"
        //   extra={<a href="#">More</a>}
      >
        <Button size="middle" type="primary">
          Export
        </Button>
      </Card>
    </Card>
  );
};

export default Settings;
