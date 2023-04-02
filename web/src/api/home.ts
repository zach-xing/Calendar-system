import { useQuery } from "react-query";
import request from "./http";
import { message } from "antd";

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