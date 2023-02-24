import React from "react";
import { Button, DatePicker, Form, Input, message, Select, Switch } from "antd";
import { remindArr } from "@zk/types";
import { createSchedule } from "../../data/event";

interface IProps {
  isCreate: boolean;
}

/**
 * schedule 事件的表单组件
 */
const ScheduleForm: React.FC<IProps> = (props) => {
  const [form] = Form.useForm();
  const [isFullday, setIsFullDay] = React.useState<boolean>(false);

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
        isFullDay: false,
        remind: 0,
        desc: "",
      }}
    >
      <Form.Item
        label='标题'
        name='title'
        rules={[{ required: true, message: "请输入标题" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label='全天' name='isFullDay'>
        <Switch checked={isFullday} onChange={(val) => setIsFullDay(val)} />
      </Form.Item>

      <Form.Item
        label='日期'
        name='selectedDate'
        rules={[{ required: true, message: "请选择日期" }]}
      >
        {isFullday ? <DatePicker /> : <DatePicker.RangePicker showTime />}
      </Form.Item>

      <Form.Item label='提醒' name='remind'>
        <Select>
          {Object.keys(remindArr).map((item) => (
            <Select.Option key={item} title={item} value={remindArr[item]}>
              {item}
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
};

export default ScheduleForm;
