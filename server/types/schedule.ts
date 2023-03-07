/** 获取 scheduleList 的 args */
export interface IScheduleListArgs {
  uid: string; // user's id
  dateString?: string; // eg: 2023-01-01
}

export interface ISchedule {
  id: string;
  title: string;
  isFullDay: boolean; // 是否全天
  // 若isFullDay为 true，则下面两个字段为相同值
  startTime: string; // '2022-10-09 10:00'
  endTime: string;
  remind: number; // 提前多久提醒
  desc?: string;
}
