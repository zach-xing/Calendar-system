import { Alert, StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

/**
 * Agenda 列表渲染的 Item
 */
export default function AgendaItem(reservation, isFirst: boolean) {
  const fontSize = isFirst ? 16 : 14;
  const color = isFirst ? "black" : "#43515c";

  return (
    <TouchableOpacity
      style={[styles.item]}
      onPress={() => Alert.alert(reservation.title)}
    >
      <Text style={{ fontSize, color }}>{reservation.title}</Text>
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
});
