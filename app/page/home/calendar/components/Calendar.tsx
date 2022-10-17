import React from "react";
import { StyleSheet, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { List, Text } from "@ui-kitten/components";
import ListItem from "./ListItem";
import storage from "../../../../utils/storage";

const schedule = { key: "schedule", color: "blue", selectedDotColor: "blue" };
const importantDay = {
  key: "importantDay",
  color: "green",
  selectedDotColor: "green",
};
const markedObj = {};

/**
 * 自定义日历组件
 */
export default function CalendarCustomComp() {
  const dateString = new Date().toISOString().slice(0, 10);
  const [selectedDay, setSelectedDay] = React.useState(dateString);
  const [selectedMouth, setSelectedMouth] = React.useState(
    dateString.slice(0, 7)
  );
  const [curData, setCurData] = React.useState([]); // 当前“月”的所有数据
  const [curEvent, setCurEvent] = React.useState([]); // 当前选中“日”的数据

  // 当月更改后
  React.useEffect(() => {
    (async () => {
      const data = await getStorageData();
      const tmpMap = new Map();
      data.map((v) => {
        const dateString = v.startTime.slice(0, 10);
        if (tmpMap.has(dateString)) {
          tmpMap.set(dateString, { dots: [schedule, importantDay] });
        } else {
          v.category === "schedule"
            ? tmpMap.set(dateString, { dots: [schedule] })
            : tmpMap.set(dateString, { dots: [importantDay] });
        }
      });
      for(const key of tmpMap.keys()) {
        markedObj[key] = tmpMap.get(key);
      }
      setCurData(data);
    })();
  }, [selectedMouth]);

  // 当选中的day发生改变时更改
  React.useEffect(() => {
    (async () => {
      const arr = curData.filter(
        (v) => v.startTime.slice(0, 10) === selectedDay
      );
      setCurEvent(arr);
    })();
  }, [curData, selectedDay]);

  // 从 storage 获取数据
  const getStorageData = async () => {
    try {
      const data = await storage.load({
        key: "event",
        id: selectedMouth,
      });
      return data;
    } catch (error) {
      return [];
    }
  };

  return (
    <>
      <View style={{ height: "50%" }}>
        <Calendar
          style={styles.calendarStyle}
          markingType={"multi-dot"}
          markedDates={{
            ...markedObj,
            [selectedDay]: { selected: true },
          }}
          monthFormat={"yyyy-MM"}
          enableSwipeMonths={true}
          onDayPress={(day) => {
            setSelectedDay(day.dateString);
          }}
          onMonthChange={(v) => {
            setSelectedMouth(v.dateString.slice(0, 7));
          }}
        />
      </View>

      <View style={{ height: "50%" }}>
        <Text category="h5">{selectedDay}</Text>
        <List
          style={styles.listStyle}
          contentContainerStyle={styles.listContentContainer}
          data={curEvent}
          renderItem={ListItem}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  calendarStyle: {
    // flex: 2,
    marginBottom: 10,
  },
  listStyle: {
    // maxHeight: "64%",
    backgroundColor: "white",
  },
  listContentContainer: {
    // paddingHorizontal: 8,
    // paddingVertical: 4,
  },
});
