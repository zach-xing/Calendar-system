import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "@rneui/themed";
import { ISchedule } from "../types";

interface IProps {
  data: ISchedule;
  nowDateStr: string;
}

/**
 * 现实 schedule 列表的 item
 */
const ScheduleItem: React.FC<IProps> = (props) => {
  const { data } = props;
  // console.log("ScheduleItem", JSON.stringify(data, null, 2));

  return (
    <View style={styles.container}>
      <Text>sdf</Text>
      <Text>{data.id}</Text>
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
    backgroundColor: "lightblue",
  },
});

export default ScheduleItem;
