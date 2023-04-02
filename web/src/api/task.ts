import { ICreateTask, IModifyTask, ITask } from "@/types";
import request from "./http";

/**
 * 获取 task 数据
 */
export async function fetchTask(id: string, dateString: string) {
  const res = await request<{
    total: number;
    list: ITask[];
  }>({
    method: "GET",
    url: `/task/${id}?dateString=${dateString}`,
  });
  return res;
}

/** 创建 Task */
export async function createTask(uid: string, body: ICreateTask) {
  return await request({
    method: "POST",
    url: `/task`,
    data: {
      ...body,
      uid,
    },
  });
}

/** 修改 Task */
export async function modifyTask(uid: string, body: IModifyTask) {
  return await request({
    method: "PUT",
    url: `/task`,
    data: {
      ...body,
      uid,
    },
  });
}

/** 删除 Task */
export async function deleteTask(id: string) {
  return await request({
    method: "DELETE",
    url: `/task/${id}`,
  });
}

/** 更改 task 的状态 */
export async function modifyTaskState(id: string, isDone: boolean) {
  return await request({
    method: "POST",
    url: "/task/modifyState",
    data: {
      id: id,
      isDone,
    },
  });
}
