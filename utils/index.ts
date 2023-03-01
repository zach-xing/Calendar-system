import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

dayjs.extend(isSameOrAfter);

/**
 * 判断是否是当天
 */
export function isDateToday(time: string) {
  return dayjs(time).isSameOrAfter(dayjs(), "day");
}
