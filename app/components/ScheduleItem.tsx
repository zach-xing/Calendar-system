import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Icon, Text, Button } from "@rneui/themed";
import { ISchedule } from "../types";
import { isDateToday } from "../utils/shared";
import dayjs from "dayjs";
import { useRouter } from "expo-router";
import { ListItem } from "@rneui/base";
import { deleteSchedule } from "../api/schedule";
import { Toast } from "react-native-toast-message/lib/src/Toast";

interface IProps {
  data: ISchedule;
  deletedCallback?: Function;
}

/**
 * 现实 schedule 列表的 item
 */
const ScheduleItem: React.FC<IProps> = (props) => {
  const { data } = props;
  const router = useRouter();

  const handleOpenSchedule = React.useCallback(() => {
    router.push(`/schedule/operate?data=${JSON.stringify(data)}`);
  }, [data]);

  const handleDeleteSchedule = React.useCallback(async () => {
    try {
      await deleteSchedule(data.id);
      Toast.show({
        type: "success",
        text1: "删除成功",
      });
      props.deletedCallback && props.deletedCallback();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "删除失败",
      });
    }
  }, []);

  return (
    <ListItem.Swipeable
      rightContent={() => (
        <Button
          title='Delete'
          onPress={handleDeleteSchedule}
          icon={{ name: "delete", color: "white" }}
          buttonStyle={{ minHeight: "100%", backgroundColor: "red" }}
        />
      )}
    >
      {/* 信息展示 */}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignContent: "flex-start",
          width: "100%",
        }}
      >
        <Icon name='adjust' size={16} color='#00adf5' />
        <View style={{ paddingLeft: 20, width: "100%" }}>
          <TouchableOpacity onPress={handleOpenSchedule}>
            <Text style={styles.timeTips}>
              {data.isFullDay
                ? `全天 ${dayjs(data.startTime).format("MM-DD")}`
                : `${dayjs(data.startTime).format("MM-DD HH:mm")} - ${dayjs(
                    data.endTime
                  ).format("MM-DD HH:mm")}`}
            </Text>
            <Text style={styles.title}>{data.title}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ListItem.Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0,
    paddingTop: 20,
    paddingBottom: 20,
    margin: 0,
    marginBottom: 10,
    backgroundColor: "transparent",
  },
  timeTips: {
    color: "#7d8091",
    fontSize: 14,
    fontFamily: "monospace",
  },
  title: {
    fontSize: 16,
    color: "#3c364e",
    paddingTop: 8,
    paddingBottom: 8,
    width: "95%",
  },
});

export default ScheduleItem;
