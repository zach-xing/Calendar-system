import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Agenda, DateData, AgendaSchedule } from "react-native-calendars";
import AgendaItem from "../components/AgendaItem";
import storage from "../utils/storage";
import HeaderBackButton from "../components/HeaderBackButton";

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
  const [items, setItems] = React.useState<AgendaSchedule>({});
  const [selectedDateString, setSelectedDateString] = React.useState(
    new Date().toISOString().slice(0, 10)
  );

  const loadMonthItems = async (day: DateData) => {
    const user = await storage.load({
      key: "user",
    });

    // const arr = await fetchEventList(day.dateString.slice(0, 7), user.id);

    const newItems = {
      "2023-03-15": [
        {
          name: "name",
          height: 50,
          day: "day",
          title: "这里是title",
          dateString: "2023-3-15",
        },
      ],
    };
    // arr.forEach((item) => {
    //   if (newItems.hasOwnProperty(item.dateString)) {
    //     newItems[item.dateString].push({ ...item });
    //   } else {
    //     newItems[item.dateString] = [{ ...item }];
    //   }
    // });
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
    <>
      <HeaderBackButton />
      <Agenda
        items={items}
        loadItemsForMonth={loadMonthItems}
        selected={selectedDateString}
        renderItem={AgendaItem}
        renderEmptyDate={renderEmptyDate}
        rowHasChanged={rowHasChanged}
        showClosingKnob={true}
      />
    </>
  );
}

const styles = StyleSheet.create({
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
});
