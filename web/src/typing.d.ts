declare namespace DataType {
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
}
