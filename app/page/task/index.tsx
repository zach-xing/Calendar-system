import React from "react";
import { Layout, Text } from "@ui-kitten/components";

/**
 * 创建 page
 */
export default function Task() {
  return (
    <Layout
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text category="h1">Task</Text>
    </Layout>
  );
}
