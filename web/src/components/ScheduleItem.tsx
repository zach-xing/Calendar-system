import { ISchedule } from "@/types";
import { SmallDashOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { Button, Dropdown, message } from "antd";
import dayjs from "dayjs";
import React, { useCallback, useState } from "react";

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
}

/**
 * Schedule 的 某一个项
 */
const ScheduleItem: React.FC<IProps> = (props) => {
  const { data } = props;

  return (
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
    </StyleBox>
  );
};

export default ScheduleItem;
