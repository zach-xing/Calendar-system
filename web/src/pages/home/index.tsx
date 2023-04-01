import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Container, Header } from "./style";
import { Dropdown, Image, List, Space, Typography } from "antd";
import { BookOutlined, ClockCircleOutlined, DownOutlined, ScheduleOutlined } from "@ant-design/icons";
import InfoBlock from "./components/InfoBlock";
import ScrollBlock from "@/components/ScrollBlock";
/**
 * 首页
 */
export default function Home() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <Container>
      <h1>首页</h1>

      <div style={{ display: "flex", marginBottom: 25 }}>
        <InfoBlock
          icon={<ScheduleOutlined />}
          value={16}
          text={"待开始的日程"}
          bgColor='#e7582b'
          onClick={() => {
            console.log("sdfsdf");
          }}
        />
        <InfoBlock
          icon={<ClockCircleOutlined />}
          value={16}
          text={"待完成的任务"}
          bgColor='#582be7'
          onClick={() => {
            console.log("sdfsdf");
          }}
        />
        <InfoBlock
          icon={<BookOutlined />}
          value={16}
          text={"备忘录"}
          bgColor='#242424'
          onClick={() => {
            console.log("sdfsdf");
          }}
        />
      </div>

      <h3>{"Today's Schedule"}</h3>
      <ScrollBlock height={'calc(100vh - 300px)'}>
        <List
          header={<div>Header</div>}
          footer={<div>Footer</div>}
          bordered
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <Typography.Text mark>[ITEM]</Typography.Text> {item}
            </List.Item>
          )}
        />
      </ScrollBlock>
    </Container>
  );
}

const data = [
  "Racing car sprays burning fuel into crowd.",
  "Japanese princess to wed commoner.",
  "Australian walks 100km after outback crash.",
  "Man charged over missing wedding girl.",
  "Los Angeles battles huge wildfires.",
];