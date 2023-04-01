import React from "react";
import { Calendar } from "antd";
import type { CalendarMode } from "antd/es/calendar/generateCalendar";
import type { Dayjs } from "dayjs";
import { LayoutCalendar } from "./styled";

/**
 * 日历部分
 */
const CalendarLayout = () => {
  const onPanelChange = (value: Dayjs, mode: CalendarMode) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };

  return (
    <LayoutCalendar>
      <div style={{ width: 320, margin: "0 auto" }}>
        <Calendar fullscreen={false} onPanelChange={onPanelChange} />
      </div>
    </LayoutCalendar>
  );
};

export default CalendarLayout;
