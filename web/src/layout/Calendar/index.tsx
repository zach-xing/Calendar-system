import React, { useMemo, useState } from "react";
import { Button, Calendar, Checkbox, Dropdown, Space } from "antd";
import type { CalendarMode } from "antd/es/calendar/generateCalendar";
import type { Dayjs } from "dayjs";
import { CellStyleBox, DotBox, LayoutCalendar } from "./styled";
import dayjs from "dayjs";
import { DownOutlined } from "@ant-design/icons";
import { ISchedule, ITask } from "@/types";

const DATE_FORMET = "YYYY-MM-DD";

/**
 * 根据当月获取数据 -- task
 */
const getTaskDataWithMonth = (list: ITask[]): string[] => {
  const res: string[] = [];
  list.forEach((item) => {
    const key = dayjs(item.time).format("YYYY-MM-DD");
    res.push(key);
  });
  return res;
};

/**
 * 根据当月获取数据 -- schedule
 */
const getScheduleDataWithMonth = (list: ISchedule[]): string[] => {
  const res: string[] = [];
  list.forEach((item) => {
    if (item.isFullDay) {
      const key = dayjs(item.startTime).format("YYYY-MM-DD");
      res.push(key);
    } else {
      const preDateStr = dayjs(item.startTime).format("YYYY-MM-"); // 之后直接在后面加个 day
      const start = Number(
        dayjs(item.startTime).format("YYYY-MM-DD").slice(-2)
      );
      const end = Number(dayjs(item.endTime).format("YYYY-MM-DD").slice(-2));
      for (let idx = start; idx < end; idx++) {
        const newKey = `${preDateStr}${idx < 10 ? "0" + idx : idx}`;
        res.push(newKey);
      }
      res.push(dayjs(item.endTime).format("YYYY-MM-DD"));
    }
  });
  return res;
};

/**
 * 日历部分
 */
const CalendarLayout = () => {
  const now = Date.now();
  const [curSelectedDate, setCurSelectedDate] = useState(
    dayjs(now).format(DATE_FORMET)
  );

  const [showScheduleDot, setShowScheduleDot] = useState(true);
  const [showTaskDot, setShowTaskDot] = useState(true);

  const onPanelChange = (value: Dayjs, mode: CalendarMode) => {
    console.log(value.format(DATE_FORMET), mode);
  };

  const DateCellComp = useMemo(() => {
    // eslint-disable-next-line react/display-name
    return (date: Dayjs) => {
      const isCurMonth = dayjs(date).isSame(curSelectedDate, "month");
      return (
        <>
          <CellStyleBox
            isCurMonth={isCurMonth}
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
          {isCurMonth && (
            <DotBox>
              {showScheduleDot && <div className='schedule'></div>}
              {showTaskDot && <div className='task'></div>}
            </DotBox>
          )}
        </>
      );
    };
  }, [curSelectedDate, now, showScheduleDot, showTaskDot]);

  return (
    <LayoutCalendar>
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
        <Button type='primary' style={{ marginTop: 20 }}>
          <Space>
            创建
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>

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

      <div style={{ marginBottom: 5 }}>
        <Checkbox
          checked={showScheduleDot}
          onChange={() => {
            setShowScheduleDot((prev) => !prev);
          }}
        >
          <span style={{ fontSize: 18 }}>显示日程</span>
        </Checkbox>
      </div>
      <div>
        <Checkbox
          checked={showTaskDot}
          onChange={() => {
            setShowTaskDot((prev) => !prev);
          }}
        >
          <span style={{ fontSize: 18 }}>显示任务</span>
        </Checkbox>
      </div>
    </LayoutCalendar>
  );
};

export default CalendarLayout;
