import { View, StyleSheet } from "react-native";
import React from "react";
import { Button, Card, Layout, Text } from "@ui-kitten/components";

const Footer = (props) => (
  <View {...props}>
    <Button size="small" status="basic">
      CANCEL
    </Button>
    <Button size="small">ACCEPT</Button>
  </View>
);

/**
 * 日程 comp
 */
export default function Schedule() {
  return (
    <Layout style={styles.container}>
      <Card footer={Footer}>
        <Text>
          The Maldives, officially the Republic of Maldives, is a small country
          in South Asia, located in the Arabian Sea of the Indian Ocean. It lies
          southwest of Sri Lanka and India, about 1,000 kilometres (620 mi) from
          the Asian continent
        </Text>
      </Card>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
