import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isSameOrAfter);
dayjs.extend(isBetween);

/**
 * 判断是否是当天
 */
export function isDateToday(time: string) {
  return dayjs(time).isSameOrAfter(dayjs(), "day");
}

/**
 * 判断 curr 是否存在 start 和 end 之间
 */
export function isBetweenWithDay(start: string, end: string, curr: string) {
  return dayjs(curr).isBetween(start, end, "day", "[]");
}