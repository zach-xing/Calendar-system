import React, { useCallback, useEffect, useMemo, useState } from "react";
import ScrollBlock from "../../components/ScrollBlock";
import { ISchedule } from "@/types";
import {
  Button,
  Checkbox,
  Input,
  Modal,
  Popconfirm,
  Space,
  Table,
  Tag,
  message,
} from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { remindTitle } from "@/utils/shared";
import ScheduleForm from "@/components/ScheduleForm";
import { deleteSchedule, useFetchSchedule } from "@/api";
import { useRouter } from "next/router";
import { REFRESH_SCHEDULE_DATE, REFRESH_SIDER_CALDENDAR_DATE, eventInstance } from "@/events";

/**
 * 日程视图
 */
const SchedulePage = () => {
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [curSchedule, setCurSchedule] = useState<ISchedule>();

  const [searchValue, setSearchValue] = useState("");

  /** 发送请求 */
  const [uid, setUid] = useState("");
  const [isShowToday, setIsShowToday] = useState(!!router.query.showToday);
  const { scheduleData, isFetchScheduleLoading, refetchSchedule } =
    useFetchSchedule(
      uid,
      isShowToday ? dayjs(Date.now()).format("YYYY-MM-DD") : ""
    );
  const [filteredScheduleList, setFilteredScheduleList] = useState<ISchedule[]>(
    []
  );

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user")!);
    setUid(userData.id);
  }, []);

  useEffect(() => {
    const filteredList = scheduleData?.list.filter((item) =>
      item.title.includes(searchValue)
    );
    setFilteredScheduleList(filteredList || []);
  }, [scheduleData?.list, searchValue]);

  /** 监听事件 */
  useEffect(() => {
    eventInstance.on(REFRESH_SCHEDULE_DATE, refetchSchedule);
    return () => {
      eventInstance.off(REFRESH_SCHEDULE_DATE);
    };
  }, [refetchSchedule]);

  const handleCreateSchedule = useCallback(() => {
    setIsModalOpen(true);
    setCurSchedule(undefined);
  }, []);

  const handleScheduleModify = useCallback((val: ISchedule) => {
    setIsModalOpen(true);
    setCurSchedule(val);
  }, []);

  const handleScheduleDelete = useCallback(
    async (id: string) => {
      try {
        await deleteSchedule(id);
        message.success("删除日程成功");
        refetchSchedule();
        eventInstance.emit(REFRESH_SIDER_CALDENDAR_DATE);
      } catch (error) {
        console.error(error);
        message.error("删除日程失败");
      }
    },
    [refetchSchedule]
  );

  const onSearch = useCallback((value: string) => {
    setSearchValue(value);
  }, []);

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
        <div style={{ display: "flex", alignItems: "center" }}>
          <h3 style={{ marginRight: 20 }}>{"All Schedule"}</h3>
          <Checkbox
            checked={isShowToday}
            onChange={() => {
              setIsShowToday((prev) => !prev);
            }}
          >
            只看今天
          </Checkbox>
        </div>

        <Space>
          <Input.Search
            allowClear
            placeholder='请输入日程标题...'
            onSearch={onSearch}
            enterButton
          />
          <Button type='primary' onClick={handleCreateSchedule}>
            创建
          </Button>
        </Space>
      </div>
      <ScrollBlock height={"calc(100vh - 180px)"}>
        <Table
          rowKey={"id"}
          loading={isFetchScheduleLoading}
          columns={columns}
          dataSource={filteredScheduleList}
        />
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
        <ScheduleForm
          uid={uid}
          data={curSchedule}
          callback={() => {
            setIsModalOpen(false);
            refetchSchedule();
          }}
        />
      </Modal>
    </div>
  );
};

export default SchedulePage;
