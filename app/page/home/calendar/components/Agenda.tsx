import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Agenda, DateData, AgendaSchedule } from "react-native-calendars";
import AgendaItem from "./AgendaItem";
import storage from "../../../../utils/storage";
import { event, REFRESH_DATE } from "../../../../events";

const renderEmptyDate = () => {
  return (
    <View style={styles.emptyDate}>
      <Text>This is empty date!</Text>
    </View>
  );
};


/**
 * 事件视图
 */
export default function AgendaComp() {
  const [items, setItems] = React.useState<AgendaSchedule>(undefined);
  const [selectedDateString, setSelectedDateString] = React.useState(
    new Date().toISOString().slice(0, 10)
  );

  const loadMonthItems = async (day: DateData) => {
    const storageArr = await getStorageData(day.dateString.slice(0, 7));

    const newItems = {};
    storageArr.forEach((item) => {
      if (newItems.hasOwnProperty(item.dateString)) {
        newItems[item.dateString].push({ ...item });
      } else {
        newItems[item.dateString] = [{ ...item }];
      }
    });
    setItems(newItems);
  };

  const rowHasChanged = (r1: any, r2: any) => {
    return r1.id !== r2.id;
  };

  const getStorageData = async (month: string) => {
    try {
      const data = await storage.load({
        key: "event",
        id: month,
      });
      return data;
    } catch (error) {
      return [];
    }
  };

  return (
    <Agenda
      items={items}
      loadItemsForMonth={loadMonthItems}
      selected={selectedDateString}
      renderItem={AgendaItem}
      renderEmptyDate={renderEmptyDate}
      rowHasChanged={rowHasChanged}
      showClosingKnob={true}
    />
  );
}

const styles = StyleSheet.create({
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
});
