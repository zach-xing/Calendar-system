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
import Toast from "react-native-toast-message";

/**
 * Menu 组件
 */
export default function MenuComp({ navigation }) {
  const [menuVisible, setMenuVisible] = React.useState(false);

  // 点击 “设置”
  const pressSetting = () => {
    setMenuVisible(false);
    navigation.navigate("setting");
  };

  // 点击 “同步...”
  const pressSync = () => {
    setMenuVisible(false);
    // TODO: 这里就是发送请求至后端
    Toast.show({
      type: "success",
      text1: "同步成功",
    });
  };

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
                source={require("../../../assets/avatar.png")}
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
                onPress={pressSetting}
              />
              <MenuItem
                title="同步至 Web 端"
                accessoryLeft={
                  <Icon name="cloud-upload" style={styles.iconStyle} />
                }
                onPress={pressSync}
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
