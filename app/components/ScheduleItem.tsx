import React from "react";
import { StyleSheet, View } from "react-native";
import { Icon, Text, Button } from "@rneui/themed";
import { ISchedule } from "../types";
import { isDateToday } from "../utils/shared";
import dayjs from "dayjs";
import { useRouter } from "expo-router";
import ConfirmDeleteButton from "./ConfirmDeleteButton";

interface IProps {
  data: ISchedule;
  nowDateStr: string;
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

  return (
    <View style={styles.container}>
      {/* 信息展示 */}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignContent: "flex-start",
        }}
      >
        <Icon name='adjust' size={16} color='#00adf5' />
        <View style={{ paddingLeft: 20 }}>
          <Text style={styles.timeTips}>
            {/* TODO: 需要考虑多天的情况 */}
            {isDateToday(data.startTime)
              ? "Today"
              : data.isFullDay
              ? "全天"
              : dayjs(data.startTime).format("MM-DD")}
            {","}
            {dayjs(data.startTime).format("HH:mm")}
            {" - "}
            {dayjs(data.endTime).format("HH:mm")}
          </Text>
          <Text style={styles.title}>{data.title}</Text>

          {/* 操作 */}
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              width: "95%",
            }}
          >
            <ConfirmDeleteButton
              children={
                <Button
                  type='outline'
                  title='删除'
                  radius='15'
                  color='warning'
                  buttonStyle={{
                    paddingLeft: 15,
                    paddingRight: 15,
                  }}
                />
              }
              onConfirm={() => console.log("delete")}
            />
            <Button
              title='详情'
              radius='15'
              buttonStyle={{
                paddingLeft: 15,
                paddingRight: 15,
                marginLeft: 35,
              }}
              onPress={handleOpenSchedule}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0,
    paddingTop: 20,
    paddingBottom: 20,
    margin: 0,
    marginBottom: 10,
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
