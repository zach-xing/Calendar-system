import { ITask, IUser } from "@/types";
import { useQuery } from "react-query";
import request from "./http";
import { message } from "antd";

function fetchTask(account: string) {
  return request({
    method: "GET",
    url: `/task?account=${account}`,
  });
}

/** 获取 日程 数据 with react-query */
export function useFetchTask(account: string) {
  const { data, refetch, isLoading } = useQuery<{
    userData: { name: string; account: string };
    list: ITask[];
  }>(["fetch-task-list", account], async () => await fetchTask(account), {
    enabled: account.length !== 0,
    refetchInterval: false,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: true,
    onError: (err: any) => {
      console.error("in useQuery", err);
      message.error("获取任务数据失败");
    },
  });

  return {
    taskData: data,
    refetchTask: refetch,
    isFetchTaskLoading: isLoading,
  };
}
