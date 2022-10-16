import EventEmitter from "../utils/event-emitter";

export const event = new EventEmitter();

// 在“设置”页面中更改视图，更改真正更改视图的界面
export const CHANGE_VIEW = "change-view";
