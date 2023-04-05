import dayjs from "dayjs";
import { useFetchTask } from "@/api";
import { ITask } from "@/types";
import { levelTitle, remindTitle } from "@/utils/shard";
import { Button, Input, Popconfirm, Space, Tag } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import React, { useCallback, useEffect, useState } from "react";

/**
 * 日程页面
 */
const TaskPage = () => {
  const [searchAccount, setSearchAccount] = useState("");

  const { taskData, refetchTask, isFetchTaskLoading } =
    useFetchTask(searchAccount);

  const columns: ColumnsType<ITask> = [
    {
      title: "标题",
      dataIndex: "title",
      align: "center",
      key: "title",
      width: "30%",
    },
    {
      title: "截止日期",
      dataIndex: "time",
      align: "center",
      key: "time",
      width: "35%",
      render: (_, record) => dayjs(record.time).format("YYYY-MM-DD"),
    },
    {
      title: "优先级",
      dataIndex: "level",
      align: "center",
      key: "level",
      width: "10%",
      render: (_, record) => (
        <Tag color='purple'>{levelTitle(record.level)}</Tag>
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
      <h2>任务数据</h2>

      <Space style={{ margin: "10px 0" }}>
        <Input.Search
          placeholder='请输入要搜索的用户账号'
          allowClear
          enterButton='Search'
          onSearch={onSearch}
        />
      </Space>

      {searchAccount.length !== 0 && (
        <>
          <div style={{ margin: "10px 0", fontSize: 16 }}>
            <p>用户名: {taskData?.userData.name}</p>
            <p>用户账号: {taskData?.userData.account}</p>
          </div>
          <Table
            rowKey={"id"}
            bordered
            columns={columns}
            loading={isFetchTaskLoading}
            dataSource={taskData?.list}
          />
        </>
      )}
    </div>
  );
};

export default TaskPage;
