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
    category: "schedule"; // schedule
    title: string; // 标题
    isFullDay: boolean; // 是否全天
    startTime: string; // eg： '2022-10-09 10:00'
    endTime: string; // eg： '2022-10-09 15:00'
    repeat: number; // 重复提醒，eg：不重复
    remind: Array<string>; // 提醒
    desc?: string;
  };

  type ImportantDayType = {
    category: "importantDay"; // importantDay
    title: string;
    startTime: string;
    repeat: number; // 重复提醒，eg：不重复
    remind: Array<string>; // 提醒
    desc?: string;
  };
}
