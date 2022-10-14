import React from "react";
import { Image, StyleSheet, View } from "react-native";
import {
  Icon,
  Layout,
  Menu,
  MenuItem,
  Text,
} from "@ui-kitten/components";
import { useLinkTo } from "@react-navigation/native";

const ForwardIcon = () => (
  <Icon name="chevron-right" style={{ width: 24, height: 24 }} fill="black" />
);

/**
 * 创建 page
 */
export default function Person() {
  const linkTo = useLinkTo();

  return (
    <Layout
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={styles.headerStyle}>
        <Image
          style={styles.avatar}
          source={require("../../../assets/avatar.png")}
        />
        <Text
          category="h5"
          style={{ marginTop: 5 }}
          onPress={() => linkTo("/login-or-register")}
        >
          未登录
        </Text>
      </View>

      <View style={styles.cardStyle}>
        <Menu>
          <MenuItem
            title="设置"
            accessoryLeft={
              <Icon
                name="settings"
                style={{ width: 24, height: 24 }}
                fill="black"
              />
            }
            accessoryRight={ForwardIcon}
            onPress={() => linkTo("/setting")}
          />
          <MenuItem
            title="同步至 Web 端"
            accessoryLeft={
              <Icon
                name="cloud-upload"
                style={{ width: 24, height: 24 }}
                fill="black"
              />
            }
            accessoryRight={ForwardIcon}
          />
          <MenuItem
            title="关于"
            accessoryLeft={
              <Icon
                name="info"
                style={{ width: 24, height: 24 }}
                fill="black"
              />
            }
          />
        </Menu>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  headerStyle: {
    height: "30%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: 100,
    height: 100,
  },
  cardStyle: {
    height: "70%",
    width: "100%",
  },
});
