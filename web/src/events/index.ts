import EventEmitter from "./event-emitter";

export const eventInstance = new EventEmitter();

/**
 * 刷新首页数据
 */
export const REFRESH_HOME_PAGE_DATE = "Refresh Home-Page Data";

/** 刷新侧边日历组件 */
export const REFRESH_SIDER_CALDENDAR_DATE = "Refresh sider-calendar Data";

/** 刷新 schedule 数据 */
export const REFRESH_SCHEDULE_DATE = "Refresh Schedule Data";

/** 刷新 task 数据 */
export const REFRESH_TASK_DATE = "Refresh task Data";

/** 刷新 memo 数据 */
export const REFRESH_MEMO_DATE = "Refresh memo Data";
