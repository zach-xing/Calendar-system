import { IUser } from "@/types";
import { useQuery } from "react-query";
import request from "./http";
import { message } from "antd";

function fetchAllUser() {
  return request({
    method: "GET",
    url: "/users",
  });
}

/** 获取 全部用户 数据 with react-query */
export function useFetchUsers() {
  const { data, refetch, isLoading } = useQuery<{
    total: number;
    list: IUser[];
  }>(["fetch-user-list"], async () => await fetchAllUser(), {
    refetchInterval: false,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: true,
    onError: (err: any) => {
      console.error("in useQuery", err);
      message.error("获取用户数据失败");
    },
  });

  return {
    usersData: data,
    refetchUsers: refetch,
    isFetchUsersLoading: isLoading,
  };
}
