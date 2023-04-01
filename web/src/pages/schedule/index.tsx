import React, { useMemo } from "react";
import ScrollBlock from "../../components/ScrollBlock";
import { ISchedule } from "@/types";
import ScheduleItem from "@/components/ScheduleItem";
import { Button, Space, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { remindTitle } from "@/utils/shared";

const data: ISchedule[] = [
  {
    id: "1",
    title: "John Brown",
    isFullDay: false,
    startTime: "2023-04-01 12:00",
    endTime: "2023-04-01: 13:00",
    remind: 0,
    desc: "",
  },
  {
    id: "2",
    title: "John Brown",
    isFullDay: false,
    startTime: "2023-04-01 12:00",
    endTime: "2023-04-01: 13:00",
    remind: 0,
    desc: "",
  },
  {
    id: "3",
    title: "John Brown",
    isFullDay: true,
    startTime: "2023-04-01 12:00",
    endTime: "2023-04-01: 13:00",
    remind: 0,
    desc: "",
  },
];
/**
 * 日程视图
 */
const SchedulePage = () => {
  const columns: ColumnsType<ISchedule> = useMemo(
    () => [
      {
        title: "标题",
        dataIndex: "title",
        align: "center",
        key: "title",
        width: "30%",
      },
      {
        title: "是否全天",
        dataIndex: "isFullDay",
        key: "isFullDay",
        align: "center",
        width: "10%",
        render: (_, record) => (
          <Tag color={record.isFullDay ? "cyan" : "geekblue"}>
            {record.isFullDay ? "是" : "不是"}
          </Tag>
        ),
      },
      {
        title: "日期时间",
        dataIndex: "startTime",
        align: "center",
        key: "startTime",
        width: "35%",
        render: (_, record) =>
          record.isFullDay
            ? dayjs(record.startTime).format("YYYY-MM-DD")
            : `${dayjs(record.startTime).format("YYYY-MM-DD HH:mm")} - ${dayjs(
                record.endTime
              ).format("YYYY-MM-DD HH:mm")}`,
      },
      {
        title: "提醒",
        dataIndex: "remind",
        align: "center",
        key: "remind",
        width: "10%",
        render: (_, record) => (
          <Tag color='purple'>{remindTitle(record.remind)}</Tag>
        ),
      },
      {
        title: "Action",
        key: "action",
        align: "center",
        width: "15%",
        render: (_, record) => (
          <Space size='middle'>
            <Button type='link'>编辑</Button>
            <Button type='link' danger>
              删除
            </Button>
          </Space>
        ),
      },
    ],
    []
  );

  return (
    <div>
      <h1>日程</h1>

      <h3>{"All Schedule"}</h3>
      <ScrollBlock height={"calc(100vh - 150px)"}>
        <Table rowKey={"id"} columns={columns} dataSource={data} />
      </ScrollBlock>
    </div>
  );
};

export default SchedulePage;
