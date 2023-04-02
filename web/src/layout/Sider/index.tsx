import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Avatar, Button, Dropdown, Menu, Space } from "antd";
import type { MenuProps } from "antd";
import {
  HomeOutlined,
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
];

function Sider() {
  const router = useRouter();
  const [selectedMenu, setSelectedMenu] = useState(router.route.slice(1));

  useEffect(() => {
    setSelectedMenu(router.route.slice(1));
  }, [router.route]);

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
          defaultSelectedKeys={["home"]}
          selectedKeys={[selectedMenu]}
          mode='inline'
          theme='light'
          inlineCollapsed={true}
          items={items}
          style={{ backgroundColor: "white", border: "none" }}
          onClick={handleToPath}
        />
      </div>

      <div>
        <div style={{ marginBottom: 20 }}>
          <Avatar
            style={{ backgroundColor: "orange", verticalAlign: "middle" }}
          >
            {"U"}
          </Avatar>
        </div>
        <Dropdown
          menu={{
            items: [
              {
                label: (
                  <Button danger type='link'>
                    退出登录
                  </Button>
                ),
                key: "0",
              },
            ],
          }}
          trigger={["click"]}
        >
          <Space>
            <Button icon={<SmallDashOutlined />} />
          </Space>
        </Dropdown>
      </div>
    </SiderStyleBlock>
  );
}

export default Sider;
