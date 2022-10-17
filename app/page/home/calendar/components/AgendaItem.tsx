import { Alert, StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import dayjs from "dayjs";

/**
 * Agenda 列表渲染的 Item
 */
export default function AgendaItem(data, isFirst: boolean) {
  const fontSize = isFirst ? 16 : 14;
  const color = isFirst ? "black" : "#43515c";

  return (
    <TouchableOpacity
      style={[styles.item]}
      onPress={() => Alert.alert(data.title)}
    >
      <Text>{data.dateString}</Text>
      <Text
        style={{
          fontSize,
          color: data.category === "schedule" ? "blue" : "green",
        }}
      >
        {data.title}
      </Text>
      {data.category === "schedule" && (
        <>
          {data.isFullDay ? (
            <Text style={styles.timeStyle}>全天</Text>
          ) : (
            <Text style={styles.timeStyle}>
              {data.startTime.slice(-5)} - {data.endTime.slice(-5)}
            </Text>
          )}
        </>
      )}
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
