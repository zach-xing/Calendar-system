import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./Login";
import RegisterScreen from "./Register";
import storage from "../../utils/storage";

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
        component={RegisterScreen}
        options={() => ({
          header: () => null,
        })}
      />
    </Stack.Navigator>
  );
}
