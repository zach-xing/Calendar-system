import { ITask, TaskLevelEnum } from "@/types";
import { CheckCircleOutlined, SmallDashOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { Button, Dropdown, Modal, Tag, message } from "antd";
import dayjs from "dayjs";
import React, { useCallback, useEffect, useState } from "react";
import TaskForm from "./TaskForm";
import { modifyTaskState } from "@/api";

const StyleBox = styled.div<{ isPressing: boolean; bgColorWidth: number }>`
  position: relative;
  display: flex;
  align-items: center;
  font-size: 16px;
  color: black;
  border-radius: 10px;
  background-color: white;
  margin: 3px 0;
  cursor: pointer;
  .show {
    width: 100%;
    padding: 15px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 100;
    border-radius: 10px;
  }
  .bgColor {
    z-index: 99;
    border-radius: 10px;
    position: absolute;
    width: ${(props) => (props.isPressing ? 100 : 0)}%;
    height: 100%;
    background-color: ${(props) => (props.isPressing ? "#87d068" : "white")};
    transition: all 1s ease-out;
  }
`;

const LevelComp = (level: TaskLevelEnum) => {
  switch (level) {
    case TaskLevelEnum.ONE:
      return <Tag color='error'>优先级一</Tag>;
    case TaskLevelEnum.TWO:
      return <Tag color='warning'>优先级二</Tag>;
    case TaskLevelEnum.THREE:
      return <Tag color='processing'>优先级三</Tag>;
    case TaskLevelEnum.FOUR:
      return <Tag color='default'>优先级四</Tag>;
  }
};

interface IProps {
  data: ITask;
  operateCallback?: Function;
}

/**
 * Task 的 某一个项
 */
const TaskItem: React.FC<IProps> = (props) => {
  const { data, operateCallback } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uid, setUid] = useState("");

  const [timer, setTimer] = useState<NodeJS.Timeout | undefined>();
  const [isPressing, setIsPressing] = useState(false);

  const [curTask, setCurTask] = useState<ITask>();
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user")!);
    setUid(userData.id);
  }, []);

  // 长按触发事件
  const handleLongPress = useCallback(async () => {
    try {
      message.info("发送成功");
      await modifyTaskState(data.id, !data.isDone);
      operateCallback && operateCallback();
      message.success("更改任务状态成功");
    } catch (error) {
      console.error(error);
      message.error("更改任务状态失败");
    }
  }, [data.id, data.isDone, operateCallback]);

  // 鼠标按下事件
  const handleMouseDown = () => {
    setIsPressing(true);
    setTimer(setTimeout(handleLongPress, 1000)); // 1000毫秒为长按阈值
  };

  // 鼠标抬起事件
  const handleMouseUp = () => {
    clearTimeout(timer);
    setIsPressing(false);
  };
  return (
    <>
      <StyleBox
        isPressing={isPressing}
        bgColorWidth={2}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <div className='show '>
          <div style={{ display: "flex", alignItems: "center" }}>
            {LevelComp(data.level)}
            <div
              style={{
                marginLeft: 15,
                marginRight: 20,
              }}
            >
              <b
                style={{
                  textDecoration: data.isDone ? "line-through" : "none",
                }}
              >
                {data.title}
              </b>{" "}
              -{" "}
              <span style={{ fontSize: 14 }}>
                {dayjs(data.time).format("YYYY-MM-DD")}
              </span>
            </div>
          </div>

          <div>
            {data.isDone && (
              <Tag icon={<CheckCircleOutlined />} color='success'>
                Done!
              </Tag>
            )}
            <Dropdown
              menu={{
                items: [
                  {
                    label: (
                      <span
                        onClick={() => {
                          setIsModalOpen(true);
                          setCurTask(data);
                        }}
                      >
                        编辑
                      </span>
                    ),
                    key: "0",
                  },
                ],
              }}
              trigger={["click"]}
            >
              <Button icon={<SmallDashOutlined />} />
            </Dropdown>
          </div>
        </div>
        <div className='bgColor'></div>
      </StyleBox>

      <Modal
        title='任务'
        open={isModalOpen}
        width={600}
        footer={null}
        destroyOnClose={true}
        onCancel={() => {
          setIsModalOpen(false);
        }}
      >
        <TaskForm
          uid={uid}
          data={curTask}
          callback={() => {
            setIsModalOpen(false);
            operateCallback && operateCallback();
          }}
        />
      </Modal>
    </>
  );
};

export default TaskItem;
