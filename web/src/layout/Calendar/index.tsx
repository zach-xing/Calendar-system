import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Button,
  Calendar,
  Checkbox,
  Dropdown,
  Modal,
  Space,
  message,
} from "antd";
import type { CalendarMode } from "antd/es/calendar/generateCalendar";
import type { Dayjs } from "dayjs";
import { CellStyleBox, DotBox, LayoutCalendar } from "./styled";
import dayjs from "dayjs";
import { DownOutlined } from "@ant-design/icons";
import { ISchedule, ITask } from "@/types";
import { fetchSchedule, fetchTask, useFetchSiderData } from "@/api";
import {
  REFRESH_HOME_PAGE_DATE,
  REFRESH_MEMO_DATE,
  REFRESH_SCHEDULE_DATE,
  REFRESH_SIDER_CALDENDAR_DATE,
  REFRESH_TASK_DATE,
  eventInstance,
} from "@/events";
import TaskForm from "@/components/TaskForm";
import ScheduleForm from "@/components/ScheduleForm";
import MemoForm from "@/components/MemoForm";

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

  // const [scheduleStringArr, setScheduleStringArr] = useState<string[]>([]);
  // const [taskStringArr, setTaskStringArr] = useState<string[]>([]);

  const [showScheduleDot, setShowScheduleDot] = useState(true);
  const [showTaskDot, setShowTaskDot] = useState(true);

  const [isModalFlag, setIsModalFlag] = useState<
    "" | "schedule" | "task" | "memo"
  >("");
  const [uid, setUid] = useState("");
  const { siderData, refetchSiderData } = useFetchSiderData(uid, curMonth);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user")!);
    setUid(userData.id);
  }, []);

  const handleCreate = (flag: "schedule" | "task" | "memo") => {
    setIsModalFlag(flag);
  };

  // const fetchEventDataWithMonth = useCallback(
  //   async (uid: string) => {
  //     try {
  //       const { list: scheudleList } = await fetchSchedule(uid, curMonth);
  //       const { list: taskList } = await fetchTask(uid, curMonth);
  //       setScheduleStringArr(getScheduleDataWithMonth(scheudleList));
  //       setTaskStringArr(getTaskDataWithMonth(taskList));
  //     } catch (error) {
  //       console.error(error);
  //       message.error("获取当月数据失败");
  //     }
  //   },
  //   [curMonth]
  // );

  useEffect(() => {
    eventInstance.on(REFRESH_SIDER_CALDENDAR_DATE, refetchSiderData);
    return () => {
      eventInstance.off(REFRESH_SIDER_CALDENDAR_DATE);
    };
  }, [refetchSiderData]);

  const onPanelChange = (value: Dayjs, mode: CalendarMode) => {
    setCurMonth(value.format("YYYY-MM"));
  };

  const DateCellComp = useMemo(() => {
    // eslint-disable-next-line react/display-name
    return (date: Dayjs) => {
      const isCurMonth = date.isSame(curSelectedDate, "month");
      const hasSchedule = siderData?.scheudleStringList.includes(
        date.format("YYYY-MM-DD")
      );
      const hasTask = siderData?.taskStringList.includes(
        date.format("YYYY-MM-DD")
      );

      return (
        <Dropdown
          menu={{
            items: [
              {
                label: "1st menu item",
                key: "1",
              },
            ],
          }}
          trigger={["contextMenu"]}
        >
          <>
            <CellStyleBox
              isCurMonth={isCurMonth}
              isNow={date.isSame(now, "day")}
            >
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
        </Dropdown>
      );
    };
  }, [
    curSelectedDate,
    siderData?.scheudleStringList,
    siderData?.taskStringList,
    now,
    showScheduleDot,
    showTaskDot,
  ]);

  return (
    <>
      <LayoutCalendar>
        <Dropdown
          menu={{
            items: [
              {
                label: (
                  <Button
                    type='link'
                    onClick={() => {
                      handleCreate("schedule");
                    }}
                  >
                    创建日程
                  </Button>
                ),
                key: "0",
              },
              {
                label: (
                  <Button
                    type='link'
                    onClick={() => {
                      handleCreate("task");
                    }}
                  >
                    创建任务
                  </Button>
                ),
                key: "1",
              },
              {
                label: (
                  <Button
                    type='link'
                    onClick={() => {
                      handleCreate("memo");
                    }}
                  >
                    创建备忘录
                  </Button>
                ),
                key: "2",
              },
            ],
          }}
          trigger={["click"]}
        >
          <Button type='primary' style={{ marginTop: 20 }}>
            <Space>
              根据下面选中的日期创建
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

      <Modal
        title={`创建 ${isModalFlag}`}
        open={isModalFlag.length !== 0}
        width={600}
        footer={null}
        destroyOnClose={true}
        onCancel={() => {
          setIsModalFlag("");
        }}
      >
        {isModalFlag === "schedule" ? (
          <ScheduleForm
            uid={uid}
            forceDateString={curSelectedDate}
            callback={() => {
              setIsModalFlag("");
              refetchSiderData();
              eventInstance.emit(REFRESH_SCHEDULE_DATE);
              eventInstance.emit(REFRESH_HOME_PAGE_DATE);
            }}
          />
        ) : isModalFlag === "task" ? (
          <TaskForm
            uid={uid}
            forceDateString={curSelectedDate}
            callback={() => {
              setIsModalFlag("");
              refetchSiderData();
              eventInstance.emit(REFRESH_TASK_DATE);
              eventInstance.emit(REFRESH_HOME_PAGE_DATE);
            }}
          />
        ) : (
          <MemoForm
            uid={uid}
            callback={() => {
              setIsModalFlag("");
              eventInstance.emit(REFRESH_MEMO_DATE);
              eventInstance.emit(REFRESH_HOME_PAGE_DATE);
            }}
          />
        )}
      </Modal>
    </>
  );
};

export default CalendarLayout;
