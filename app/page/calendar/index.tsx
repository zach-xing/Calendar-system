import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CalendarScreen from "./Calendar";
import SettingPage from "./Setting";

const Stack = createNativeStackNavigator();

/**
 * 页面
 */
export default function Page() {

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Calendar-home"
        component={CalendarScreen}
        options={() => ({
          header: () => null,
        })}
      />
      <Stack.Screen
        name="Calendar-setting"
        component={SettingPage}
        options={() => ({
          header: () => null,
        })}
      />
    </Stack.Navigator>
  );
}
