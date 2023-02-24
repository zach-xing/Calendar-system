import React from "react";
import { Button, DatePicker, Form, Input, message, Select } from "antd";
import { remindArr, repeatArr } from "../../constant";
import { createImportantDay } from "../../data/event";

/**
 * ImportantDay 事件的表单组件
 */
export default function ImportantDayForm() {
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    const newData = {
      category: "importantDay",
      title: values.title,
      dateString: values.selectedDate.format("YYYY-MM-DD"),
      remind: values.remind,
      repeat: values.repeat,
      desc: values.desc || "",
    };
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      await createImportantDay(user.id, newData);
      message.success("操作成功");
    } catch (error: any) {
      message.error(error.message || "操作失败");
    }
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
        remind: 0,
        repeat: 0,
      }}
    >
      <Form.Item
        label="标题"
        name="title"
        rules={[{ required: true, message: "请输入标题" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="日期"
        name="selectedDate"
        rules={[{ required: true, message: "请选择日期" }]}
      >
        <DatePicker />
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

      <Form.Item label="重复" name="repeat">
        <Select>
          {repeatArr.map((item) => (
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
