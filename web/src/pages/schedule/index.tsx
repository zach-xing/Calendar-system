import React, { useCallback, useMemo, useState } from "react";
import ScrollBlock from "../../components/ScrollBlock";
import { ISchedule } from "@/types";
import ScheduleItem from "@/components/ScheduleItem";
import { Button, Input, Modal, Popconfirm, Space, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { remindTitle } from "@/utils/shared";
import ScheduleForm from "@/components/ScheduleForm";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [curSchedule, setCurSchedule] = useState<ISchedule>();

  const handleCreateSchedule = useCallback(() => {
    setIsModalOpen(true);
    setCurSchedule(undefined);
  }, []);

  const handleScheduleModify = useCallback((val: ISchedule) => {
    setIsModalOpen(true);
    setCurSchedule(val);
  }, []);

  const handleScheduleDelete = useCallback((id: string) => {}, []);

  const onSearch = useCallback((value: string) => {}, []);

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
            <Button
              type='link'
              onClick={() => {
                handleScheduleModify(record);
              }}
            >
              编辑
            </Button>
            <Popconfirm
              title='确定删除么?'
              onConfirm={() => {
                handleScheduleDelete(record.id);
              }}
              okText='Yes'
              cancelText='No'
            >
              <Button type='link' danger>
                删除
              </Button>
            </Popconfirm>
          </Space>
        ),
      },
    ],
    [handleScheduleDelete, handleScheduleModify]
  );

  return (
    <div>
      <h1>日程</h1>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <h3>{"All Schedule"}</h3>

        <Space>
          <Input.Search
            placeholder='input search text'
            onSearch={onSearch}
            enterButton
          />
          <Button type='primary' onClick={handleCreateSchedule}>
            创建
          </Button>
        </Space>
      </div>
      <ScrollBlock height={"calc(100vh - 180px)"}>
        <Table rowKey={"id"} columns={columns} dataSource={data} />
      </ScrollBlock>

      <Modal
        title='日程'
        open={isModalOpen}
        width={600}
        footer={null}
        destroyOnClose={true}
        onCancel={() => {
          setCurSchedule(undefined);
          setIsModalOpen(false);
        }}
      >
        <ScheduleForm data={curSchedule} />
      </Modal>
    </div>
  );
};

export default SchedulePage;
