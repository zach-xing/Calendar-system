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
import { useRouter } from "next/router";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "home",
    label: "首页",
    icon: <HomeOutlined />,
  },
  {
    key: "schedule",
    label: "日程",
    icon: <ScheduleOutlined />,
  },
  {
    key: "task",
    label: "任务",
    icon: <ClockCircleOutlined />,
  },
  {
    key: "memo",
    label: "备忘录",
    icon: <BookOutlined />,
  },
  {
    key: "user",
    label: "个人",
    icon: <UserOutlined />,
  },
];

function Sider() {
  const router = useRouter();

  const handleToPath = ({ item, key }: any) => {
    router.push(`/${key}`);
  };

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
          onClick={handleToPath}
        />
      </div>

      <Button icon={<SmallDashOutlined />} href='https://www.google.com' />
    </SiderStyleBlock>
  );
}

export default Sider;
