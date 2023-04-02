import React, { useCallback, useEffect, useMemo, useState } from "react";
import ScrollBlock from "../../components/ScrollBlock";
import { ITask, TaskLevelEnum } from "@/types";
import {
  Button,
  Checkbox,
  Input,
  Modal,
  Popconfirm,
  Space,
  Table,
  Tag,
} from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import TaskForm from "@/components/TaskForm";
import { useRouter } from "next/router";
import { useFetchTask } from "@/api";

const data: ITask[] = [
  {
    id: "1",
    title: "123John Brown",
    time: "2023-04-01 12:00",
    level: 2,
    isDone: false,
    desc: "",
  },
  {
    id: "2",
    title: "1John Brown",
    time: "2023-04-01 12:00",
    level: 1,
    isDone: false,
    desc: "",
  },
  {
    id: "3",
    title: "aaaJohn Brown",
    time: "2023-04-01 12:00",
    level: 3,
    isDone: false,
    desc: "",
  },
];
/**
 * 任务视图
 */
const TaskPage = () => {
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [curTask, setCurTask] = useState<ITask>();

  const [searchValue, setSearchValue] = useState("");

  /** 发送请求 */
  const [uid, setUid] = useState("");
  const [isShowToday, setIsShowToday] = useState(!!router.query.showToday);
  const { taskData, isFetchTaskLoading } = useFetchTask(
    uid,
    isShowToday ? dayjs(Date.now()).format("YYYY-MM-DD") : ""
  );
  const [filteredTaskList, setFilteredTaskList] = useState<ITask[]>([]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user")!);
    setUid(userData.id);
  }, []);

  useEffect(() => {
    const filteredList = taskData?.list.filter((item) =>
      item.title.includes(searchValue)
    );
    setFilteredTaskList(filteredList || []);
  }, [taskData?.list, searchValue]);

  const handleCreateTask = useCallback(() => {
    setIsModalOpen(true);
    setCurTask(undefined);
  }, []);

  const handleTaskModify = useCallback((val: ITask) => {
    setIsModalOpen(true);
    setCurTask(val);
  }, []);

  const handleTaskDelete = useCallback((id: string) => {}, []);

  const onSearch = useCallback((value: string) => {
    setSearchValue(value);
  }, []);

  const columns: ColumnsType<ITask> = useMemo(
    () => [
      {
        title: "标题",
        dataIndex: "title",
        align: "center",
        key: "title",
        width: "30%",
      },
      {
        title: "是否完成",
        dataIndex: "isDone",
        key: "isDone",
        align: "center",
        width: "10%",
        render: (_, record) => (
          <Tag color={record.isDone ? "success" : "warning"}>
            {record.isDone ? "完成" : "未完成"}
          </Tag>
        ),
      },
      {
        title: "截止时间",
        dataIndex: "time",
        align: "center",
        key: "time",
        width: "25%",
        render: (_, record) => dayjs(record.time).format("YYYY-MM-DD"),
      },
      {
        title: "优先级",
        dataIndex: "level",
        align: "center",
        key: "level",
        width: "15%",
        render: (_, record) => {
          switch (record.level) {
            case TaskLevelEnum.ONE:
              return <Tag color='error'>优先级一</Tag>;
            case TaskLevelEnum.TWO:
              return <Tag color='warning'>优先级二</Tag>;
            case TaskLevelEnum.THREE:
              return <Tag color='processing'>优先级三</Tag>;
            case TaskLevelEnum.FOUR:
              return <Tag color='default'>优先级四</Tag>;
          }
        },
      },
      {
        title: "Action",
        key: "action",
        align: "center",
        width: "20%",
        render: (_, record) => (
          <Space size='middle'>
            <Button
              type='link'
              onClick={() => {
                handleTaskModify(record);
              }}
            >
              编辑
            </Button>
            <Popconfirm
              title='确定删除么?'
              onConfirm={() => {
                handleTaskDelete(record.id);
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
    [handleTaskDelete, handleTaskModify]
  );

  return (
    <div>
      <h1>任务</h1>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <h3 style={{ marginRight: 20 }}>{"All Task"}</h3>
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
            placeholder='请输入任务标题...'
            onSearch={onSearch}
            enterButton
          />
          <Button type='primary' onClick={handleCreateTask}>
            创建
          </Button>
        </Space>
      </div>
      <ScrollBlock height={"calc(100vh - 180px)"}>
        <Table
          rowKey={"id"}
          loading={isFetchTaskLoading}
          columns={columns}
          dataSource={filteredTaskList}
        />
      </ScrollBlock>

      <Modal
        title='任务'
        open={isModalOpen}
        width={600}
        footer={null}
        destroyOnClose={true}
        onCancel={() => {
          setCurTask(undefined);
          setIsModalOpen(false);
        }}
      >
        <TaskForm data={curTask} />
      </Modal>
    </div>
  );
};

export default TaskPage;
