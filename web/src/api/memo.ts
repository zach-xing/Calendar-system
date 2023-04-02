import { useQuery } from "react-query";
import { ICreateMemo, IMemo, IModifyMemo } from "../types";
import request from "./http";
import { message } from "antd";

/** 获取 memo 数据
 */
export async function fetchMemo(id: string) {
  const res = await request({
    method: "GET",
    url: `/memo/${id}`,
  });
  return res;
}

/** 获取 memo 数据 with react-query */
export function useFetchMemo(uid: string) {
  const { data, refetch, isLoading } = useQuery<IMemo[]>(
    ["fetch-memo-list", uid],
    async () => await fetchMemo(uid),
    {
      enabled: uid.length !== 0,
      refetchInterval: false,
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: true,
      onError: (err: any) => {
        console.error("in useQuery", err);
        message.error("获取备忘录失败");
      },
    }
  );

  return {
    memoList: data,
    refetch,
    isFetchMemoLoading: isLoading,
  };
}

/** 创建 Memo */
export async function createMemo(uid: string, body: ICreateMemo) {
  return await request({
    method: "POST",
    url: `/memo`,
    data: {
      ...body,
      uid,
    },
  });
}

/** 修改 Memo */
export async function modifyMemo(uid: string, body: IModifyMemo) {
  return await request({
    method: "PUT",
    url: `/memo`,
    data: {
      ...body,
      uid,
    },
  });
}

/** 删除 Memo */
export async function deleteMemo(id: string) {
  return await request({
    method: "DELETE",
    url: `/memo/${id}`,
  });
}
