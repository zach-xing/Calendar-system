import { modifyUserPsd, useFetchUsers } from "@/api";
import { IUser } from "@/types";
import {
  Button,
  Dropdown,
  Form,
  Input,
  Modal,
  Space,
  Table,
  message,
} from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * 用户页面
 */
const UserPage = () => {
  const navigate = useNavigate();
  const { usersData, refetchUsers, isFetchUsersLoading } = useFetchUsers();
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);
  const [searchValue, setSearchValue] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [curUid, setCurUid] = useState("");
  const [curPassword, setCurPassword] = useState("");

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
          <Button
            type='link'
            onClick={() => {
              setCurUid(record.id);
              setCurPassword(record.password);
              setIsModalOpen(true);
            }}
          >
            更改密码
          </Button>
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

  const onFinish = useCallback(async (val: any) => {
    try {
      await modifyUserPsd(curUid, val.password);
      message.success("修改成功");
      setIsModalOpen(false);
      refetchUsers();
    } catch (error) {
      console.error(error);
      message.error("修改失败");
    }
  }, []);

  return (
    <div>
      <h2>用户数据</h2>

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

      <Modal
        title='更改密码'
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        destroyOnClose
        footer={null}
      >
        <Form
          name='basic'
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          autoComplete='off'
          initialValues={{ password: curPassword }}
        >
          <Form.Item
            label='密码'
            name='password'
            rules={[{ required: true, message: "密码不能为空" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type='primary' htmlType='submit'>
              保存
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserPage;
