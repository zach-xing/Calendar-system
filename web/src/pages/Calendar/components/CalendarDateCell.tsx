import { Badge, Popover } from 'antd';
import React from 'react'
import styles from "../index.module.scss";

/**
 * 渲染日历组件的单元格
 */
export default function CalendarDateCell() {
  return (
    <ul className={styles.cellulStyle}>
      <li className={styles.cellLiItem}>
        <Badge color="green" text="123" />
      </li>
      <li className={styles.cellLiItem}>
        <Badge color="blue" text="123" />
      </li>
      <li className={styles.cellLiItem}>
        <Popover
          trigger="click"
          content={
            <div>
              <p>Content</p>
              <p>Content</p>
            </div>
          }
          title="事件列表"
        >
          <Badge color="yellow" text="more" />
        </Popover>
      </li>
    </ul>
  );
}
