import { View, StyleSheet, Alert } from "react-native";
import React from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import {
  Icon,
  Layout,
  Button,
  Text,
  Divider,
  Card,
  ButtonGroup,
  Modal,
} from "@ui-kitten/components";
import Toast from "react-native-toast-message";
import InfoShow from "./components/InfoShow";
import { remindArr, repeatArr } from "../../constant";
import ScheduleEdit from "../../components/Edit/ScheduleEdit";
import { removeEventById } from "../../utils/handleDate";
import storage from "../../utils/storage";
import { event, REFRESH_DATE } from "../../events";
import ImportantDayEdit from "../../components/Edit/ImportantDayEdit";
import { removeEvent as requsetRemoveEvent } from "../../data/events";

/**
 * 显示某个事件详情
 */
export default function ShowScreen() {
  const route = useRoute();
  const data: any = route.params as any;
  const navigation = useNavigation();
  const [visible, setVisible] = React.useState(false);

  const openEditModal = () => {
    setVisible(true);
  };

  const removeAlert = () => {
    Alert.alert("确定删除？", "", [
      {
        text: "取消",
        style: "cancel",
      },
      {
        text: "确认",
        onPress: removeEvent,
      },
    ]);
  };

  // 删除某个事件
  const removeEvent = async () => {
    try {
      const user = await storage.load({
        key: "user",
      });
      console.log(user.id, data.dateString.slice(0, 7), data.id);
      
      await requsetRemoveEvent(user.id, data.dateString.slice(0, 7), data.id);
      event.emit(REFRESH_DATE, undefined);
      navigation.goBack();
      Toast.show({
        type: "success",
        text1: "删除成功",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "删除失败",
      });
    }
  };

  // 从 storage 获取数据，返回值长度肯定大于等于 1
  const getStorageData = async () => {
    try {
      const list = await storage.load({
        key: "event",
        id: data.dateString.slice(0, 7),
      });
      return list;
    } catch (error) {
      return [];
    }
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
      <View style={styles.bodyStyle}>
        <Text category="h4">{data.title}</Text>
        <View style={{ paddingVertical: 10 }}>
          {data.category === "schedule" ? (
            <>
              {data.isFullDay ? (
                <>
                  {data.startTime.slice(0, 10) !== data.dateString ? (
                    <Text>
                      {data.startTime} - {data?.endTime}
                    </Text>
                  ) : (
                    <Text>全天 - {data.dateString}</Text>
                  )}
                </>
              ) : (
                <Text>
                  {data.startTime} - {data?.endTime}
                </Text>
              )}
            </>
          ) : (
            <Text>{data.dateString}</Text>
          )}
        </View>
        <Divider />
        {(data as RNType.ImportantDayType).repeat !== undefined ? (
          <InfoShow
            iconName={"repeat"}
            text={repeatArr[(data as RNType.ImportantDayType).repeat].value}
          />
        ) : null}
        <InfoShow iconName={"bell"} text={remindArr[data.remind].value} />

        {data?.desc && (
          <Card
            style={{ marginTop: 20 }}
            header={() => <Text>描述</Text>}
            appearance="filled"
          >
            <Text>{data.desc}</Text>
          </Card>
        )}
      </View>

      <ButtonGroup style={styles.buttonGroup} appearance="ghost">
        <Button onPress={openEditModal}>编辑</Button>
        <Button onPress={removeAlert}>删除</Button>
      </ButtonGroup>

      <Modal visible={visible} onBackdropPress={() => setVisible(false)}>
        {data.category === "schedule" ? (
          <ScheduleEdit
            data={data as RNType.ScheduleType}
            goBack={() => navigation.goBack()}
          />
        ) : (
          <ImportantDayEdit
            data={data as RNType.ImportantDayType}
            goBack={() => navigation.goBack()}
          />
        )}
      </Modal>
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
  icon: {
    width: 30,
    height: 30,
  },
  listStyle: {
    display: "flex",
    flexDirection: "row",
  },
  buttonGroup: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    paddingHorizontal: 20,
    paddingBottom: 10,
    display: "flex",
    justifyContent: "center",
  },
});
