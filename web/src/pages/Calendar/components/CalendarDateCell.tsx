import {
  Badge,
  Button,
  Descriptions,
  message,
  Modal,
  Popover,
  Space,
} from "antd";
import React from "react";
import { remindArr, repeatArr } from "../../../constant";
import { removeEvent } from "../../../data/event";
import { event, REFRESH_DATA } from "../../../events";
import styles from "../index.module.scss";

interface IProps {
  list: Array<DataType.ImportantDayType | DataType.ScheduleType>;
  setCurOpenEditEventModal: React.Dispatch<
    React.SetStateAction<"" | "schedule" | "importantDay">
  >;
  setCurEditEvent: React.Dispatch<React.SetStateAction<any>>;
}

/**
 * 渲染日历组件的单元格
 */
export default function CalendarDateCell(props: IProps) {
  const { list, setCurOpenEditEventModal, setCurEditEvent } = props;
  const [curData, setCurData] = React.useState<any>();

  // 点击编辑按钮
  const handleEdit = (category: "schedule" | "importantDay") => {
    setCurOpenEditEventModal(category);
    setCurEditEvent(curData);
    setCurData(undefined);
  };

  const handleRemove = async (eventId: string, monthString: string) => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      await removeEvent(user.id, monthString.slice(0, 7), eventId);
      event.emit(REFRESH_DATA, undefined);
      message.success("删除成功");
    } catch (error: any) {
      message.error(error?.message || "删除失败");
    }
  };

  return (
    <>
      <ul className={styles.cellulStyle}>
        {list.length > 3 ? (
          <>
            {[0, 1].map((idx) => (
              <li
                key={idx}
                className={styles.cellLiItem}
                onClick={() => setCurData(list[idx])}
              >
                <Badge
                  color={list[idx].category === "schedule" ? "blue" : "green"}
                  text={list[idx].title}
                />
              </li>
            ))}
            <li className={styles.cellLiItem}>
              <Popover
                trigger="click"
                content={
                  <div>
                    <p>222</p>
                    <p>Content</p>
                  </div>
                }
                title="事件列表"
              >
                <Badge color="yellow" text="more" />
              </Popover>
            </li>
          </>
        ) : (
          list.map((item) => (
            <li
              key={item.id}
              className={styles.cellLiItem}
              onClick={() => setCurData(item)}
            >
              <Badge
                color={item.category === "schedule" ? "blue" : "green"}
                text={item.title}
              />
            </li>
          ))
        )}
      </ul>

      <Modal
        open={curData !== undefined}
        onCancel={() => setCurData(undefined)}
        width={1000}
        footer={null}
      >
        <Descriptions title="查看" bordered column={{ xs: 2, sm: 2, md: 2 }}>
          <Descriptions.Item label="标题">{curData?.title}</Descriptions.Item>
          <Descriptions.Item label="日期">
            {curData?.category === "schedule"
              ? curData.isFullDay
                ? curData.dateString
                : `${curData.startTime}-${curData.endTime}`
              : curData?.dateString}
          </Descriptions.Item>
          <Descriptions.Item label="提醒">
            {remindArr[curData?.remind || 0].value}
          </Descriptions.Item>
          {curData?.repeat !== undefined && (
            <Descriptions.Item label="重复">
              {repeatArr[curData?.repeat || 0].value}
            </Descriptions.Item>
          )}
          <Descriptions.Item label="描述">{curData?.desc}</Descriptions.Item>
        </Descriptions>
        <Space style={{ marginTop: 20 }}>
          <Button
            type="primary"
            size="large"
            onClick={() => handleEdit(curData?.category)}
          >
            编辑
          </Button>
          <Button
            danger
            size="large"
            onClick={() => handleRemove(curData?.id, curData?.dateString)}
          >
            删除
          </Button>
        </Space>
      </Modal>
    </>
  );
}
