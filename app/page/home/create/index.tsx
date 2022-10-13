import React from "react";
import { Layout, Tab, TabBar, Text } from "@ui-kitten/components";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Schedule from "./Schedule";
import ImportantDay from "./ImportantDay";
import Task from "./Task";

const { Navigator, Screen } = createMaterialTopTabNavigator();

const TopTabBar = ({ navigation, state }) => (
  <TabBar
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
  >
    <Tab title="日程" />
    <Tab title="重要日" />
    <Tab title="任务" />
  </TabBar>
);

/**
 * 创建 page
 */
export default function Create() {
  return (
    <Layout
      style={{
        flex: 1,
        padding: 10,
      }}
    >
      <Text category="h5" style={{ paddingVertical: 15 }}>
        Create
      </Text>
      <Navigator tabBar={(props) => <TopTabBar {...props} />}>
        <Screen name="Schedule" component={Schedule} />
        <Screen name="importantDay" component={ImportantDay} />
        <Screen name="task" component={Task} />
      </Navigator>
    </Layout>
  );
}
