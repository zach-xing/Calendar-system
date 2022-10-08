import React from "react";
import { StyleSheet, View } from "react-native";
import { Calendar } from "react-native-calendars";

/**
 * 自定义日历组件
 */
export default function CalendarCustomComp() {
  const [selectedDay, setSelectedDay] = React.useState(
    new Date().toISOString().slice(0, 10)
  );

  return (
    <Calendar
      markedDates={{
        [selectedDay]: { selected: true },
      }}
      monthFormat={"yyyy-MM"}
      enableSwipeMonths={true}
      onDayPress={(day) => {
        setSelectedDay(day.dateString);
      }}
    />
  );
}

const styles = StyleSheet.create({
  dayContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    aspectRatio: 1,
  },
  value: {
    fontSize: 12,
    fontWeight: "400",
  },
});
