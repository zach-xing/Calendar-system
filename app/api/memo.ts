import Toast from "react-native-toast-message";
import { useQuery } from "react-query";
import { ICreateMemo, IModifyMemo, IMemo } from "../types";
import storage from "../utils/storage";
import request from "./http";

export async function fetchMemo(id: string) {
  const res = await request({
    method: "GET",
    url: `/memo/${id}`,
  });
  return res;
}

/** 获取对应的memo数据 */
export function useFetchMemo(id: string) {
  const { data, refetch, isLoading } = useQuery<IMemo[]>(
    ["fetch-memo-list", id],
    async () => await fetchMemo(id),
    {
      enabled: id.length !== 0,
      refetchInterval: false,
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: true,
      onError: (err: any) => {
        Toast.show({
          type: "error",
          text1: err.message || "获取备忘录失败",
        });
      },
    }
  );

  return {
    memoList: data,
    refetch,
    isLoading,
  };
}

/** 创建 Memo */
export async function createMemo(body: ICreateMemo) {
  const userData = await storage.load({
    key: "user",
  });
  return await request({
    method: "POST",
    url: `/memo`,
    data: {
      ...body,
      uid: "" + userData.id,
    },
  });
}

/** 修改 Memo */
export async function modifyMemo(body: IModifyMemo) {
  const userData = await storage.load({
    key: "user",
  });
  return await request({
    method: "PUT",
    url: `/memo`,
    data: {
      ...body,
      uid: "" + userData.id,
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
