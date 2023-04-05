import { useFetchUsers } from "@/api";
import { IUser } from "@/types";
import { Button, Dropdown, Input, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "用户日增量",
    },
  },
};
const labels = ["前五天", "前四天", "前三天", "前天", "昨天", "今天"];

const data = {
  labels,
  datasets: [
    {
      label: "用户日增量",
      data: [1, 3, 5, 3, 5, 7],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

/**
 * 用户页面
 */
const UserPage = () => {
  const navigate = useNavigate();
  const { usersData, refetchUsers, isFetchUsersLoading } = useFetchUsers();
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);
  const [searchValue, setSearchValue] = useState("");

  const handletoPath = useCallback((path: string, account: string) => {
    navigate(`/${path}?account=${account}`);
  }, []);

  const columns: ColumnsType<IUser> = [
    {
      title: "用户名",
      dataIndex: "name",
      key: "name",
      align: "center",
      width: "20%",
    },
    {
      title: "账号",
      dataIndex: "account",
      key: "account",
      align: "center",
      width: "30%",
    },
    {
      title: "密码",
      dataIndex: "password",
      key: "password",
      align: "center",
      width: "20%",
      render: () => "******",
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      width: "30%",
      render: (_, record) => (
        <Space size='middle'>
          <Dropdown
            menu={{
              items: [
                {
                  label: (
                    <Button
                      type='link'
                      onClick={() => handletoPath("schedule", record.account)}
                    >
                      日程
                    </Button>
                  ),
                  key: "0",
                },
                {
                  label: (
                    <Button
                      type='link'
                      onClick={() => handletoPath("task", record.account)}
                    >
                      任务
                    </Button>
                  ),
                  key: "1",
                },
                {
                  label: (
                    <Button
                      type='link'
                      onClick={() => handletoPath("memo", record.account)}
                    >
                      备忘录
                    </Button>
                  ),
                  key: "2",
                },
              ],
            }}
            trigger={["click"]}
          >
            <Button type='link'>查看数据</Button>
          </Dropdown>
          <Button type='link'>更改密码</Button>
          <Button type='link' danger>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    setFilteredUsers(
      usersData?.list.filter((user) => user.name.includes(searchValue)) || []
    );
  }, [usersData, searchValue]);

  const onSearch = (val: string) => {
    setSearchValue(val);
  };

  return (
    <div>
      <h2>用户数据</h2>

      <div style={{ height: "40vh" }}>
        <Line options={options} data={data} />
      </div>

      <Space style={{ margin: "10px 0" }}>
        <Input.Search
          placeholder='请输入用户名...'
          allowClear
          enterButton='Search'
          onSearch={onSearch}
        />
      </Space>

      <Table
        bordered
        columns={columns}
        loading={isFetchUsersLoading}
        dataSource={filteredUsers}
      />
    </div>
  );
};

export default UserPage;
