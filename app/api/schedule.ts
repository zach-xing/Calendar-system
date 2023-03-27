import Toast from "react-native-toast-message";
import { useQuery } from "react-query";
import { ICreateSchedule, IModifySchedule, ISchedule } from "../types";
import storage from "../utils/storage";
import request from "./http";

export async function fetchSchedule(id: string, dateString: string) {
  const res = await request<{
    total: number;
    list: ISchedule[];
  }>({
    method: "GET",
    url: `/schedule/${id}?dateString=${dateString}`,
  });
  return res;
}

/** 获取对应的schedule数据 */
export function useFetchSchedule(id: string, dateString: string) {
  const { data, refetch, isLoading } = useQuery<{
    total: number;
    list: ISchedule[];
  }>(
    ["fetch-schedule-list", id, dateString],
    async () => await fetchSchedule(id, dateString),
    {
      enabled: id.length !== 0 && dateString.length !== 0,
      refetchInterval: false,
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: true,
      onError: (err: any) => {
        Toast.show({
          type: "error",
          text1: err.message || "获取日程失败",
        });
      },
    }
  );

  return {
    scheduleData: data,
    refetch,
    isLoading,
  };
}

/** 创建 Schedule */
export async function createSchedule(body: ICreateSchedule) {
  const userData = await storage.load({
    key: "user",
  });
  return await request({
    method: "POST",
    url: `/schedule`,
    data: {
      ...body,
      uid: "" + userData.id,
    },
  });
}

/** 修改 Schedule */
export async function modifySchedule(body: IModifySchedule) {
  const userData = await storage.load({
    key: "user",
  });
  return await request({
    method: "PUT",
    url: `/schedule`,
    data: {
      ...body,
      uid: "" + userData.id,
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
