import { Icon, Text } from "@ui-kitten/components";
import React from "react";
import { View, StyleSheet } from "react-native";
import { remindArr } from "../../../../constant";

/**
 * 列表渲染的 Item
 */
export default function ListItem(info: any) {
  const data = info.item;

  return (
    <View
      style={{
        marginVertical: 5,
        marginHorizontal: 3,
        padding: 5,
      }}
    >
      <View style={styles.containerStyle}>
        <View style={styles.flagStyle}>
          {data.category === "schedule" ? (
            <>
              {data?.isFullDay ? (
                <Text>全天</Text>
              ) : (
                <View>
                  <Text style={{ fontSize: 16, color: "black" }}>
                    {data.dateString === data.startTime.slice(0, 10)
                      ? data.startTime.slice(-5)
                      : "结束"}
                  </Text>
                  <Text style={{ fontSize: 12, color: "grey" }}>
                    {data.dateString === data.endTime.slice(0, 10)
                      ? data.endTime.slice(-5)
                      : "开始"}
                  </Text>
                </View>
              )}
            </>
          ) : (
            <Icon style={styles.icon} fill="green" name="star" />
          )}
        </View>

        <View
          style={{
            ...styles.dttt,
            backgroundColor: data.category === "schedule" ? "blue" : "green",
          }}
        />

        {/* 事件的信息展示 */}
        <View style={styles.infoStyle}>
          <Text
            category="h6"
            style={{
              marginVertical: 5,
              color: data.category === "schedule" ? "blue" : "green",
            }}
          >
            {data.title}
          </Text>
          {data?.desc ? (
            <Text numberOfLines={1} style={styles.descStyle}>
              {data?.desc}
            </Text>
          ) : (
            <Text numberOfLines={1} style={styles.descStyle}>
              提醒: {remindArr[data.remind].value}
            </Text>
          )}
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
  descStyle: {
    fontSize: 14,
  },
  icon: {
    width: 26,
    height: 26,
  },
});
