import React from "react";
import { Button, DatePicker, Form, Input, Select, Switch } from "antd";
import { remindArr } from "../../constant";

interface IProps {
  data?: any;
}

/**
 * schedule 事件的表单组件
 */
export default function ScheduleForm(props: IProps) {
  const [form] = Form.useForm();
  const [isFullday, setIsFullDay] = React.useState<boolean>(false);

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  return (
    <Form
      name="schedule"
      form={form}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      onFinish={onFinish}
      autoComplete="off"
      initialValues={{
        isFullday: false,
        remind: 0,
      }}
    >
      <Form.Item
        label="标题"
        name="title"
        rules={[{ required: true, message: "请输入标题" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="全天" name="isFullday">
        <Switch checked={isFullday} onChange={(val) => setIsFullDay(val)} />
      </Form.Item>

      <Form.Item
        label="日期"
        name="selectedDate"
        rules={[{ required: true, message: "请选择日期" }]}
      >
        {isFullday ? <DatePicker /> : <DatePicker.RangePicker showTime />}
      </Form.Item>

      <Form.Item label="提醒" name="remind">
        <Select>
          {remindArr.map((item) => (
            <Select.Option key={item.id} title={item.value} value={item.id}>
              {item.value}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="描述" name="desc">
        <Input.TextArea rows={4} maxLength={6} />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
        <Button htmlType="reset" block style={{ marginBottom: 10 }}>
          Reset
        </Button>
        <Button type="primary" htmlType="submit" block>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
