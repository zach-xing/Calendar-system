import dayjs from "dayjs";
import uuid from "react-native-uuid";

/**
 * 处理两个日期之间的间隔
 * startTime 和 endTime 就比如: "2022-10-22 10:00")
 */
export function handleDateGap(data: RNType.ScheduleType, id: string) {
  if (data.isFullDay) {
    return [data];
  }
  const startDateString = data.startTime.slice(0, 10);
  const endDateString = data.endTime.slice(0, 10);
  if (startDateString === endDateString) {
    return [data];
  } else {
    const arr = [data];
    let start = dayjs(startDateString).add(1, "day");
    for (; start.isBefore(endDateString); start = start.add(1, "day")) {
      arr.push({
        ...data,
        id: id,
        isFullDay: true,
        dateString: start.format("YYYY-MM-DD"),
      });
    }
    arr.push({
      ...data,
      id: id,
      isFullDay: false,
      dateString: start.format("YYYY-MM-DD"),
    });
    return arr;
  }
}

/**
 * 排序事件
 */
export function sortEvent(arr) {
  const arr1 = [];
  const arr2 = [];
  arr.map((item) => {
    item.category === "schedule" ? arr1.push(item) : arr2.push(item);
  });
  arr1.sort((a, b) => {
    return new Date(a.startTime).getTime() - new Date(b.startTime).getTime();
  });
  return arr2.concat(arr1);
}

/**
 * 删除 arr 中指定 id 的事件
 */
export function removeEventById(id: string, arr: Array<any>) {
  return arr.filter((el) => el.id !== id);
}
