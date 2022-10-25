import React from "react";
import { Calendar } from "antd";
import type { CalendarMode } from "antd/es/calendar/generateCalendar";
import type { Moment } from "moment";

export default function Content() {
  const onPanelChange = (value: Moment, mode: CalendarMode) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };

  return <Calendar onPanelChange={onPanelChange} />;
}
