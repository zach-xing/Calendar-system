declare namespace RNType {
  /**
   * 当前设置的 value
   */
  type SettingsType = {
    calendarView: "calendar" | "event";
    remind: number;
    repeat: number;
  };

  /**
   * 日程 type
   */
  type ScheduleType = {
    id: string;
    category: string;
    title: string;
    isFullDay: boolean;
    dateString: string;
    startTime: string;
    endTime: string;
    remind: number;
    desc?: string;
  };

  type ImportantDayType = {
    id: string;
    category: string;
    title: string;
    dateString: string;
    remind: number;
    repeat: number;
    desc?: string;
  };

  /**
   * 用户信息
   */
  type User = {
    id: string;
    name: string;
    account: string;
    token: string;
  };
}
