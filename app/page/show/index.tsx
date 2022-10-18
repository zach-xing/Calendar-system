import { View, Text } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";

/**
 * 显示某个事件详情
 */
export default function ShowScreen() {
  const route = useRoute();
  console.log(route.params);
  
  return (
    <View>
      <Text>ShowScreen</Text>
    </View>
  );
}
