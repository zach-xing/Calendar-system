import * as Notifications from "expo-notifications";
import type { NotificationTriggerInput } from "expo-notifications";
import dayjs from "dayjs";
import { ISchedule, RemindEnum } from "../types";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

/**
 * 发送通知
 */
export async function schedulePushNotification(
  identifier: string,
  opt: {
    title: string;
    body: string;
    trigger: NotificationTriggerInput;
  }
) {
  await Notifications.scheduleNotificationAsync({
    identifier,
    content: {
      title: opt.title,
      body: opt.body,
    },
    trigger: opt.trigger,
  });
}

/**
 * 注册通知到本地
 */
export async function registerSCheduleRemind(uid: string, list: ISchedule[]) {
  Notifications.cancelScheduledNotificationAsync(uid);

  for (const item of list) {
    const noticeTime = getNoticeTime(item);
    await schedulePushNotification(uid, {
      title: `${item.title}`,
      body: `${dayjs(item.startTime).format("YYYY-MM-DD HH:mm")} - ${dayjs(
        item.endTime
      ).format("YYYY-MM-DD HH:mm")}`,
      trigger: new Date(noticeTime).getTime(),
    });
  }
}

function getNoticeTime(val: ISchedule) {
  let newVal = dayjs(val.startTime);
  switch (val.remind) {
    case RemindEnum.FIVE_MIN:
      newVal = newVal.subtract(5, "minute");
      break;
    case RemindEnum.TEN_MIN:
      newVal = newVal.subtract(10, "minute");
      break;
    case RemindEnum.HALF_HOUR:
      newVal = newVal.subtract(30, "minute");
      break;
    case RemindEnum.ONE_HOUR:
      newVal = newVal.subtract(60, "minute");
      break;
    case RemindEnum.ONT_DAY:
      newVal = newVal.subtract(1, "day");
      break;
  }
  return newVal.format("YYYY-MM-DD HH:mm");
}
