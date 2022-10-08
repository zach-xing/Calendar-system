import React from "react";
import { StyleSheet } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import Calendar from "./Calendar";
/**
 * 日历 page
 */
export default function CalendarPage() {
  return (
    <Layout style={styles.container}>
      <Calendar />
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
});
