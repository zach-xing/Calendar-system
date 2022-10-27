import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Icon, Layout, Menu, MenuItem, Text } from "@ui-kitten/components";
import { useLinkTo } from "@react-navigation/native";
import storage from "../../../utils/storage";
import Toast from "react-native-toast-message";

const ForwardIcon = () => (
  <Icon name="chevron-right" style={{ width: 24, height: 24 }} fill="black" />
);

/**
 * 创建 page
 */
export default function Person() {
  const linkTo = useLinkTo();
  const [isLogin, setIsLogin] = React.useState(false);
  const [user, setUser] = React.useState<RNType.User>(undefined);

  React.useEffect(() => {
    storage
      .load({
        key: "user",
      })
      .then((res) => {
        setIsLogin(true);
        setUser(res);
      })
      .catch(() => {
        Toast.show({
          type: "error",
          text1: "登录失效",
        });
      });
  }, []);

  const onPressUserName = () => {
    if (!isLogin) {
      linkTo("/login-or-register");
    }
  };

  // 退出登录
  const pressLogout = async () => {
    try {
      await storage.remove({
        key: "user",
        id: "user",
      });
      Toast.show({
        type: "success",
        text1: "退出成功",
      });
      linkTo("/login-or-register");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "退出失败",
      });
    }
  };

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
        <Text category="h5" style={{ marginTop: 5 }} onPress={onPressUserName}>
          {isLogin ? user?.name : "未登录"}
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
            title="关于"
            accessoryLeft={
              <Icon
                name="info"
                style={{ width: 24, height: 24 }}
                fill="black"
              />
            }
          />
          {isLogin && (
            <MenuItem
              title="退出登录"
              accessoryLeft={
                <Icon
                  name="alert-triangle-outline"
                  style={{ width: 24, height: 24 }}
                  fill="red"
                />
              }
              onPress={pressLogout}
            />
          )}
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
