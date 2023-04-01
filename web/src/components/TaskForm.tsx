import { ITask } from "@/types";
import { levelTitle, remindTitle } from "@/utils/shared";
import { Form, Input, Button, message, DatePicker, Select, Switch } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";

interface IProps {
  data?: ITask;
  callback?: Function;
}

/**
 * schedule create&modify form
 */
const TaskForm: React.FC<IProps> = (props) => {
  const { data } = props;

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.error("Failed:", errorInfo);
    message.error("填写有误");
  };

  return (
    <div>
      <Form
        name='任务'
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        style={{ maxWidth: 800 }}
        initialValues={{
          ...data,
          time: dayjs(data?.time),
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
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
          rules={[{ required: true, message: "请选择截止日期" }]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item label='优先级' name='level'>
          <Select>
            {[1, 2, 3, 4].map((item) => (
              <Select.Option key={item} title={item} value={item}>
                {levelTitle(item)}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label='描述' name='desc'>
          <Input.TextArea rows={4} maxLength={6} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default TaskForm;
