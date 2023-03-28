import { useQuery } from "react-query";
import { fetchSchedule } from "./schedule";
import { fetchTask } from "./task";
import { ISchedule, ITask } from "../types";
import Toast from "react-native-toast-message";
import request from "./http";
import { useDebounceQuery } from "../hooks/useDebounceQuery";

async function fetchdata(id: string, dateString: string) {
  const res1 = await fetchSchedule(id, dateString);
  const res2 = await fetchTask(id, dateString);
  return { scheduleList: res1.list, taskList: res2.list };
}

/** 获取对应的schedule数据 */
export function useFetchCurDayData(id: string, dateString: string) {
  const { data, refetch, isLoading } = useQuery<{
    scheduleList: ISchedule[];
    taskList: ITask[];
  }>(
    ["fetch-current-day-data", id, dateString],
    async () => await fetchdata(id, dateString),
    {
      enabled: id.length !== 0 && dateString.length !== 0,
      cacheTime: 0,
      refetchInterval: false,
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: true,
      onError: (err: any) => {
        Toast.show({
          type: "error",
          text1: err.message || "获取数据失败",
        });
      },
    }
  );

  return {
    curDayData: data,
    refetch,
    isLoading,
  };
}

async function fetchSearchData(uid: string, title: string) {
  return await request({
    method: "GET",
    url: `/user/search?id=${uid}&title=${title}`,
  });
}

/** 获取搜索后的数据 */
export function useFetchSearchData(uid: string, title: string) {
  const { data, isLoading } = useDebounceQuery(
    ["fetch-search-data", uid, title],
    () => fetchSearchData(uid, title),
    {
      enable: uid.length !== 0 && title.length !== 0,
      cacheTime: 0,
      refetchInterval: false,
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: true,
      onError: (err: any) => {
        Toast.show({
          type: "error",
          text1: err.message || "获取数据失败",
        });
      },
    }
  );

  return {
    searchedData: data as {
      scheduleList: ISchedule[];
      taskList: ITask[];
    },
    isLoading,
  };
}
