import { ICreateMemo, IModifyMemo } from "../types";
import request from "./http";

/** 获取 memo 数据
 */
export async function fetchMemo(id: string) {
  const res = await request({
    method: "GET",
    url: `/memo/${id}`,
  });
  return res;
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
