import { createSchedule, modifySchedule } from "@/api";
import { ISchedule } from "@/types";
import { remindTitle } from "@/utils/shared";
import { Form, Input, Button, message, DatePicker, Select, Switch } from "antd";
import dayjs, { Dayjs } from "dayjs";
import React, { useState } from "react";

interface IProps {
  uid: string;
  data?: ISchedule;
  forceDateString?: string; // 强制展示这个日期
  callback?: Function;
}

/**
 * schedule create&modify form
 */
const ScheduleForm: React.FC<IProps> = (props) => {
  const { data, uid, callback, forceDateString } = props;
  const [isFullDay, setIsFullDay] = useState(data?.isFullDay || false);

  const onFinish = async (values: any) => {
    console.log("Success:", values);
    try {
      const newValues = {
        ...values,
        remind: Number(values.remind),
        isFullDay,
      };
      if (!!values.date) {
        const timeStr = (values.date as Dayjs).format("YYYY-MM-DD HH:mm");
        newValues["startTime"] = timeStr;
        newValues["endTime"] = timeStr;
      }
      if (!!values.rangeDate) {
        newValues["startTime"] = (values.rangeDate[0] as Dayjs).format(
          "YYYY-MM-DD HH:mm"
        );
        newValues["endTime"] = (values.rangeDate[1] as Dayjs).format(
          "YYYY-MM-DD HH:mm"
        );
      }
      if (!!data) {
        await modifySchedule(uid, { ...newValues, id: data.id });
      } else {
        await createSchedule(uid, { ...newValues });
      }
      message.success("保存成功");
      callback && callback();
    } catch (error) {
      console.error(error);
      message.error("保存失败");
    }
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
          remind: 0,
          desc: "",
          ...data,
          date: dayjs(data?.startTime),
          rangeDate: [
            dayjs(forceDateString || data?.startTime),
            dayjs(forceDateString || data?.endTime),
          ],
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
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type='primary' htmlType='submit'>
            保存
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ScheduleForm;
