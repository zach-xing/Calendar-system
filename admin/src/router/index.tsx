import type { RouteObject } from "react-router-dom";
import React from "react";
import { HomeOutlined } from "@ant-design/icons";

const Home = React.lazy(() => import("@/pages/home"));
const User = React.lazy(() => import("@/pages/user"));
const Schedule = React.lazy(() => import("@/pages/schedule"));
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
    icon: <HomeOutlined />,
  },
  {
    path: "/schedule",
    element: <Schedule />,
    title: "日程数据",
    icon: <HomeOutlined />,
  },
  {
    path: "/task",
    element: <></>,
    title: "任务数据",
    icon: <HomeOutlined />,
  },
  {
    path: "/memo",
    element: <></>,
    title: "备忘录数据",
    icon: <HomeOutlined />,
  },
];
