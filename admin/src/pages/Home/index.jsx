import React from "react";
import { Card } from "@douyinfe/semi-ui";
import { Instruction } from "./styled";

function Home() {
  return (
    <>
      <Card title="排班系统">
        <h2>技术栈</h2>
        <Instruction>
          前端： <code>React (Hooks)</code> <br />
          前台界面用的 <code>Next.js</code>， 后台界面用的<code>纯React</code>
        </Instruction>
        <Instruction>
          后端： <code>Java</code>
        </Instruction>
        <h2>功能介绍</h2>
        <Instruction>
          前台界面功能（客户端）：登录注册，查看部门人员，查看或添加自己排班、签到{" "}
          <br />
          后台界面功能（管理员端）：人员删除、更改人员所在部门、管理班次显示情况、查看人员的考勤情况
        </Instruction>
      </Card>
    </>
  );
}

export default Home;
