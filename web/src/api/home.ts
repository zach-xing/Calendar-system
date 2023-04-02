import { useQuery } from "react-query";
import request from "./http";
import { message } from "antd";
import { fetchSchedule } from "./schedule";
import { fetchTask } from "./task";
import { ISchedule, ITask } from "@/types";
import dayjs from "dayjs";

export interface IFirstScreen {
  afterScheduleSize: number;
  afterTaskSize: number;
  memoSize: number;
}

/** 获取首屏数据 */
export function fetchFirstScreenData(uid: string) {
  return request<IFirstScreen>({
    url: `/user/firstScreen/${uid}`,
    method: "GET",
  });
}

/** 获取首屏数据  with react-query */
export function useFetchFirstScreenData(uid: string) {
  const { data, refetch, isLoading } = useQuery<IFirstScreen>(
    ["fetch-firstScreen-data", uid],
    async () => await fetchFirstScreenData(uid),
    {
      enabled: uid.length !== 0,
      refetchInterval: false,
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: true,
      onError: (err: any) => {
        console.error("in useQuery", err);
        message.error("获取首屏数据失败");
      },
    }
  );

  return {
    firstScreenData: data,
    refetchFirstScreen: refetch,
    isFetchFirstScreenLoading: isLoading,
  };
}



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


async function fetchEventDataWithMonth(uid: string, curMonth: string) {
  const { list: scheudleList } = await fetchSchedule(uid, curMonth);
  const { list: taskList } = await fetchTask(uid, curMonth);
  return {
    scheudleStringList: getScheduleDataWithMonth(scheudleList),
    taskStringList: getTaskDataWithMonth(taskList),
  };
}



/** 获取侧边日历数据  with react-query */
export function useFetchSiderData(uid: string, curMonth: string) {
  const { data, refetch, isLoading } = useQuery<{
    scheudleStringList: string[];
    taskStringList: string[];
  }>(
    ["fetch-sider-calendar-data", uid],
    async () => await fetchEventDataWithMonth(uid, curMonth),
    {
      enabled: uid.length !== 0,
      refetchInterval: false,
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: true,
      onError: (err: any) => {
        console.error("in useQuery", err);
        message.error("获取侧边日历数据失败");
      },
    }
  );

  return {
    siderData: data,
    refetchSiderData: refetch,
  };
}
