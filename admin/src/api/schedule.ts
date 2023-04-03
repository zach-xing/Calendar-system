import { ISchedule, IUser } from "@/types";
import { useQuery } from "react-query";
import request from "./http";
import { message } from "antd";

function fetchSchedule(account: string) {
  return request({
    method: "GET",
    url: `/schedule?account=${account}`,
  });
}

/** 获取 日程 数据 with react-query */
export function useFetchSchedule(account: string) {
  const { data, refetch, isLoading } = useQuery<ISchedule[]>(
    ["fetch-schedule-list", account],
    async () => await fetchSchedule(account),
    {
      enabled: account.length !== 0,
      refetchInterval: false,
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: true,
      onError: (err: any) => {
        console.error("in useQuery", err);
        message.error("获取日程数据失败");
      },
    }
  );

  return {
    scheduleData: data,
    refetchSchedule: refetch,
    isFetchScheduleLoading: isLoading,
  };
}
