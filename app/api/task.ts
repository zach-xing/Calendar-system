import Toast from "react-native-toast-message";
import { useQuery } from "react-query";
import request from "./http";
import { ICreateTask, IModifyTask, ITask } from "../types/task";
import storage from "../utils/storage";

export async function fetchTask(id: string, dateString: string) {
  const res = await request<{
    total: number;
    list: ITask[];
  }>({
    method: "GET",
    url: `/task/${id}?dataString=${dateString}`,
  });
  return res;
}
/** 获取 task 数据 */
export function useFetchTask(id: string, dateString: string) {
  const { data, refetch, isLoading } = useQuery<{
    total: number;
    list: ITask[];
  }>(
    ["fetch-task-list", id, dateString],
    async () => await fetchTask(id, dateString),
    {
      enabled: id.length !== 0 && dateString.length !== 0,
      refetchInterval: false,
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: true,
      onError: (err: any) => {
        Toast.show({
          type: "error",
          text1: err.message || "获取 Task 失败",
        });
      },
    }
  );

  return {
    taskData: data,
    refetch,
    isLoading,
  };
}

/** 创建 Task */
export async function createTask(body: ICreateTask) {
  const userData = await storage.load({
    key: "user",
  });
  return await request({
    method: "POST",
    url: `/task`,
    data: {
      ...body,
      uid: "" + userData.id,
    },
  });
}

/** 修改 Task */
export async function modifyTask(body: IModifyTask) {
  const userData = await storage.load({
    key: "user",
  });
  return await request({
    method: "PUT",
    url: `/task`,
    data: {
      ...body,
      uid: "" + userData.id,
    },
  });
}

/** 删除 Task */
export async function deleteTask(id: string) {
  return await request({
    method: "DELETE",
    url: `/task/${id}`,
  });
}
