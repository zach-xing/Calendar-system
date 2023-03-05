import React from "react";
import { Button, DatePicker, Form, Input, message, Select } from "antd";
import { remindArr, repeatArr } from "../../constant";
import dayjs from "dayjs";

interface IProps {
  callback: () => void;
}

/**
 * Task 事件的表单组件
 */
export default function TaskForm() {
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    console.log("Task finish", {
      ...values,
      isDone: false,
      time: dayjs(values.time).format("YYYY MM-DD"),
    });
  };

  return (
    <Form
      name='schedule'
      form={form}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      onFinish={onFinish}
      autoComplete='off'
      initialValues={{
        remind: 0,
        repeat: 0,
      }}
    >
      <Form.Item
        label='标题'
        name='title'
        rules={[{ required: true, message: "请输入标题" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label='日期'
        name='time'
        rules={[{ required: true, message: "请选择日期" }]}
      >
        <DatePicker />
      </Form.Item>

      <Form.Item label='描述' name='desc'>
        <Input.TextArea rows={4} maxLength={6} />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
        <Button htmlType='reset' block style={{ marginBottom: 10 }}>
          Reset
        </Button>
        <Button type='primary' htmlType='submit' block>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}