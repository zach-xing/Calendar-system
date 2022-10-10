import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  BottomNavigation,
  BottomNavigationTab,
  Button,
  Icon,
} from "@ui-kitten/components";
import CalendarPage from "./page/calendar";
import CreatePage from "./page/create";
import TaskPage from "./page/task";
import Toast from "react-native-toast-message";

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
    <>
      <NavigationContainer>
        <Navigator tabBar={(props) => <BottomTabBar {...props} />}>
          <Screen
            name="Calendar"
            component={CalendarPage}
            options={() => ({
              header: () => null,
            })}
          />
          <Screen name="Create" component={CreatePage} />
          <Screen name="Task" component={TaskPage} />
        </Navigator>
      </NavigationContainer>

      <Toast position="bottom" bottomOffset={70} />
    </>
  );
}
