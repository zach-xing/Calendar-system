import React from "react";
import { DownOutlined } from "@ant-design/icons";
import { Button, Calendar, Dropdown, Menu, MenuProps, Modal } from "antd";
import type { CalendarMode } from "antd/es/calendar/generateCalendar";
import type { Dayjs } from "dayjs";
import ScheduleForm from "../components/ScheduleForm";
import TaskForm from "../components/TaskForm";
import { CHANGE_CUR_MONTH, event } from "../events";

/**
 * 侧边布局组件
 */
export default function Sider() {
  const [curOpenEventModal, setCurOpenEventModal] = React.useState<
    "" | "schedule" | "task"
  >("");

  const onPanelChange = (value: Dayjs, mode: CalendarMode) => {
    // console.log(value.format("YYYY-MM-DD"), mode);
    event.emit(CHANGE_CUR_MONTH, value.format("YYYY-MM-DD"));
  };

  const handleOpenModal: MenuProps["onClick"] = (e) => {
    setCurOpenEventModal(e.key as "schedule" | "task");
  };

  const handleOk = () => {
    setCurOpenEventModal("");
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Dropdown
        menu={{
          items: [
            { label: "日程", key: "schedule", onClick: handleOpenModal }, // 菜单项务必填写 key
            { label: "重要日", key: "task", onClick: handleOpenModal },
          ],
        }}
        trigger={["click"]}
      >
        <Button
          type='primary'
          shape='round'
          icon={<DownOutlined />}
          size='large'
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
        {curOpenEventModal === "schedule" ? <ScheduleForm /> : <TaskForm />}
      </Modal>
    </div>
  );
}
