import { SmallDashOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { Button } from "antd";
import React from "react";

const StyleBox = styled.div`
  width: 260px;
  padding: 15px;
  cursor: pointer;
  border-bottom: 1px solid #cfcfcf;
  &: hover {
    background-color: #eee;
  }
  &:first-of-type {
    border-top: 1px solid #cfcfcf;
  }
  .title {
    width: 80%;
    font-weight: bold;
    white-space: nowrap; /* 禁止换行 */
    overflow: hidden; /* 隐藏溢出部分 */
    text-overflow: ellipsis;
  }
  .time {
    font-size: 12px;
  }
`;

interface IProps {
  title: string;
  lastModifiedTime: string;
  onClick: React.MouseEventHandler;
}

/**
 * 左边的导航卡片
 */
const MenuCard: React.FC<IProps> = (props) => {
  return (
    <StyleBox onClick={props.onClick}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p className='title'>{props.title}</p>
      </div>
      <div className='time'>最后修改时间: </div>
      <div className='time'>{props.lastModifiedTime}</div>
    </StyleBox>
  );
};

export default MenuCard;
