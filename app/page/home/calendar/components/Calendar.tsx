import React from "react";
import { StyleSheet, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { List, Text } from "@ui-kitten/components";
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
      <View style={{ height: "50%" }}>
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
      </View>

      <View style={{ height: "50%" }}>
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
