import React from "react";
import { DownOutlined } from "@ant-design/icons";
import { Button, Calendar, Dropdown, Menu, MenuProps, Modal } from "antd";
import type { CalendarMode } from "antd/es/calendar/generateCalendar";
import type { Moment } from "moment";
import ScheduleForm from "../../../components/ScheduleForm";

/**
 * 侧边布局组件
 */
export default function Sider() {
  const [curOpenEventModal, setCurOpenEventModal] = React.useState<
    "" | "schedule" | "importantDay"
  >("");

  const onPanelChange = (value: Moment, mode: CalendarMode) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };

  const handleOpenModal: MenuProps["onClick"] = (e) => {
    setCurOpenEventModal(e.key as "schedule" | "importantDay");
  };

  const handleOk = () => {
    setCurOpenEventModal("");
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Dropdown
        overlay={
          <Menu
            items={[
              { label: "日程", key: "schedule" }, // 菜单项务必填写 key
              { label: "重要日", key: "importantDay" },
            ]}
            onClick={handleOpenModal}
          />
        }
        trigger={["click"]}
      >
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

      <Modal
        title={curOpenEventModal === "schedule" ? "创建日程" : "创建重要日"}
        open={curOpenEventModal.length !== 0}
        onOk={handleOk}
        onCancel={() => setCurOpenEventModal("")}
        footer={null}
      >
        <ScheduleForm />
      </Modal>
    </div>
  );
}
