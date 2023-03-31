import React from "react";
import { Button, DatePicker, Form, Input, message, Select, Switch } from "antd";
import { createSchedule } from "../../data/event";
import dayjs from "dayjs";
import { RemindEnum } from "../../types";

function remindTitle(arg: RemindEnum): string {
  switch (arg) {
    case RemindEnum.FIVE_MIN:
      return "5 分钟前";
    case RemindEnum.TEN_MIN:
      return "10 分钟前";
    case RemindEnum.HALF_HOUR:
      return "30 分钟前";
    case RemindEnum.ONE_HOUR:
      return "1 小时前";
    case RemindEnum.ONT_DAY:
      return "1 天前";
  }
}

interface IProps {
  isCreate: boolean;
}

/**
 * schedule 事件的表单组件
 */
const ScheduleForm: React.FC<IProps> = (props) => {
  const [form] = Form.useForm();
  const [isFullday, setIsFullDay] = React.useState<boolean>(false);

  const onFinish = async (values: any) => {
    console.log("Schedule finish", {
      ...values,
      startTime: values.isFullDay
        ? dayjs(values.date).format("YYYY-MM-DD 00:00")
        : dayjs(values.rangeDate[0]).format("YYYY-MM-DD HH:mm"),
      endTime: values.isFullDay
        ? dayjs(values.date).format("YYYY-MM-DD 00:00")
        : dayjs(values.rangeDate[1]).format("YYYY-MM-DD HH:mm"),
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

      {isFullday ? (
        <Form.Item
          label='日期'
          name='date'
          rules={[{ required: true, message: "请选择日期" }]}
        >
          <DatePicker />
        </Form.Item>
      ) : (
        <Form.Item
          label='日期'
          name='rangeDate'
          rules={[{ required: true, message: "请选择日期" }]}
        >
          <DatePicker.RangePicker showTime />
        </Form.Item>
      )}

      <Form.Item label='提醒' name='remind'>
        <Select>
          {[0, 1, 2, 3, 4].map((item) => (
            <Select.Option key={item} title={item} value={remindTitle(item)}>
              {item}
            </Select.Option>
          ))}
          {}
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
