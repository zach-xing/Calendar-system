import * as Notifications from "expo-notifications";
import type { NotificationTriggerInput } from "expo-notifications";
import dayjs from "dayjs";
import { ISchedule } from "../types";

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
    const noticeTime = dayjs(item.startTime).format("YYYY-MM-DD HH:mm");
    await schedulePushNotification(uid, {
      title: `${item.title}`,
      body: `${dayjs(item.startTime).format("YYYY-MM-DD HH:mm")} - ${dayjs(
        item.endTime
      ).format("YYYY-MM-DD HH:mm")}`,
      trigger: new Date(noticeTime).getTime(),
    });
  }
}
