import { useRouter } from "next/router";
import { LockOutlined, PhoneOutlined } from "@ant-design/icons";
import { Input, Button, Form, Typography, message } from "antd";
import LoginOrRegisterBg from "@/components/LoginOrRegisterBg";
import { login } from "@/api/user";

/**
 * 登录界面
 */
export default function Login() {
  const router = useRouter();

  // 登录
  const onFinish = async (values: any) => {
    try {
      const data = await login(values);
      window.localStorage.setItem("user", JSON.stringify(data));
      message.success("登录成功");
      router.replace("/home");
    } catch (error: any) {
      console.error(error);
      message.error(error.message ?? "登录失败");
    }
  };

  return (
    <LoginOrRegisterBg>
      <Typography.Title level={2}>Welcome back</Typography.Title>
      <Typography.Title level={5} type='secondary' style={{ marginBottom: 30 }}>
        Welcome back!Please enter your details
      </Typography.Title>

      <Form name='login' style={{ width: "50%" }} onFinish={onFinish}>
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
          onClick={() => router.push("/register")}
        >
          Register now!
        </Button>

        <Form.Item>
          <Button type='primary' htmlType='submit' block>
            Log in
          </Button>
        </Form.Item>
      </Form>
    </LoginOrRegisterBg>
  );
}
