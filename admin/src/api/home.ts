import { useQuery } from "react-query";
import request from "./http";
import { message } from "antd";

export function fetchUserIncrement() {
  return request({
    method: "GET",
    url: `/userIncrement`,
  });
}

/** 获取首页数据 */
export function useFetchUserIncrement() {
  const { data, refetch, isLoading } = useQuery<{
    day: number;
    week: number[];
    month: number[];
  }>(["fetch-userIncrement-info"], async () => await fetchUserIncrement(), {
    refetchInterval: false,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: true,
    onError: (err: any) => {
      console.error("in useQuery", err);
      message.error("获取首页数据失败");
    },
  });

  return {
    homeData: data,
    refetchData: refetch,
    isFetchDataLoading: isLoading,
  };
}
