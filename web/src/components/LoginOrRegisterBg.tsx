/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import styled from "@emotion/styled";
import Image from "next/image";
import BGImage from "../assets/bg1.png";

interface IProps {
  children: React.ReactNode;
}

const ContainerStyleBlock = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;

  .left {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
  }

  .right {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f3f5f9;
  }
`;

/**
 * 登录 或 注册 的背景 UI
 */
const LoginOrRegisterBg: React.FC<IProps> = (props) => {
  return (
    <ContainerStyleBlock>
      <div className={"left"}>{props.children}</div>
      <div className={"right"}>
        <Image src={BGImage} alt='logo' width={500} />
      </div>
    </ContainerStyleBlock>
  );
};

export default LoginOrRegisterBg;
