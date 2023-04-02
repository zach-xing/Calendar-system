import { createMemo, deleteMemo, modifyMemo } from "@/api";
import { IMemo } from "@/types";
import { Form, Input, Button, message, Space, Popconfirm } from "antd";
import React, { Component, useEffect } from "react";

interface IProps {
  uid: string;
  data?: IMemo;
  callback?: Function;
  deleteCallback?: Function;
}

const MemoForm: React.FC<IProps> = (props) => {
  const { uid, data, callback, deleteCallback } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(data);
  }, [data, form]);

  const onFinish = async (values: any) => {
    try {
      if (!!data) {
        await modifyMemo(uid, { ...values, id: data.id });
      } else {
        await createMemo(uid, values);
      }
      message.success("保存成功");
      callback && callback();
    } catch (error) {
      console.error(error);
      message.error("保存失败");
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    message.error("请填写完整");
  };

  const handleDelete = async () => {
    try {
      await deleteMemo(data?.id!);
      deleteCallback && deleteCallback();
    } catch (error) {
      console.error(error);
      message.error("删除失败");
    }
  };

  return (
    <div>
      {!!data && <h2 style={{ padding: 20 }}>修改备忘录</h2>}
      <Form
        form={form}
        style={{ maxWidth: 600, margin: "0 auto" }}
        initialValues={data}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
      >
        <h3 style={{ marginTop: 10 }}>标题</h3>
        <Form.Item
          name='title'
          rules={[{ required: true, message: "Please input your title!" }]}
        >
          <Input placeholder='标题' />
        </Form.Item>

        <h3>详情</h3>
        <Form.Item name='text'>
          <Input.TextArea rows={10} placeholder='详情' />
        </Form.Item>

        <Form.Item>
          <Space>
            {!!data && (
              <Popconfirm
                title='确定删除么?'
                onConfirm={handleDelete}
                okText='Yes'
                cancelText='No'
              >
                <Button danger ghost>
                  删除
                </Button>
              </Popconfirm>
            )}

            <Button type='primary' htmlType='submit'>
              保存
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default MemoForm;
