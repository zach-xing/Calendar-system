import React from "react";
import { Layout, Text } from "@ui-kitten/components";

/**
 * 日历 page
 */
export default function Calendar() {
  return (
    <Layout
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text category="h1">Calendar</Text>
    </Layout>
  );
}
