import EventEmitter from "../utils/event-emitter";

export const event = new EventEmitter();

/**
 * 当改变当前的月份的时候
 * （用于卡片形式的日历改变值的时候，全屏日历改变视图）
 */
export const CHANGE_CUR_MONTH = "change-cur-month";

export const REFRESH_DATA = "refresh-data";
