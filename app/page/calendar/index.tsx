import React from "react";
import { StyleSheet, View } from "react-native";
import {
  Button,
  Icon,
  Layout,
  MenuItem,
  Modal,
  OverflowMenu,
  Text,
} from "@ui-kitten/components";
import Calendar from "./Calendar";
/**
 * 日历 page
 */
export default function CalendarPage() {
  const [menuVisible, setMenuVisible] = React.useState(false);

  return (
    <Layout style={styles.container}>
      {/* more 菜单组件 */}
      <View style={styles.headerStyle}>
        <Button
          appearance="ghost"
          accessoryRight={
            <Icon name="menu-2-outline" style={{ width: 30, height: 30 }} />
          }
          onPress={() => setMenuVisible(true)}
        />

        <Modal
          visible={menuVisible}
          backdropStyle={styles.backdrop}
          onBackdropPress={() => setMenuVisible(false)}
        >
          <Text>Welcome to UI Kitten 😻</Text>
        </Modal>
      </View>

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
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
