import Toast from "react-native-toast-message";
import { useQuery } from "react-query";
import { ICreateSchedule, IModifySchedule, ISchedule } from "../types";
import storage from "../utils/storage";
import request from "./http";


export async function fetchSchedule(dateString: string) {
  const userData = await storage.load({
    key: "user",
  });
  const data = await request({
    method: "GET",
    url: `/schedule/${userData.id}?dataString=${dateString}`,
  });
  return data;
}
/** 获取对应的schedule数据 */
export function useFetchSchedule(dateString: string) {
  const { data, refetch, isLoading } = useQuery<Array<ISchedule>>(
    "fetchCollaboratorDocument",
    () => fetchSchedule(dateString),
    {
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
    cdocumentData: data,
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
    url: `/schedule/${userData.id}`,
    data: body,
  });
}

/** 修改 Schedule */
export async function modifySchedule(body: IModifySchedule) {
  const userData = await storage.load({
    key: "user",
  });
  return await request({
    method: "PUT",
    url: `/schedule/${userData.id}`,
    data: body,
  });
}

/** 删除 Schedule */
export async function deleteSchedule(id: string) {
  return await request({
    method: "DELETE",
    url: `/schedule/${id}`,
  });
}
