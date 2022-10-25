import { Layout, Image, Button, Avatar, Space } from "antd";
import React from "react";
import { SettingOutlined, SearchOutlined } from "@ant-design/icons";
import styles from "./index.module.scss";
import logo from "../../assets/avatar.png";

const { Header, Content, Sider } = Layout;

/**
 * 日历 page
 */
export default function Calendar() {
  return (
    <Layout className={styles.root}>
      {/* header 部分 */}
      <Header className={styles.header}>
        <div>
          <Image
            src={logo}
            alt="logo"
            className={styles.logo}
            preview={false}
          />
          <span style={{ fontSize: 18, marginLeft: 10 }}>日历</span>
        </div>
        <Space>
          <Button shape="circle" icon={<SettingOutlined />} />
          <Avatar
            style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
            size="large"
          >
            U
          </Avatar>
        </Space>
      </Header>

      <Layout className={styles.body}>
        <Sider width={300} className={styles.sider}>
          Sider
        </Sider>
        <Layout>
          <Content className={styles.content}>Content</Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
