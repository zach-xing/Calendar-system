import React from "react";
import { Button, DatePicker, Form, Input, message, Select, Switch } from "antd";
import { remindArr } from "../../constant";
import { createSchedule } from "../../data/event";

interface IProps {
  data?: any;
}

/**
 * schedule 事件的表单组件
 */
export default function ScheduleForm(props: IProps) {
  const [form] = Form.useForm();
  const [isFullday, setIsFullDay] = React.useState<boolean>(false);

  const onFinish = async (values: any) => {
    let startTime, endTime;
    if (values.isFullDay) {
      startTime = endTime = values.selectedDate.format("YYYY-MM-DD HH:mm:ss");
    } else {
      startTime = values.selectedDate[0].format("YYYY-MM-DD HH:mm:ss");
      endTime = values.selectedDate[1].format("YYYY-MM-DD HH:mm:ss");
    }
    const newData: Omit<DataType.ScheduleType, "id"> = {
      category: "schedule",
      title: values.title,
      isFullDay: values.isFullDay,
      dateString: startTime.slice(0, 10),
      startTime: startTime,
      endTime: endTime,
      remind: values.remind,
      desc: values.desc || "",
    };
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      await createSchedule(user.id, newData);
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
        isFullDay: false,
        remind: 0,
        desc: "",
      }}
    >
      <Form.Item
        label="标题"
        name="title"
        rules={[{ required: true, message: "请输入标题" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="全天" name="isFullDay">
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
