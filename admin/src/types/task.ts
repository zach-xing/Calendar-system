export enum TaskLevelEnum {
  ONE = 1,
  TWO,
  THREE,
  FOUR,
}

/**
 * Task 类型
 */
export interface ITask {
  id: string;
  title: string;
  level: TaskLevelEnum;
  isDone: boolean; // 是否完成
  time: string;
  desc: string;
}
