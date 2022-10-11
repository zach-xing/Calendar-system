import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from "@ui-kitten/components";
import CalendarPage from "./calendar";
import CreatePage from "./create";
import TaskPage from "./task";

const { Navigator, Screen } = createBottomTabNavigator();

/**
 * 底部组件
 */
const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
  >
    <BottomNavigationTab icon={<Icon name="calendar-outline" />} />
    <BottomNavigationTab icon={<Icon name="plus-square" />} />
    <BottomNavigationTab icon={<Icon name="archive-outline" />} />
  </BottomNavigation>
);

/**
 * 页面
 */
export default function Page() {
  return (
    <Navigator tabBar={(props) => <BottomTabBar {...props} />}>
      <Screen
        name="Calendar"
        component={CalendarPage}
        options={() => ({
          header: () => null,
        })}
      />
      <Screen
        name="Create"
        component={CreatePage}
        options={() => ({
          header: () => null,
        })}
      />
      <Screen name="Task" component={TaskPage} />
    </Navigator>
  );
}
