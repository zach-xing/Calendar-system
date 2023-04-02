import { ICreateSchedule, IModifySchedule, ISchedule } from "@/types";
import { useQuery } from "react-query";
import request from "./http";
import { message } from "antd";

/**
 * 获取Schedule数据
 */
export async function fetchSchedule(id: string, dateString: string) {
  const url =
    dateString.length === 0
      ? `/schedule/${id}`
      : `/schedule/${id}?dateString=${dateString}`;
  const res = await request<{
    total: number;
    list: ISchedule[];
  }>({
    method: "GET",
    url: url,
  });
  return res;
}

/** 获取对应的schedule数据 */
export function useFetchSchedule(uid: string, dateString: string) {
  const { data, refetch, isLoading } = useQuery<{
    total: number;
    list: ISchedule[];
  }>(
    ["fetch-schedule-list", uid, dateString],
    async () => await fetchSchedule(uid, dateString),
    {
      enabled: uid.length !== 0,
      refetchInterval: false,
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: true,
      onError: (err: any) => {
        console.error("in useQuery", err);
        message.error("获取日程失败");
      },
    }
  );

  return {
    scheduleData: data,
    refetchSchedule: refetch,
    isFetchScheduleLoading: isLoading,
  };
}

/** 创建 Schedule */
export async function createSchedule(uid: string, body: ICreateSchedule) {
  return await request({
    method: "POST",
    url: `/schedule`,
    data: {
      ...body,
      uid,
    },
  });
}

/** 修改 Schedule */
export async function modifySchedule(uid: string, body: IModifySchedule) {
  return await request({
    method: "PUT",
    url: `/schedule`,
    data: {
      ...body,
      uid,
    },
  });
}

/** 删除 Schedule */
export async function deleteSchedule(id: string) {
  return await request({
    method: "DELETE",
    url: `/schedule/${id}`,
  });
}
