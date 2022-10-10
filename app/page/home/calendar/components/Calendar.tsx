import React from "react";
import { StyleSheet, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { Card, List, Text } from "@ui-kitten/components";
import ListItem from "./ListItem";

const data = new Array(8).fill({
  title: "Item",
});

/**
 * 自定义日历组件
 */
export default function CalendarCustomComp() {
  const [selectedDay, setSelectedDay] = React.useState(
    new Date().toISOString().slice(0, 10)
  );

  return (
    <>
      <Calendar
        style={styles.calendarStyle}
        markedDates={{
          [selectedDay]: { selected: true },
        }}
        monthFormat={"yyyy-MM"}
        enableSwipeMonths={true}
        onDayPress={(day) => {
          setSelectedDay(day.dateString);
        }}
      />

      <View>
        <Text category="h5">{selectedDay}</Text>
        <List
          style={styles.listStyle}
          contentContainerStyle={styles.listContentContainer}
          data={data}
          renderItem={ListItem}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  calendarStyle: {
    marginBottom: 10,
  },
  listStyle: {
    maxHeight: "58%",
    backgroundColor: 'white'
  },
  listContentContainer: {
    // paddingHorizontal: 8,
    // paddingVertical: 4,
  },
});
