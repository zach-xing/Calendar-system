import styled from "@emotion/styled";
import React, { useState } from "react";
import ScrollBlock from "@/components/ScrollBlock";
import MenuCard from "./components/MenuCard";
import { Button, Form, Input, message } from "antd";
import { IMemo } from "@/types";

const ContainerStyleBox = styled.div`
  display: flex;
  margin-top: 10px;
  .leftSider {
    width: 260px;
    background-color: white;
    margin-right: 20px;
  }
  .rightContainer {
    width: 100%;
    background-color: white;
    text-align: center;
    h3 {
      text-align: left;
    }
  }
`;

/**
 * 备忘录
 */
const MemoPage = () => {
  const [curMemo, setCurMemo] = useState<IMemo>();

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    message.error("请填写完整");
  };

  return (
    <>
      <h1>备忘录</h1>
      <Button type='primary'>创建</Button>
      <ContainerStyleBox>
        <div className='leftSider'>
          <ScrollBlock height={"calc(100vh - 180px)"}>
            <MenuCard
              title={"asdasda撒旦水电费水电费水电费使得发送到"}
              lastModifiedTime={"sdfsdf"}
            />
            <MenuCard title={"aaa"} lastModifiedTime={"sdfsd"} />
            <MenuCard title={"sdfsdf"} lastModifiedTime={"sdfsdf"} />
            <MenuCard title={"aaa"} lastModifiedTime={"sdfsd"} />
            <MenuCard title={"sdfsdf"} lastModifiedTime={"sdfsdf"} />
            <MenuCard title={"aaa"} lastModifiedTime={"sdfsd"} />
            <MenuCard title={"sdfsdf"} lastModifiedTime={"sdfsdf"} />
            <MenuCard title={"aaa"} lastModifiedTime={"sdfsd"} />
            <MenuCard title={"sdfsdf"} lastModifiedTime={"sdfsdf"} />
            <MenuCard title={"aaa"} lastModifiedTime={"sdfsd"} />
          </ScrollBlock>
        </div>

        <div className='rightContainer'>
          {!!curMemo ? (
            <ScrollBlock height={"calc(100vh - 180px)"}>
              <Form
                name='basic'
                style={{ maxWidth: 600, margin: "0 auto" }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete='off'
              >
                <h3 style={{ marginTop: 10 }}>标题</h3>
                <Form.Item
                  name='title'
                  rules={[
                    { required: true, message: "Please input your title!" },
                  ]}
                >
                  <Input placeholder='标题' />
                </Form.Item>

                <h3>详情</h3>
                <Form.Item name='text'>
                  <Input.TextArea rows={10} placeholder='详情' />
                </Form.Item>

                <Form.Item>
                  <Button type='primary' htmlType='submit'>
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </ScrollBlock>
          ) : (
            <div
              style={{
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#383838",
              }}
            >
              <h2>请选择左边某个备忘录 或 创建备忘录</h2>
            </div>
          )}
        </div>
      </ContainerStyleBox>
    </>
  );
};

export default MemoPage;
