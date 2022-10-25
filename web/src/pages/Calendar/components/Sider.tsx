import React from "react";
import { DownOutlined } from "@ant-design/icons";
import { Button, Calendar, Dropdown, Menu } from "antd";
import type { CalendarMode } from "antd/es/calendar/generateCalendar";
import type { Moment } from "moment";

const menu = (
  <Menu
    items={[
      {
        label: "日程",
        key: "0",
      },
      {
        label: "重要日",
        key: "1",
      },
    ]}
  />
);

/**
 * 侧边布局组件
 */
export default function Sider() {
  const onPanelChange = (value: Moment, mode: CalendarMode) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Dropdown overlay={menu} trigger={["click"]}>
        <Button
          type="primary"
          shape="round"
          icon={<DownOutlined />}
          size="large"
          style={{ margin: "20px 0" }}
        >
          创建
        </Button>
      </Dropdown>

      <Calendar fullscreen={false} onPanelChange={onPanelChange} />
    </div>
  );
}
