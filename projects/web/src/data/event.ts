import requset from "../utils/request";

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
export function createSchedule(userId: string, data: any) {
  return requset({
    url: `/events/create/schedule/${userId}`,
    method: "POST",
    data,
  });
}

/**
 * 编辑 schedule
 */
export function updateSchedule(userId: string, data: any) {
  return requset({
    url: `/events/update/schedule/${userId}`,
    method: "POST",
    data: data,
  });
}

/**
 * 创建 Task
 */
export function createTask(userId: string, data: any) {
  return requset({
    url: `/events/create/task/${userId}`,
    method: "POST",
    data: data,
  });
}

/**
 * 编辑 Task
 */
export function updateTask(userId: string, data: any) {
  return requset({
    url: `/events/update/task/${userId}`,
    method: "POST",
    data: data,
  });
}

/**
 * 删除 事件
 */
export function removeEvent(
  userId: string,
  monthString: string,
  eventId: string
) {
  return requset({
    url: `/events/remove?userId=${userId}&monthString=${monthString}&eventId=${eventId}`,
    method: "DELETE",
  });
}
