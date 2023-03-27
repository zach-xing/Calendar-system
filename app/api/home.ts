import { useQuery } from "react-query";
import { fetchSchedule } from "./schedule";
import { fetchTask } from "./task";
import { ISchedule, ITask } from "../types";
import Toast from "react-native-toast-message";

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
