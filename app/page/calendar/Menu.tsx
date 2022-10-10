import React from "react";
import { View, StyleSheet, Image } from "react-native";
import {
  Button,
  Card,
  Icon,
  Modal,
  Text,
  Menu,
  MenuItem,
} from "@ui-kitten/components";

/**
 * Menu 组件
 */
export default function MenuComp() {
  const [menuVisible, setMenuVisible] = React.useState(false);

  return (
    <View style={styles.headerStyle}>
      <Button
        appearance="ghost"
        accessoryRight={<Icon name="menu-2-outline" style={styles.iconStyle} />}
        onPress={() => setMenuVisible(true)}
      />

      <Modal
        style={{ width: "80%" }}
        visible={menuVisible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setMenuVisible(false)}
      >
        <Card
          disabled={true}
          header={
            <View style={styles.cardHeaderStyle}>
              <Image
                source={require("../../assets/avatar.png")}
                style={{ width: 40, height: 40, marginBottom: 10 }}
              />
              <Text category="h6">未登录</Text>
            </View>
          }
        >
          <View>
            <Menu>
              <MenuItem
                title="设置"
                accessoryLeft={
                  <Icon name="settings" style={styles.iconStyle} />
                }
              />
              <MenuItem
                title="同步至 Web 端"
                accessoryLeft={
                  <Icon name="cloud-upload" style={styles.iconStyle} />
                }
              />
            </Menu>
          </View>
        </Card>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  headerStyle: {
    flexDirection: "row",
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  iconStyle: {
    width: 30,
    height: 30,
  },
  cardHeaderStyle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
