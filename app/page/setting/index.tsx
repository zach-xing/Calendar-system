import { StyleSheet, View } from "react-native";
import React from "react";
import { Icon, Button, Menu, MenuItem, Layout } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import storage from "../../utils/storage";

const ForwardIcon = () => (
  <Icon name="chevron-right" style={{ width: 24, height: 24 }} fill="black" />
);

/**
 * 设置页面
 */
export default function Setting() {
  const navigation = useNavigation();

  React.useEffect(() => {
    storage
      .load({ key: "settings" })
      .then((res) => {
        console.log("exist true");
      })
      .catch((err) => {
        // 若不存在 setttings，则初始化
        storage.save({
          key: "settings",
          data: {
            calendarView: "calendar",
            remindTime: "10 min",
            alldayRemindTime: "9:00",
          },
        });
      });
  }, []);

  const tmpPress = async () => {
    const data = await storage.load({
      key: "settings",
    });
    console.log(data);
  };

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
      <Menu>
        <MenuItem
          title="目前日历视图"
          accessoryRight={ForwardIcon}
          onPress={tmpPress}
        />
        <MenuItem title="默认提醒时间" accessoryRight={ForwardIcon} />
        <MenuItem title="全天时间默认提醒时间" accessoryRight={ForwardIcon} />
      </Menu>
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
});
