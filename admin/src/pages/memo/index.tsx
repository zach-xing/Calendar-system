import dayjs from "dayjs";
import { useFetchMemo } from "@/api";
import { IMemo } from "@/types";
import { Input, Space } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import React, { useCallback, useEffect, useState } from "react";

/**
 * 日程页面
 */
const MemoPage = () => {
  const [searchAccount, setSearchAccount] = useState("");

  const { memoData, refetchMemo, isFetchMemoLoading } =
    useFetchMemo(searchAccount);

  const columns: ColumnsType<IMemo> = [
    {
      title: "标题",
      dataIndex: "title",
      align: "center",
      key: "title",
      width: "30%",
    },
    {
      title: "最后操作时间",
      dataIndex: "startTime",
      align: "center",
      key: "startTime",
      width: "35%",
      render: (_, record) =>
        dayjs(record.lastModifiedTime).format("YYYY-MM-DD"),
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
      <h2>备忘录数据</h2>

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
            <p>用户名: {memoData?.userData.name}</p>
            <p>用户账号: {memoData?.userData.account}</p>
          </div>

          <Table
            bordered
            columns={columns}
            loading={isFetchMemoLoading}
            dataSource={memoData?.list}
          />
        </>
      )}
    </div>
  );
};

export default MemoPage;
