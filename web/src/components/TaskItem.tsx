import { ITask, TaskLevelEnum } from "@/types";
import { CheckCircleOutlined, SmallDashOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { Button, Dropdown, Tag, message } from "antd";
import dayjs from "dayjs";
import React, { useCallback, useState } from "react";

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
}

/**
 * Task 的 某一个项
 */
const TaskItem: React.FC<IProps> = (props) => {
  const { data } = props;
  const [timer, setTimer] = useState<NodeJS.Timeout | undefined>();
  const [isPressing, setIsPressing] = useState(false);

  const [isDone, setIsDone] = useState(data.isDone);

  // 长按触发事件
  const handleLongPress = useCallback(() => {
    message.info("发送成功");
    setIsDone(!isDone);
    // TODO:发送 done task request
  }, [isDone]);

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
              textDecoration: isDone ? "line-through" : "none",
            }}
          >
            <b>{data.title}</b> - {dayjs(data.time).format("YYYY-MM-DD")}
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
                  label: <span>编辑</span>,
                  key: "0",
                },
                {
                  label: <span style={{ color: "red" }}>删除</span>,
                  key: "1",
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
  );
};

export default TaskItem;
