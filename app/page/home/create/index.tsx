import React from "react";
import { Layout, Tab, TabBar } from "@ui-kitten/components";
import Schedule from "./Schedule";

/**
 * 创建 page
 */
export default function Create() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <Layout
      style={{
        flex: 1,
        padding: 10,
      }}
    >
      <TabBar
        selectedIndex={selectedIndex}
        onSelect={(index) => setSelectedIndex(index)}
      >
        <Tab title="日程">
          <Schedule />
        </Tab>
        <Tab title="重要日" />
        <Tab title="任务" />
      </TabBar>
    </Layout>
  );
}
