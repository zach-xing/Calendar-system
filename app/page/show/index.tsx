import { View, StyleSheet } from "react-native";
import React from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Icon, Layout, Button, Text } from "@ui-kitten/components";

/**
 * 显示某个事件详情
 */
export default function ShowScreen() {
  const route = useRoute();
  const data: RNType.ScheduleType | RNType.ImportantDayType = route.params as any;
  const navigation = useNavigation();

  return (
    <Layout style={styles.container}>
      <View style={styles.headerStyle}>
        <Button
          appearance="ghost"
          accessoryLeft={
            <Icon name="arrow-ios-back" style={{ width: 40, height: 40 }} />
          }
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={styles.bodyStyle}>
        <Text category="h4">{data.title}</Text>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  headerStyle: {
    display: "flex",
    flexDirection: "row",
  },
  bodyStyle: {
    paddingHorizontal: 20,
  },
});
