import React, { lazy } from "react";
import { Layout, Nav, Avatar } from "@douyinfe/semi-ui";
import { Switch, Route, useHistory } from "react-router-dom";
import {
  IconHome,
  IconUser,
} from "@douyinfe/semi-icons";

function App(props) {
  const { Header, Sider, Content } = Layout;
  let history = useHistory();

  return (
    <Layout
      style={{ border: "1px solid var(--semi-color-border)", height: "100vh" }}
    >
      <Sider style={{ backgroundColor: "var(--semi-color-bg-1)" }}>
        <Nav
          defaultSelectedKeys={["Home"]}
          style={{ maxWidth: 220, height: "100%" }}
          items={[
            {
              itemKey: "home",
              text: "首页",
              icon: <IconHome size="large" />,
              onClick: ({ itemKey }) => {
                history.push(`/`);
              },
            },
            {
              itemKey: "user",
              text: "用户管理",
              icon: <IconUser size="large" />,
              onClick: ({ itemKey }) => {
                history.push(`/${itemKey}`);
              },
            },
          ]}
          header={{
            logo: (
              // eslint-disable-next-line jsx-a11y/alt-text
              <img src="//lf1-cdn-tos.bytescm.com/obj/ttfe/ies/semi/webcast_logo.svg" />
            ),
            text: "日历系统后台",
          }}
          footer={{
            collapseButton: true,
          }}
        />
      </Sider>
      <Layout>
        <Header style={{ backgroundColor: "var(--semi-color-bg-1)" }}>
          <Nav
            mode="horizontal"
            footer={
              <>
                <Avatar
                  size="small"
                  src="https://portrait.gitee.com/uploads/avatars/user/2901/8704759_ZKangCoding_1639707483.png!avatar30"
                ></Avatar>
              </>
            }
          ></Nav>
        </Header>
        <Content
          style={{
            padding: "24px",
            backgroundColor: "var(--semi-color-bg-0)",
          }}
        >
          <React.Suspense fallback={<span>Loading...</span>}>
            <Switch>
              <Route
                exact
                path="/"
                component={lazy(() => import("./pages/Home"))}
              />
              <Route
                exact
                path="/user"
                component={lazy(() => import("./pages/User"))}
              />
            </Switch>
          </React.Suspense>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
