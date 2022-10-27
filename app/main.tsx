import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Toast from "react-native-toast-message";

import HomeScreen from "./page/home";
import SettingScreen from "./page/setting";
import LoginOrRegisterScreen from "./page/login";
import ShowScreen from "./page/show";
import storage from "./utils/storage";

const Stack = createNativeStackNavigator();

/**
 * 主路由
 */
export default function Main() {
  React.useEffect(() => {
    storage.load({ key: "settings" }).catch(() => {
      // 若不存在 setttings，则初始化
      storage.save({
        key: "settings",
        data: {
          calendarView: "calendar",
          // remind: 0,
          // repeat: 0,
        },
      });
    });
  }, []);

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="login-or-register"
            component={LoginOrRegisterScreen}
            options={() => ({
              header: () => null,
            })}
          />
          <Stack.Screen
            name="home"
            component={HomeScreen}
            options={() => ({
              header: () => null,
            })}
          />
          <Stack.Screen
            name="show"
            component={ShowScreen}
            options={() => ({
              header: () => null,
            })}
          />
          <Stack.Screen
            name="setting"
            component={SettingScreen}
            options={() => ({
              header: () => null,
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>

      <Toast position="bottom" bottomOffset={70} />
    </>
  );
}
