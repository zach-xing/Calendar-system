import { IMemo, IUser } from "@/types";
import { useQuery } from "react-query";
import request from "./http";
import { message } from "antd";

function fetchMemo(account: string) {
  return request({
    method: "GET",
    url: `/memo?account=${account}`,
  });
}

/** 获取 备忘录 数据 with react-query */
export function useFetchMemo(account: string) {
  const { data, refetch, isLoading } = useQuery<{
    userData: { name: string; account: string };
    list: IMemo[];
  }>(["fetch-memo-list", account], async () => await fetchMemo(account), {
    enabled: account.length !== 0,
    refetchInterval: false,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: true,
    onError: (err: any) => {
      console.error("in useQuery", err);
      message.error("获取备忘录数据失败或没有此账号");
    },
  });

  return {
    memoData: data,
    refetchMemo: refetch,
    isFetchMemoLoading: isLoading,
  };
}
