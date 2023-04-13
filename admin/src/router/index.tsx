import type { RouteObject } from "react-router-dom";
import React from "react";
import {
  BookOutlined,
  CalendarOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  MinusSquareOutlined,
} from "@ant-design/icons";

const Home = React.lazy(() => import("@/pages/home"));
const User = React.lazy(() => import("@/pages/user"));
const Schedule = React.lazy(() => import("@/pages/schedule"));
const Task = React.lazy(() => import("@/pages/task"));
const Memo = React.lazy(() => import("@/pages/memo"));
const About = React.lazy(() => import("@/pages/about"));

export type IRoute = RouteObject & {
  // more type
  path: string;
  title: string;
  icon: React.ReactNode;
};

export const routes: IRoute[] = [
  {
    path: "/",
    element: <Home />,
    title: "主页",
    icon: <HomeOutlined />,
  },
  {
    path: "/user",
    element: <User />,
    title: "用户数据",
    icon: <InfoCircleOutlined />,
  },
  {
    path: "/schedule",
    element: <Schedule />,
    title: "日程数据",
    icon: <CalendarOutlined />,
  },
  {
    path: "/task",
    element: <Task />,
    title: "任务数据",
    icon: <MinusSquareOutlined />,
  },
  {
    path: "/memo",
    element: <Memo />,
    title: "备忘录数据",
    icon: <BookOutlined />,
  },
];
