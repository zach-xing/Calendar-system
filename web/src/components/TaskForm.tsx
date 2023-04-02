import { createTask, modifyTask } from "@/api";
import { ITask } from "@/types";
import { levelTitle } from "@/utils/shared";
import { Form, Input, Button, message, DatePicker, Select, Switch } from "antd";
import dayjs from "dayjs";
import React from "react";

interface IProps {
  uid: string;
  data?: ITask;
  forceDateString?: string; // 强制展示这个日期
  callback?: Function;
}

/**
 * schedule create&modify form
 */
const TaskForm: React.FC<IProps> = (props) => {
  const { uid, data, callback, forceDateString } = props;

  const onFinish = async (values: any) => {
    try {
      const newValues = {
        ...values,
        isDone: data?.isDone || false,
      };
      if (!!data) {
        await modifyTask(uid, { ...newValues, id: data.id });
      } else {
        await createTask(uid, newValues);
      }
      callback && callback();
      message.success("保存任务成功");
    } catch (error) {
      console.error(error);
      message.error("保存任务失败");
    }
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
          desc: "",
          level: 4,
          ...data,
          time: dayjs(forceDateString || data?.time),
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

export default TaskForm;
