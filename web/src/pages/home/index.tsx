import { useRouter } from "next/router";
import { Container } from "./style";
import {
  BookOutlined,
  ClockCircleOutlined,
  ScheduleOutlined,
} from "@ant-design/icons";
import InfoBlock from "./components/InfoBlock";
import ScrollBlock from "@/components/ScrollBlock";
import { ISchedule, ITask } from "@/types";
import TaskItem from "@/components/TaskItem";
import ScheduleItem from "@/components/ScheduleItem";
import { useCallback, useEffect, useState } from "react";
import { IFirstScreen, fetchFirstScreenData } from "@/api";
import { message } from "antd";

/**
 * 首页
 */
export default function Home() {
  const router = useRouter();

  const [firstScreenData, setFirstScreenData] = useState<IFirstScreen>();

  /** 获取首屏数据 */
  const getFirstScreenData = useCallback(async (uid: string) => {
    try {
      const res = await fetchFirstScreenData(uid);
      setFirstScreenData(res);
    } catch (error) {
      console.error(error);
      message.error("获取首屏数据失败");
    }
  }, []);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user")!);
    getFirstScreenData(userData.id);
  }, [getFirstScreenData]);

  return (
    <Container>
      <h1>首页</h1>

      <div style={{ display: "flex", marginBottom: 25 }}>
        <InfoBlock
          icon={<ScheduleOutlined />}
          value={firstScreenData?.afterScheduleSize || 0}
          text={"待开始的日程"}
          bgColor='#e7582b'
          onClick={() => {
            console.log("sdfsdf");
          }}
        />
        <InfoBlock
          icon={<ClockCircleOutlined />}
          value={firstScreenData?.afterTaskSize || 0}
          text={"待完成的任务"}
          bgColor='#582be7'
          onClick={() => {
            console.log("sdfsdf");
          }}
        />
        <InfoBlock
          icon={<BookOutlined />}
          value={firstScreenData?.memoSize || 0}
          text={"备忘录"}
          bgColor='#242424'
          onClick={() => {
            console.log("sdfsdf");
          }}
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
            {dataArr1.map((item) => (
              <ScheduleItem key={item.id} data={item} />
            ))}
          </ScrollBlock>
        </div>
        <div>
          <h3>{"Today's Task"}</h3>
          <ScrollBlock height={"calc(100vh - 300px)"}>
            {dataArr.map((item) => (
              <TaskItem key={item.id} data={item} />
            ))}
          </ScrollBlock>
        </div>
      </div>
    </Container>
  );
}

const dataArr: ITask[] = [
  {
    id: "1",
    title: "text",
    level: 2,
    isDone: false,
    time: "2023-04-01",
    desc: "",
  },
  {
    id: "2",
    title: "text111111",
    level: 2,
    isDone: true,
    time: "2023-04-02",
    desc: "",
  },
];

const dataArr1: ISchedule[] = [
  {
    id: "1",
    title: "text111111",
    isFullDay: false,
    startTime: "2023-04-01 12:00",
    endTime: "2023-04-01: 13:00",
    remind: 0,
    desc: "",
  },
];
