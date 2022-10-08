import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from "@ui-kitten/components";
import CalendarPage from "./page/calendar";
import CreatePage from "./page/create";
import TaskPage from "./page/task";

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

export default function Main() {
  return (
    <NavigationContainer>
      <Navigator tabBar={(props) => <BottomTabBar {...props} />}>
        <Screen
          name="Calendar"
          component={CalendarPage}
          options={({ navigation }) => ({
            title: "",
            headerLeft: () => (
              <Icon
                name="menu-2-outline"
                fill="black"
                style={{
                  width: 30,
                  height: 30,
                  marginLeft: 10,
                }}
              />
            ),
          })}
        />
        <Screen name="Create" component={CreatePage} />
        <Screen name="Task" component={TaskPage} />
      </Navigator>
    </NavigationContainer>
  );
}
