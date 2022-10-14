import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from './Login'

const Stack = createNativeStackNavigator();

/**
 * 登录 or 注册
 */
export default function LoginOrRegister() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="loginOrRegister-login"
        component={LoginScreen}
        options={() => ({
          header: () => null,
        })}
      />
      <Stack.Screen
        name="loginOrRegister-register"
        component={LoginScreen}
        options={() => ({
          header: () => null,
        })}
      />
    </Stack.Navigator>
  );
}
