import React from "react";
import { StyleSheet, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { List, Text } from "@ui-kitten/components";
import ListItem from "./ListItem";
import storage from "../../../../utils/storage";

/**
 * 自定义日历组件
 */
export default function CalendarCustomComp() {
  const [selectedDay, setSelectedDay] = React.useState(
    new Date().toISOString().slice(0, 10)
  );
  const [curEvent, setCurEvent] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      try {
        const data = await storage.load({ key: "event", id: "2022-10" });
        const arr = data.filter(
          (v) => v.startTime.slice(0, 10) === selectedDay
        );
        setCurEvent(arr);
      } catch (error) {}
    })();
  }, [selectedDay]);

  return (
    <>
      <View style={{ height: "50%" }}>
        <Calendar
          style={styles.calendarStyle}
          markedDates={{
            "2022-10-18": { marked: true, dotColor: "red" },
            [selectedDay]: { selected: true },
          }}
          monthFormat={"yyyy-MM"}
          enableSwipeMonths={true}
          onDayPress={(day) => {
            setSelectedDay(day.dateString);
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
