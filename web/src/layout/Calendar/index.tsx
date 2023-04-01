import React, { useMemo, useState } from "react";
import { Badge, Button, Calendar, Dropdown, Space } from "antd";
import type { CalendarMode } from "antd/es/calendar/generateCalendar";
import type { Dayjs } from "dayjs";
import { CellStyleBox, DotBox, LayoutCalendar } from "./styled";
import dayjs from "dayjs";
import { DownOutlined } from "@ant-design/icons";

const DATE_FORMET = "YYYY-MM-DD";

/**
 * 日历部分
 */
const CalendarLayout = () => {
  const now = Date.now();
  const [curSelectedDate, setCurSelectedDate] = useState(
    dayjs(now).format(DATE_FORMET)
  );

  const onPanelChange = (value: Dayjs, mode: CalendarMode) => {
    console.log(value.format(DATE_FORMET), mode);
  };

  const DateCellComp = useMemo(() => {
    // eslint-disable-next-line react/display-name
    return (date: Dayjs) => (
      <>
        <CellStyleBox
          isCurMonth={dayjs(date).isSame(curSelectedDate, "month")}
          isNow={dayjs(date).isSame(now, "day")}
        >
          <div
            className={`${
              dayjs(date).isSame(curSelectedDate, "day") ? "isSelected" : ""
            }`}
            style={{ padding: 5 }}
          >
            <div>{date.format("DD")}</div>
          </div>
        </CellStyleBox>
        <DotBox isShow={true} />
      </>
    );
  }, [curSelectedDate, now]);

  return (
    <LayoutCalendar>
      <div style={{ width: 320, margin: "10px auto" }}>
        <Calendar
          fullscreen={false}
          onPanelChange={onPanelChange}
          onSelect={(date) => {
            setCurSelectedDate(date.format(DATE_FORMET));
          }}
          dateFullCellRender={DateCellComp}
        />
      </div>
      <Dropdown
        menu={{
          items: [
            {
              label: <Button type='link'>创建日程</Button>,
              key: "0",
            },
            {
              label: <Button type='link'>创建任务</Button>,
              key: "1",
            },
            {
              label: <Button type='link'>创建备忘录</Button>,
              key: "2",
            },
          ],
        }}
        trigger={["click"]}
      >
        <Button type='primary'>
          <Space>
            创建
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
    </LayoutCalendar>
  );
};

export default CalendarLayout;
