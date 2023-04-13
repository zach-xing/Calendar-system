import EventEmitter from "./event-emitter";

export const event = new EventEmitter();

/** 刷新 task 的页面 */
export const REFRESH_TASK_PAGE = "refresh_task_page";

/** 刷新首页 */
export const REFRESH_HOME_PAGE = "refresh_home_page";
