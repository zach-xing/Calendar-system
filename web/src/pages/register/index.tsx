import LoginOrRegisterBg from "@/components/LoginOrRegisterBg";
import { UserOutlined, LockOutlined, PhoneOutlined } from "@ant-design/icons";
import { Input, Button, Form, Typography, message } from "antd";
import { useRouter } from "next/router";
import React from "react";

/**
 * 登录界面
 */
export default function Register() {
  const router = useRouter();

  const onFinish = async (values: any) => {
    try {
      // await register(values);
      // window.localStorage.setItem("user", JSON.stringify(data));
      message.success("注册成功, 去登录吧");
      router.replace("/login");
    } catch (error: any) {
      message.error(error.message ?? "注册失败");
    }
  };

  return (
    <LoginOrRegisterBg>
      <Typography.Title level={2}>Welcome! New User</Typography.Title>
      <Typography.Title level={5} type='secondary' style={{ marginBottom: 30 }}>
        Welcome !Please enter your details
      </Typography.Title>

      <Form name='login' style={{ width: "50%" }} onFinish={onFinish}>
        <Form.Item
          name='name'
          rules={[{ required: true, message: "Please input your Name!" }]}
        >
          <Input prefix={<UserOutlined />} placeholder='名称' />
        </Form.Item>

        <Form.Item
          name='account'
          rules={[{ required: true, message: "Please input your Account!" }]}
        >
          <Input prefix={<PhoneOutlined />} placeholder='账号' />
        </Form.Item>

        <Form.Item
          name='password'
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input prefix={<LockOutlined />} type='password' placeholder='密码' />
        </Form.Item>

        <Button
          type='link'
          style={{ marginBottom: 30 }}
          onClick={() => router.replace("/login")}
        >
          跳转登录
        </Button>

        <Form.Item>
          <Button type='primary' htmlType='submit' block>
            Register
          </Button>
        </Form.Item>
      </Form>
    </LoginOrRegisterBg>
  );
}
