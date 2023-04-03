import { RemindEnum } from "@/types";

/**
 * 提醒
 */
export function remindTitle(arg: RemindEnum): string {
  switch (arg) {
    case RemindEnum.FIVE_MIN:
      return "5 分钟前";
    case RemindEnum.TEN_MIN:
      return "10 分钟前";
    case RemindEnum.HALF_HOUR:
      return "30 分钟前";
    case RemindEnum.ONE_HOUR:
      return "1 小时前";
    case RemindEnum.ONT_DAY:
      return "1 天前";
  }
}

/**
 * 优先级
 */
// export function levelTitle(arg: TaskLevelEnum): string {
//   switch (arg) {
//     case TaskLevelEnum.ONE:
//       return "优先级 一";
//     case TaskLevelEnum.TWO:
//       return "优先级 二";
//     case TaskLevelEnum.THREE:
//       return "优先级 三";
//     case TaskLevelEnum.FOUR:
//       return "优先级 四";
//   }
// }
