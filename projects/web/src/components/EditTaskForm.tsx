import React from "react";
import { Button, DatePicker, Form, Input, message, Select } from "antd";
import { remindArr, repeatArr } from "../constant";
import { updateImportantDay } from "../data/event";
import dayjs from "dayjs";

interface IProps {
  data: any;
}
/**
 * ImportantDay 事件的表单组件
 */
export default function EditImportantDayForm(props: IProps) {
  const { data } = props;
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {};

  return (
    <Form
      name='schedule'
      form={form}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      onFinish={onFinish}
      autoComplete='off'
      initialValues={{
        ...data,
        selectedDate: dayjs(data.dateString),
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
        name='selectedDate'
        rules={[{ required: true, message: "请选择日期" }]}
      >
        <DatePicker />
      </Form.Item>

      <Form.Item label='提醒' name='remind'>
        <Select>
          {remindArr.map((item) => (
            <Select.Option key={item.id} title={item.value} value={item.id}>
              {item.value}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label='重复' name='repeat'>
        <Select>
          {repeatArr.map((item) => (
            <Select.Option key={item.id} title={item.value} value={item.id}>
              {item.value}
            </Select.Option>
          ))}
        </Select>
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
