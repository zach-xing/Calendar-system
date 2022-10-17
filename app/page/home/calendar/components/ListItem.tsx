import { Text } from "@ui-kitten/components";
import React from "react";
import { View, StyleSheet } from "react-native";

/**
 * 列表渲染的 Item
 */
export default function ListItem(info: any) {
  const data = info.item;
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
          {data?.isFullDay ? (
            <Text>全天</Text>
          ) : (
            <View>
              <Text style={{ fontSize: 16, color: "black" }}>
                {data.startTime.slice(-5)}
              </Text>
              <Text style={{ fontSize: 12, color: "grey" }}>
                {data.endTime.slice(-5)}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.dttt} />

        {/* 事件的信息展示 */}
        <View style={styles.infoStyle}>
          <Text category="h6" style={{ marginVertical: 5, color: "blue" }}>
            {data.title}
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
    width: "18%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  dttt: {
    width: "1%",
    marginRight: 5,
    borderRadius: 10,
    backgroundColor: "blue",
  },
  infoStyle: {
    width: "80%",
  },
});
