import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  BottomNavigation,
  BottomNavigationTab,
  Button,
  Icon,
  MenuItem,
  OverflowMenu,
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
  const [settingVisible, setSettingVisible] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(null);

  const onItemSelect = (index) => {
    setSelectedIndex(index);
    setSettingVisible(false);
  };

  const renderToggleButton = () => (
    <Button
      onPress={() => setSettingVisible(true)}
      appearance="ghost"
      accessoryLeft={
        <Icon
          name="menu-2-outline"
          fill="black"
          style={{
            width: 30,
            height: 30,
            marginLeft: 10,
          }}
        />
      }
    />
  );

  return (
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
  );
}
