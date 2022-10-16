import React from "react";
import { StyleSheet } from "react-native";
import { Layout } from "@ui-kitten/components";
import Calendar from "./components/Calendar";
import Agenda from "./components/Agenda";

/**
 * 日历 page
 */
export default function CalendarPage({ navigation }) {
  return (
    <Layout style={styles.container}>
      {/* 日历组件 */}
      <Agenda />
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
