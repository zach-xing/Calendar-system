import React from "react";
import Image from "next/image";
import { Button, Menu } from "antd";
import type { MenuProps } from "antd";
import {
  HomeOutlined,
  CalendarOutlined,
  UserOutlined,
  ScheduleOutlined,
  ClockCircleOutlined,
  BookOutlined,
  SmallDashOutlined,
} from "@ant-design/icons";
import { SiderStyleBlock } from "./styled";
import Logo from "../../assets/logo.png";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "1",
    label: "首页",
    icon: <HomeOutlined />,
  },
  {
    key: "2",
    label: "日历",
    icon: <CalendarOutlined />,
  },
  {
    key: "3",
    label: "日程",
    icon: <ScheduleOutlined />,
  },
  {
    key: "4",
    label: "任务",
    icon: <ClockCircleOutlined />,
  },
  {
    key: "5",
    label: "备忘录",
    icon: <BookOutlined />,
  },
  {
    key: "6",
    label: "个人",
    icon: <UserOutlined />,
  },
];

function Sider() {
  return (
    <SiderStyleBlock>
      <div>
        <Image
          src={Logo}
          alt='logo'
          width={40}
          height={40}
          style={{ marginBottom: 30 }}
        />

        <Menu
          defaultSelectedKeys={["1"]}
          mode='inline'
          theme='light'
          inlineCollapsed={true}
          items={items}
          style={{ backgroundColor: "white", border: "none" }}
        />
      </div>

      <Button icon={<SmallDashOutlined />} href='https://www.google.com' />
    </SiderStyleBlock>
  );
}

export default Sider;
