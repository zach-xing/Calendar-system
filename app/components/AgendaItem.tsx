import { Alert, StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import dayjs from "dayjs";

/**
 * Agenda 列表渲染的 Item
 */
export default function AgendaItem(data: any, isFirst: boolean) {
  const fontSize = isFirst ? 16 : 14;

  return (
    <TouchableOpacity
      style={[styles.item]}
      // to={{ screen: "show", params: data }}
    >
      <Text>{data.dateString}</Text>
      <Text
        style={{
          fontSize,
          color: "#00adf5",
        }}
      >
        {data.title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  timeStyle: {
    fontSize: 12,
    fontWeight: "bold",
  },
});
