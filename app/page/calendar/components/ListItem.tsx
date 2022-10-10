import { Card, Text } from "@ui-kitten/components";
import React from "react";
import { View, StyleSheet } from "react-native";

/**
 * 列表渲染的 Item
 */
export default function ListItem(info: any) {
  // console.log(info);
  return (
    <View
      // appearance="filled"
      style={{
        marginVertical: 5,
        marginHorizontal: 3,
        padding: 5,
      }}
    >
      <View style={styles.containerStyle}>
        <View style={styles.flagStyle}>
          <Text style={{ fontSize: 16, color: "black" }}>10:00</Text>
          <Text style={{ fontSize: 12, color: "grey" }}>15:00</Text>
        </View>
        {/* 事件的信息展示 */}
        <View style={styles.infoStyle}>
          <Text category="p1" style={{ fontWeight: "bold", color: "blue" }}>
            Sep 20, 2021
          </Text>
          <Text category="h6" style={{ marginVertical: 5 }}>
            My Dribbble Shoot
          </Text>
          <Text numberOfLines={1}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    display: "flex",
    flexDirection: "row",
  },
  flagStyle: {
    width: "20%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  infoStyle: {
    width: "80%",
  },
});
