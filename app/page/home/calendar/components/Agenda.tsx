import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import React from "react";
import {
  Agenda,
  DateData,
  AgendaEntry,
  AgendaSchedule,
} from "react-native-calendars";
import { Card } from "@ui-kitten/components";
import AgendaItem from "./AgendaItem";
import storage from "../../../../utils/storage";

const renderEmptyDate = () => {
  return (
    <View style={styles.emptyDate}>
      <Text>This is empty date!</Text>
    </View>
  );
};

export default function AgendaComp() {
  const dateString = new Date().toISOString().slice(0, 10);
  const [items, setItems] = React.useState<AgendaSchedule>(undefined);

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

  const rowHasChanged = (r1: AgendaEntry, r2: AgendaEntry) => {
    return r1.name !== r2.name;
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
      selected={dateString}
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
