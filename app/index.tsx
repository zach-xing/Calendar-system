import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "@rneui/base";
import { Link } from "expo-router";

export default function CalendarPage() {
  return (
    <View style={styles.container}>
      <Text>sdfsdf</Text>
      <Text>sdfsdf</Text>
      <Text>sdfsdf</Text>
      <Text>sdfsdf</Text>
      <Link href='/'>Home</Link>
      <View style={{ width: 100, height: 100, backgroundColor: "pink" }}></View>
      <Link href='/schedule'>schedule</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    minHeight: "100%",
  },
});
