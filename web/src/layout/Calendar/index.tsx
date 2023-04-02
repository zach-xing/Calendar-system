import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Calendar, Checkbox, Dropdown, Space, message } from "antd";
import type { CalendarMode } from "antd/es/calendar/generateCalendar";
import type { Dayjs } from "dayjs";
import { CellStyleBox, DotBox, LayoutCalendar } from "./styled";
import dayjs from "dayjs";
import { DownOutlined } from "@ant-design/icons";
import { ISchedule, ITask } from "@/types";
import { fetchSchedule, fetchTask } from "@/api";

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
  const [curMonth, setCurMonth] = useState(dayjs(now).format("YYYY-MM"));

  const [scheduleStringArr, setScheduleStringArr] = useState<string[]>([]);
  const [taskStringArr, setTaskStringArr] = useState<string[]>([]);

  const [showScheduleDot, setShowScheduleDot] = useState(true);
  const [showTaskDot, setShowTaskDot] = useState(true);

  const fetchEventDataWithMonth = useCallback(
    async (uid: string) => {
      try {
        const { list: scheudleList } = await fetchSchedule(uid, curMonth);
        const { list: taskList } = await fetchTask(uid, curMonth);
        setScheduleStringArr(getScheduleDataWithMonth(scheudleList));
        setTaskStringArr(getTaskDataWithMonth(taskList));
      } catch (error) {
        console.error(error);
        message.error("获取当月数据失败");
      }
    },
    [curMonth]
  );

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user")!);
    fetchEventDataWithMonth(userData.id);
  }, [fetchEventDataWithMonth, curMonth]);

  const onPanelChange = (value: Dayjs, mode: CalendarMode) => {
    setCurMonth(value.format("YYYY-MM"));
  };

  const DateCellComp = useMemo(() => {
    // eslint-disable-next-line react/display-name
    return (date: Dayjs) => {
      const isCurMonth = date.isSame(curSelectedDate, "month");
      const hasSchedule = scheduleStringArr.includes(date.format("YYYY-MM-DD"));
      const hasTask = taskStringArr.includes(date.format("YYYY-MM-DD"));
      return (
        <>
          <CellStyleBox isCurMonth={isCurMonth} isNow={date.isSame(now, "day")}>
            <div
              className={`${
                date.isSame(curSelectedDate, "day") ? "isSelected" : ""
              }`}
              style={{ padding: 5 }}
            >
              <div>{date.format("DD")}</div>
            </div>
          </CellStyleBox>
          {isCurMonth && (
            <DotBox>
              {showScheduleDot && hasSchedule && (
                <div className='schedule'></div>
              )}
              {showTaskDot && hasTask && <div className='task'></div>}
            </DotBox>
          )}
        </>
      );
    };
  }, [
    curSelectedDate,
    now,
    scheduleStringArr,
    showScheduleDot,
    showTaskDot,
    taskStringArr,
  ]);

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
