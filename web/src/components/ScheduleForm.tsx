import { ISchedule } from "@/types";
import { remindTitle } from "@/utils/shared";
import {
  Form,
  Input,
  Checkbox,
  Button,
  message,
  DatePicker,
  Select,
  Switch,
} from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";

interface IProps {
  data?: ISchedule;
  callback?: Function;
}

/**
 * schedule create&modify form
 */
const ScheduleForm: React.FC<IProps> = (props) => {
  const { data } = props;
  const [isFullDay, setIsFullDay] = useState(data?.isFullDay || false);

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
        name='日程'
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        style={{ maxWidth: 800 }}
        initialValues={{
          ...data,
          date: dayjs(data?.startTime),
          rangeDate: [dayjs(data?.startTime), dayjs(data?.endTime)],
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

        <Form.Item label='全天'>
          <Switch checked={isFullDay} onChange={(val) => setIsFullDay(val)} />
        </Form.Item>

        {isFullDay ? (
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
              <Select.Option key={item} title={item} value={item}>
                {remindTitle(item)}
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

export default ScheduleForm;
