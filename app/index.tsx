import React from "react";
import { StyleSheet, View } from "react-native";
import { Link, Stack } from "expo-router";
import Toast from "react-native-toast-message";
import { Button, Icon, ListItem } from "@rneui/base";
import { Calendar } from "react-native-calendars";
import type { DateData } from "react-native-calendars";
import { SpeedDial, Text } from "@rneui/themed";
import dayjs from "dayjs";

export default function CalendarPage() {
  const [open, setOpen] = React.useState(false);
  const [list, setList] = React.useState([{}]);
  const [curDateString, setCurDateString] = React.useState<string>();

  React.useEffect(() => {
    setCurDateString(dayjs(Date.now()).format("YYYY-MM-DD"));
  }, []);

  const handlePressDay = (val: DateData) => {
    // console.log(JSON.stringify(val, null, 2));
    // console.log(new Date(val.dateString));
  };

  const handleMonthChange = (val: DateData) => {
    console.log("handleMonthChange", val);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text h4>{dayjs(curDateString).format("MMM DD")}</Text>
      </View>
      <View style={styles.headerDivision} />
      <Calendar
        // items={arr}
        // renderItem={AgendaItem}
        // style={styles.info}
        initialDate={curDateString}
        monthFormat={"MM-dd"}
        markingType={"dot"}
        enableSwipeMonths={true}
        hideExtraDays={true}
        onDayPress={handlePressDay}
        onMonthChange={handleMonthChange}
      />

      <View style={styles.info}>
        <Text
          h3
          h3Style={{
            padding: 5,
            paddingLeft: 10,
            fontWeight: "600",
            color: "#4b4e6d",
          }}
        >
          Schedule
        </Text>
      </View>

      <SpeedDial
        isOpen={open}
        icon={{ name: "menu", color: "#fff" }}
        openIcon={{ name: "close", color: "#fff" }}
        onOpen={() => setOpen(!open)}
        onClose={() => setOpen(!open)}
        color='#00adf5'
      >
        <SpeedDial.Action
          icon={{ name: "add", color: "#fff" }}
          title='Create'
          color='#00adf5'
          onPress={() => console.log("Add Something")}
        />
        <SpeedDial.Action
          icon={{ name: "settings", color: "#fff" }}
          title='Setting'
          color='#00adf5'
          onPress={() => console.log("Delete Something")}
        />
      </SpeedDial>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#edf1f3",
  },
  header: {
    padding: 10,
  },
  headerDivision: {
    backgroundColor: "white",
    height: 20,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
  },
  info: {
    backgroundColor: "white",
    minHeight: "100%",
  },
});
