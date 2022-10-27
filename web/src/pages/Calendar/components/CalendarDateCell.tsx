import { Badge, Button, Descriptions, Modal, Popover } from "antd";
import React from "react";
import { remindArr, repeatArr } from "../../../constant";
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
        <Button
          style={{ marginTop: 20 }}
          type="primary"
          size="large"
          onClick={() => handleEdit(curData?.category)}
        >
          编辑
        </Button>
      </Modal>
    </>
  );
}
