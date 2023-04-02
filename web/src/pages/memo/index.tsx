import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import ScrollBlock from "@/components/ScrollBlock";
import MenuCard from "./components/MenuCard";
import { Button, Form, Input, Modal, message } from "antd";
import { IMemo } from "@/types";
import { useFetchMemo } from "@/api";
import dayjs from "dayjs";
import MemoForm from "@/components/MemoForm";
import { eventInstance, REFRESH_MEMO_DATE } from "@/events";

const ContainerStyleBox = styled.div`
  display: flex;
  margin-top: 10px;
  .leftSider {
    width: 260px;
    background-color: white;
    margin-right: 20px;
  }
  .rightContainer {
    width: 100%;
    background-color: white;
    text-align: center;
    h3 {
      text-align: left;
    }
  }
`;

/**
 * 备忘录
 */
const MemoPage = () => {
  const [curMemo, setCurMemo] = useState<IMemo>();
  const [isShowForm, setIsShowForm] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  /** 发送请求相关 */
  const [uid, setUid] = useState("");
  const { memoList, isFetchMemoLoading, refetch } = useFetchMemo(uid);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user")!);
    setUid(userData.id);
  }, []);

  /** 监听事件 */
  useEffect(() => {
    eventInstance.on(REFRESH_MEMO_DATE, refetch);
    return () => {
      eventInstance.off(REFRESH_MEMO_DATE);
    };
  }, [refetch]);

  return (
    <>
      <h1>备忘录</h1>
      <Button
        type='primary'
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        创建
      </Button>

      <ContainerStyleBox>
        <div className='leftSider'>
          <ScrollBlock height={"calc(100vh - 180px)"}>
            {isFetchMemoLoading ? (
              <div style={{ padding: 20 }}>Loading...</div>
            ) : (
              <>
                {memoList?.length === 0 ? (
                  <div style={{ padding: 20, textAlign: "center" }}>空</div>
                ) : (
                  memoList?.map((item) => (
                    <MenuCard
                      key={item.id}
                      title={item.title}
                      lastModifiedTime={dayjs(item.lastModifiedTime).format(
                        "YYYY-MM-DD HH:mm"
                      )}
                      onClick={() => {
                        setIsShowForm(true);
                        setCurMemo(item);
                      }}
                    />
                  ))
                )}
              </>
            )}
          </ScrollBlock>
        </div>

        <div className='rightContainer'>
          {isShowForm ? (
            <ScrollBlock height={"calc(100vh - 180px)"}>
              <MemoForm
                uid={uid}
                data={curMemo}
                callback={refetch}
                deleteCallback={() => {
                  setIsShowForm(false);
                  refetch();
                }}
              />
            </ScrollBlock>
          ) : (
            <div
              style={{
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#383838",
              }}
            >
              <h2>请选择左边某个备忘录 或 创建备忘录</h2>
            </div>
          )}
        </div>
      </ContainerStyleBox>

      <Modal
        title='创建备忘录'
        open={isModalOpen}
        width={600}
        footer={null}
        destroyOnClose={true}
        onCancel={() => {
          setIsModalOpen(false);
        }}
      >
        <MemoForm
          uid={uid}
          callback={() => {
            refetch();
            setIsModalOpen(false);
          }}
        />
      </Modal>
    </>
  );
};

export default MemoPage;
