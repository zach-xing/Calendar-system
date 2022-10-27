import { StyleSheet, View } from "react-native";
import React from "react";
import {
  Icon,
  Button,
  Menu,
  MenuItem,
  Layout,
  Select,
  SelectItem,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import storage from "../../utils/storage";
import { CHANGE_VIEW, event } from "../../events";
import { remindArr, repeatArr } from "../../constant";

const ForwardIcon = () => (
  <Icon name="chevron-right" style={{ width: 24, height: 24 }} fill="black" />
);

/**
 * 设置页面
 */
export default function Setting() {
  const navigation = useNavigation();
  const [curSettings, setCurSettings] = React.useState<RNType.SettingsType>();

  React.useEffect(() => {
    (async () => {
      const data = await storage.load({ key: "settings" });
      setCurSettings(data);
    })();
  }, []);

  // 选择默认的视图
  const selectView = (res) => {
    setCurSettings((prev) => ({
      ...prev,
      calendarView: res.row === 0 ? "calendar" : "event",
    }));
  };

  const saveSettings = async () => {
    storage.save({ key: "settings", data: curSettings });
    event.emit(CHANGE_VIEW, curSettings.calendarView);
    navigation.goBack();
  };

  return (
    <Layout style={styles.container}>
      <View style={styles.headerStyle}>
        <Button
          appearance="ghost"
          accessoryLeft={
            <Icon name="arrow-ios-back" style={{ width: 40, height: 40 }} />
          }
          onPress={saveSettings}
        />
      </View>
      <Menu>
        <MenuItem
          title="目前日历视图"
          accessoryRight={() => (
            <Select
              style={{ width: "40%" }}
              value={
                curSettings?.calendarView === "calendar"
                  ? "日历视图"
                  : "事件视图"
              }
              size="small"
              onSelect={selectView}
            >
              <SelectItem title="日历视图" />
              <SelectItem title="事件视图" />
            </Select>
          )}
        />
        {/* <MenuItem
          title="默认提醒时间"
          accessoryRight={() => (
            <Select
              style={{ width: "40%" }}
              value={remindArr[curSettings?.remind || 0].value}
              size="small"
              onSelect={selectRemind}
            >
              {remindArr.map((item) => (
                <SelectItem key={item.id} title={item.value} />
              ))}
            </Select>
          )}
        />
        <MenuItem
          title="全天时间默认提醒时间"
          accessoryRight={() => (
            <Select
              style={{ width: "40%" }}
              value={repeatArr[curSettings?.repeat || 0].value}
              size="small"
              onSelect={selectRepeat}
            >
              {remindArr.map((item) => (
                <SelectItem key={item.id} title={item.value} />
              ))}
            </Select>
          )}
        /> */}
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
