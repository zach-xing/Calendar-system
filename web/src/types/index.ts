// 秒数（0就是不提醒）
// 5分钟、半小时、一小时、三小时、一天、不提前
export type RemindType = 300 | 1800 | 3600 | 10800 | 86400 | 0;
export const RemindKeys = [
  "五分钟",
  "半小时",
  "一小时",
  "三小时",
  "一天",
  "不提前",
];
export const remindArr: Record<string, number> = {
  不提前: 0,
  五分钟: 300,
  半小时: 1800,
  一小时: 3600,
  三小时: 10800,
  一天: 86400,
};

/**
 * Schedule 类型
 */
export interface ISchedule {
  id: string;
  title: string;
  isFullDay: boolean; // 是否全天
  // 若isFullDay为 true，则下面两个字段为相同值
  startTime: string; // '2022-10-09 10:00'
  endTime: string;
  remind: RemindType[]; // 提前多久提醒
  desc?: string;
}

/**
 * Task 类型
 */
export interface ITask {
  id: string;
  title: string;
  isDone: boolean; // 是否完成
  time: string;
  desc?: string;
}