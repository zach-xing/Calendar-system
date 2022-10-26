import { Badge, Button, Descriptions, Modal, Popover } from "antd";
import React from "react";
import styles from "../index.module.scss";

interface IProps {
  setCurOpenEditEventModal: React.Dispatch<
    React.SetStateAction<"" | "schedule" | "importantDay">
  >;
}

/**
 * 渲染日历组件的单元格
 */
export default function CalendarDateCell(props: IProps) {
  const { setCurOpenEditEventModal } = props;
  const [isOpenModal, setIsOpenModal] = React.useState(false);

  const handleEdit = () => {
    setCurOpenEditEventModal("schedule");
    setIsOpenModal(false);
  };

  return (
    <>
      <ul className={styles.cellulStyle}>
        <li className={styles.cellLiItem} onClick={() => setIsOpenModal(true)}>
          <Badge color="blue" text="123" />
        </li>
        <li className={styles.cellLiItem}>
          <Badge color="green" text="123" />
        </li>
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
      </ul>

      <Modal
        open={isOpenModal}
        onCancel={() => setIsOpenModal(false)}
        width={1000}
        footer={null}
      >
        <Descriptions title="查看" bordered column={{ xs: 2, sm: 2, md: 2 }}>
          <Descriptions.Item label="标题">Cloud Database</Descriptions.Item>
          <Descriptions.Item label="日期">
            2018-04-24 18:00:00
          </Descriptions.Item>
          <Descriptions.Item label="提醒">准时</Descriptions.Item>
          <Descriptions.Item label="重复">每周</Descriptions.Item>
          <Descriptions.Item label="描述">
            Data disk type: MongoDB Database version: 3.4 Package: dds.mongo.mid
            Storage space: 10 GB Replication factor: 3 Region: East China 1
            <br />
          </Descriptions.Item>
        </Descriptions>
        <Button
          style={{ marginTop: 20 }}
          type="primary"
          size="large"
          onClick={handleEdit}
        >
          编辑
        </Button>
      </Modal>
    </>
  );
}
