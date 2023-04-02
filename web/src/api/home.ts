import request from "./http";

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
