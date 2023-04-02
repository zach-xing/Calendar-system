import { ICreateSchedule, IModifySchedule, ISchedule } from "@/types";
import request from "./http";

/**
 * 获取Schedule数据
 */
export async function fetchSchedule(id: string, dateString: string) {
  const res = await request<{
    total: number;
    list: ISchedule[];
  }>({
    method: "GET",
    url: `/schedule/${id}?dateString=${dateString}`,
  });
  return res;
}

/** 创建 Schedule */
export async function createSchedule(uid: string, body: ICreateSchedule) {
  return await request({
    method: "POST",
    url: `/schedule`,
    data: {
      ...body,
      uid,
    },
  });
}

/** 修改 Schedule */
export async function modifySchedule(uid: string, body: IModifySchedule) {
  return await request({
    method: "PUT",
    url: `/schedule`,
    data: {
      ...body,
      uid,
    },
  });
}

/** 删除 Schedule */
export async function deleteSchedule(id: string) {
  return await request({
    method: "DELETE",
    url: `/schedule/${id}`,
  });
}
