import styled from "@emotion/styled";
import React from "react";

const ScrollStyleBlock = styled.div<{ height: any }>`
  overflow-y: auto;
  overflow-x: hidden;
  height: ${(props) =>
    isNaN(props.height) ? props.height : props.height + "px"};
  border-radius: 10px;
  will-change: transform;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  /* ::-webkit-scrollbar,
  ::-webkit-scrollbar-thumb {
    width: 16px;
    border-radius: 10px;
    background-clip: padding-box;
    border: 5px solid transparent;
  }
  ::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 0 5px;
    color: rgba(121, 121, 121, 0.5);
  }
  ::-webkit-scrollbar-track-piece {
    background-color: transparent;
  } */
  ::-webkit-scrollbar {
    display: none;
  }
`;

interface IProps {
  height: number| string;
}

/**
 * 滚动块
 */
const ScrollBlock: React.FC<React.PropsWithChildren<IProps>> = (props) => {
  return (
    <div
      style={{
        borderTop: "1px solid #2c2c2c",
        borderBottom: "1px solid #2c2c2c",
      }}
    >
      <ScrollStyleBlock height={props.height}>
        {props.children}
      </ScrollStyleBlock>
    </div>
  );
};

export default ScrollBlock;
