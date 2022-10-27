declare namespace RNType {
  /**
   * 当前设置的 value
   */
  type SettingsType = {
    calendarView: "calendar" | "event";
    remindTime: string;
    alldayRemindTime: string;
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
