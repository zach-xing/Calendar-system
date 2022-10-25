import React from "react";
import { Calendar } from "antd";
import type { CalendarMode } from "antd/es/calendar/generateCalendar";
import type { Moment } from "moment";

export default function Content() {
  const onPanelChange = (value: Moment, mode: CalendarMode) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };

  const renderItem = (date: Moment) => {
    if (date.format("YYYY-MM-DD") === "2022-10-26")
      return (
        <>
          <div style={{ backgroundColor: "pink" }}>123</div>
          <div style={{ backgroundColor: "green" }}>456</div>
          <div style={{}}>...more...</div>
        </>
      );
  };

  return (
    <Calendar
      onPanelChange={onPanelChange}
      dateCellRender={renderItem}
      headerRender={({ value }) => (
        <div style={{ fontSize: 18, fontWeight: "bold", padding: 10 }}>
          {value.format("YYYY年MM月")}
        </div>
      )}
    />
  );
}
