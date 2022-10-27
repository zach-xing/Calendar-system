import requset from "../utils/axios";

/**
 * 获取 事件列表
 */
export function fetchEventList(dateString: string, userId: string) {
  return requset({
    url: `/events?dateString=${dateString}&userId=${userId}`,
    method: "GET",
  });
}

/**
 * 创建 schedule
 */
export function createSchedule(
  userId: string,
  data: Omit<RNType.ScheduleType, "id">
) {
  return requset({
    url: `/events/create/schedule/${userId}`,
    method: "POST",
    data,
  });
}

/**
 * 编辑 schedule
 */
export function updateSchedule(userId: string, data: RNType.ScheduleType) {
  return requset({
    url: `/events/update/schedule/${userId}`,
    method: "POST",
    data: data,
  });
}

/**
 * 创建 importantDay
 */
export function createImportantDay(
  userId: string,
  data: Omit<RNType.ImportantDayType, "id">
) {
  return requset({
    url: `/events/create/importantDay/${userId}`,
    method: "POST",
    data: data,
  });
}

/**
 * 编辑 importantDay
 */
export function updateImportantDay(
  userId: string,
  data: RNType.ImportantDayType
) {
  return requset({
    url: `/events/update/importantDay/${userId}`,
    method: "POST",
    data: data,
  });
}
