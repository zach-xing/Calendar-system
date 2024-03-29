import { ICreateTask, IModifyTask, ITask } from "@/types";
import request from "./http";
import { useQuery } from "react-query";
import { message } from "antd";

/**
 * 获取 task 数据
 */
export async function fetchTask(id: string, dateString: string) {
  const url =
    dateString.length === 0
      ? `/task/${id}`
      : `/task/${id}?dateString=${dateString}`;
  const res = await request<{
    total: number;
    list: ITask[];
  }>({
    method: "GET",
    url: url,
  });
  return res;
}

/** 获取 task 数据 with react-query */
export function useFetchTask(uid: string, dateString: string) {
  const { data, refetch, isLoading } = useQuery<{
    total: number;
    list: ITask[];
  }>(
    ["fetch-task-list", uid, dateString],
    async () => await fetchTask(uid, dateString),
    {
      enabled: uid.length !== 0,
      refetchInterval: false,
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: true,
      onError: (err: any) => {
        console.error("in useQuery", err);
        message.error("获取任务失败");
      },
    }
  );

  return {
    taskData: data,
    refetchTask: refetch,
    isFetchTaskLoading: isLoading,
  };
}

/** 创建 Task */
export async function createTask(uid: string, body: ICreateTask) {
  return await request({
    method: "POST",
    url: `/task`,
    data: {
      ...body,
      uid,
    },
  });
}

/** 修改 Task */
export async function modifyTask(uid: string, body: IModifyTask) {
  return await request({
    method: "PUT",
    url: `/task`,
    data: {
      ...body,
      uid,
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

/** 更改 task 的状态 */
export async function modifyTaskState(id: string, isDone: boolean) {
  return await request({
    method: "POST",
    url: "/task/modifyState",
    data: {
      id: id,
      isDone,
    },
  });
}
