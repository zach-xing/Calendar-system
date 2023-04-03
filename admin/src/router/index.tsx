import type { RouteObject } from "react-router-dom";
import React from "react";
import { HomeOutlined } from "@ant-design/icons";

const Home = React.lazy(() => import("@/pages/home"));
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
    path: "/about",
    element: <></>,
    title: "关于",
    icon: <HomeOutlined />,
  },
];
