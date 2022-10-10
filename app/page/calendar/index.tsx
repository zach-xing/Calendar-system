import React from "react";
import { StyleSheet } from "react-native";
import { Layout } from "@ui-kitten/components";
import Calendar from "./Calendar";
import Menu from "./Menu";
/**
 * 日历 page
 */
export default function CalendarPage() {
  return (
    <Layout style={styles.container}>
      {/* more 菜单组件 */}
      <Menu />

      {/* 日历组件 */}
      <Calendar />
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    marginLeft: 5,
    marginRight: 5,
  },
  headerStyle: {
    flexDirection: "row",
  },
});
