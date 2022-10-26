import { LockOutlined, PhoneOutlined } from "@ant-design/icons";
import { Input, Button, Form, Typography } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import LoginOrRegisterBg from "../components/LoginOrRegisterBg";

/**
 * 登录界面
 */
export default function Login() {
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  return (
    <LoginOrRegisterBg>
      <Typography.Title level={2}>Welcome back</Typography.Title>
      <Typography.Title level={5} type="secondary" style={{ marginBottom: 30 }}>
        Welcome back!Please enter your details
      </Typography.Title>

      <Form name="login" style={{ width: "50%" }} onFinish={onFinish}>
        <Form.Item
          name="account"
          rules={[{ required: true, message: "Please input your Account!" }]}
        >
          <Input prefix={<PhoneOutlined />} placeholder="账号" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="密码"
          />
        </Form.Item>

        <Button
          type="link"
          style={{ marginBottom: 30 }}
          onClick={() => navigate("/register")}
        >
          Register now!
        </Button>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Log in
          </Button>
        </Form.Item>
      </Form>
    </LoginOrRegisterBg>
  );
}
