import { ISchedule } from "@/types";
import { SmallDashOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { Button, Dropdown, Modal, message } from "antd";
import dayjs from "dayjs";
import React, { useCallback, useEffect, useState } from "react";
import ScheduleForm from "./ScheduleForm";
import { deleteSchedule } from "@/api";

const StyleBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  color: black;
  border-radius: 10px;
  background-color: white;
  padding: 15px;
  margin: 3px 0;
`;

interface IProps {
  data: ISchedule;
  operateCallback?: Function;
}

/**
 * Schedule 的 某一个项
 */
const ScheduleItem: React.FC<IProps> = (props) => {
  const { data, operateCallback } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uid, setUid] = useState("");

  const [curSchedule, setCurSchedule] = useState<ISchedule>();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user")!);
    setUid(userData.id);
  }, []);

  return (
    <>
      <StyleBox>
        <div>
          <b>{data.title}</b>
          <span style={{ marginLeft: 10, fontSize: 14 }}>
            {data.isFullDay
              ? dayjs(data.startTime).format("YYYY-MM-DD")
              : `${dayjs(data.startTime).format("YYYY-MM-DD HH:mm")} ~ ${dayjs(
                  data.endTime
                ).format("YYYY-MM-DD HH:mm")}`}
          </span>
        </div>

        <div>
          <Dropdown
            menu={{
              items: [
                {
                  label: (
                    <span
                      onClick={() => {
                        setIsModalOpen(true);
                        setCurSchedule(data);
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
      </StyleBox>

      <Modal
        title='日程'
        open={isModalOpen}
        width={600}
        footer={null}
        destroyOnClose={true}
        onCancel={() => {
          setIsModalOpen(false);
        }}
      >
        <ScheduleForm
          uid={uid}
          data={curSchedule}
          callback={() => {
            setIsModalOpen(false);
            operateCallback && operateCallback();
          }}
        />
      </Modal>
    </>
  );
};

export default ScheduleItem;
