export enum RemindEnum {
  FIVE_MIN,
  TEN_MIN,
  HALF_HOUR,
  ONE_HOUR,
  ONT_DAY,
}

export interface ISchedule {
  id: string;
  title: string;
  isFullDay: boolean; // 是否全天
  // 若isFullDay为 true，则下面两个字段为相同值
  startTime: string; // '2022-10-09 10:00'
  endTime: string;
  remind: RemindEnum; // 提前多久提醒
  desc?: string;
}

export interface ICreateSchedule {
  title: string;
  isFullDay: boolean;
  startTime: string;
  endTime: string;
  remind: number;
  desc: string;
}

export interface IModifySchedule extends ICreateSchedule {
  id: string;
}
