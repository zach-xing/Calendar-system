import dayjs from "dayjs";
import { useFetchSchedule } from "@/api";
import { ISchedule } from "@/types";
import { remindTitle } from "@/utils/shard";
import { Button, Input, Popconfirm, Space, Tag } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import React, { useCallback, useEffect, useState } from "react";

/**
 * 日程页面
 */
const SchedulePage = () => {
  const [searchAccount, setSearchAccount] = useState("");

  const { scheduleData, refetchSchedule, isFetchScheduleLoading } =
    useFetchSchedule(searchAccount);

  const columns: ColumnsType<ISchedule> = [
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
    // {
    //   title: "Action",
    //   key: "action",
    //   align: "center",
    //   width: "15%",
    //   render: (_, record) => (
    //     <Space size='middle'>
    //       <Button type='link'>编辑</Button>
    //       <Popconfirm
    //         title='确定删除么?'
    //         onConfirm={() => {}}
    //         okText='Yes'
    //         cancelText='No'
    //       >
    //         <Button type='link' danger>
    //           删除
    //         </Button>
    //       </Popconfirm>
    //     </Space>
    //   ),
    // },
  ];

  const onSearch = useCallback((val: string) => {
    setSearchAccount(val);
  }, []);

  return (
    <div>
      <h2>日程数据</h2>

      <Space style={{ margin: "10px 0" }}>
        <Input.Search
          placeholder='请输入要搜索的账号'
          allowClear
          enterButton='Search'
          onSearch={onSearch}
        />
      </Space>

      {searchAccount.length !== 0 && (
        <>
          <div style={{ margin: "10px 0", fontSize: 16 }}>
            <p>用户名: {scheduleData?.userData.name}</p>
            <p>用户账号: {scheduleData?.userData.account}</p>
          </div>
          <Table
            bordered
            columns={columns}
            loading={isFetchScheduleLoading}
            dataSource={scheduleData?.list}
          />
        </>
      )}
    </div>
  );
};

export default SchedulePage;
