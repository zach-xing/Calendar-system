import React from "react";
import { Calendar, Modal } from "antd";
import type { CalendarMode } from "antd/es/calendar/generateCalendar";
import type { Moment } from "moment";
import { CHANGE_CUR_MONTH, event } from "../../../events";
import moment from "moment";
import CalendarDateCell from "./CalendarDateCell";
import ScheduleForm from "../../../components/ScheduleForm";
import ImportantDayForm from "../../../components/ImportantDayForm";

export default function Content() {
  const [curDate, setCurDate] = React.useState(
    new Date().toISOString().slice(0, 10)
  );
  const [curOpenEventModal, setCurOpenEventModal] = React.useState<
    "" | "schedule" | "importantDay"
  >("");

  React.useEffect(() => {
    event.on(CHANGE_CUR_MONTH, listenChangeMonth);
    return () => {
      event.off(CHANGE_CUR_MONTH, listenChangeMonth);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const listenChangeMonth = (dateString: string) => {
    setCurDate(dateString);
  };

  const onPanelChange = (value: Moment, mode: CalendarMode) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };

  // 点击某个单元格
  const handleSelect = (newValue: Moment) => {
    setCurDate(newValue.format("YYYY-MM-DD"));
  };

  const renderItem = (date: Moment) => {
    if (date.format("YYYY-MM-DD") === "2022-10-26")
      return (
        <CalendarDateCell setCurOpenEditEventModal={setCurOpenEventModal} />
      );
  };

  return (
    <>
      <Calendar
        value={moment(curDate)}
        onPanelChange={onPanelChange}
        dateCellRender={renderItem}
        headerRender={({ value }) => (
          <div style={{ fontSize: 18, fontWeight: "bold", padding: 10 }}>
            {value.format("YYYY年MM月")}
          </div>
        )}
        onSelect={handleSelect}
      />

      <Modal
        title={curOpenEventModal === "schedule" ? "编辑日程" : "编辑重要日"}
        open={curOpenEventModal.length !== 0}
        onCancel={() => setCurOpenEventModal("")}
        footer={null}
      >
        {curOpenEventModal === "schedule" ? (
          <ScheduleForm />
        ) : (
          <ImportantDayForm />
        )}
      </Modal>
    </>
  );
}
