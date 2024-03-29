import { Container } from "./style";
import {
  BookOutlined,
  ClockCircleOutlined,
  ScheduleOutlined,
} from "@ant-design/icons";
import InfoBlock from "./components/InfoBlock";
import ScrollBlock from "@/components/ScrollBlock";
import TaskItem from "@/components/TaskItem";
import ScheduleItem from "@/components/ScheduleItem";
import { useEffect, useState } from "react";
import { useFetchFirstScreenData, useFetchSchedule, useFetchTask } from "@/api";
import { message } from "antd";
import dayjs from "dayjs";
import {
  REFRESH_HOME_PAGE_DATE,
  REFRESH_SCHEDULE_DATE,
  REFRESH_TASK_DATE,
  eventInstance,
} from "@/events";

/**
 * 首页
 */
export default function Home() {
  const nowDayStr = dayjs(Date.now()).format("YYYY-MM-DD");

  /** 请求数据 */
  const [uid, setUid] = useState<string>("");
  const { scheduleData, isFetchScheduleLoading, refetchSchedule } =
    useFetchSchedule(uid, nowDayStr);
  const { taskData, isFetchTaskLoading, refetchTask } = useFetchTask(
    uid,
    nowDayStr
  );
  /** 获取首屏数据 */
  const { firstScreenData, refetchFirstScreen } = useFetchFirstScreenData(uid);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user")!);
    setUid(userData.id);
  }, []);

  useEffect(() => {
    eventInstance.on(REFRESH_HOME_PAGE_DATE, refetchFirstScreen);
    eventInstance.on(REFRESH_SCHEDULE_DATE, refetchSchedule);
    eventInstance.on(REFRESH_TASK_DATE, refetchTask);
    return () => {
      eventInstance.off(REFRESH_HOME_PAGE_DATE);
      eventInstance.off(REFRESH_SCHEDULE_DATE);
      eventInstance.off(REFRESH_TASK_DATE);
    };
  }, [refetchFirstScreen, refetchSchedule, refetchTask]);

  return (
    <Container>
      <h1>首页</h1>

      <div style={{ display: "flex", marginBottom: 25 }}>
        <InfoBlock
          icon={<ScheduleOutlined />}
          value={firstScreenData?.afterScheduleSize || 0}
          text={"待开始的日程"}
          bgColor='#e7582b'
          toPath='/schedule?showAfter=true'
        />
        <InfoBlock
          icon={<ClockCircleOutlined />}
          value={firstScreenData?.afterTaskSize || 0}
          text={"待完成的任务"}
          bgColor='#582be7'
          toPath='/task?showNoDone=true'
        />
        <InfoBlock
          icon={<BookOutlined />}
          value={firstScreenData?.memoSize || 0}
          text={"备忘录"}
          bgColor='#242424'
          toPath='/memo'
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          columnGap: 20,
        }}
      >
        <div>
          <h3>{"Today's Schedule"}</h3>
          <ScrollBlock height={"calc(100vh - 300px)"}>
            {isFetchScheduleLoading ? (
              <div style={{ padding: 20 }}>Loading...</div>
            ) : (
              <>
                {scheduleData?.list.length === 0 ? (
                  <div style={{ padding: 20, textAlign: "center" }}>空</div>
                ) : (
                  scheduleData?.list.map((item) => (
                    <ScheduleItem
                      key={item.id}
                      data={item}
                      operateCallback={refetchSchedule}
                    />
                  ))
                )}
              </>
            )}
          </ScrollBlock>
        </div>
        <div>
          <h3>{"Today's Task"}</h3>
          <ScrollBlock height={"calc(100vh - 300px)"}>
            {isFetchTaskLoading ? (
              <div style={{ padding: 20 }}>Loading...</div>
            ) : (
              <>
                {taskData?.list.length === 0 ? (
                  <div style={{ padding: 20, textAlign: "center" }}>空</div>
                ) : (
                  taskData?.list.map((item) => (
                    <TaskItem
                      key={item.id}
                      data={item}
                      operateCallback={refetchTask}
                    />
                  ))
                )}
              </>
            )}
          </ScrollBlock>
        </div>
      </div>
    </Container>
  );
}
