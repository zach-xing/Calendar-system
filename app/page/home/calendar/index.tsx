import React from "react";
import { StyleSheet } from "react-native";
import { Layout } from "@ui-kitten/components";
import Calendar from "./components/Calendar";
import Agenda from "./components/Agenda";
import { CHANGE_VIEW, event } from "../../../events";
import storage from "../../../utils/storage";

/**
 * 日历 page
 */
export default function CalendarPage() {
  const [view, setView] = React.useState<"calendar" | "event">("calendar");

  React.useEffect(() => {
    (async () => {
      const data = await storage.load({ key: "settings" });
      setView(data.calendarView);
    })();
  }, [])

  React.useEffect(() => {
    event.on(CHANGE_VIEW, changeView);
    return () => {
      event.off(CHANGE_VIEW, changeView);
    };
  }, []);

  const changeView = (v) => {
    setView(v);
  };

  return (
    <Layout style={styles.container}>
      {view === "calendar" ? <Calendar /> : <Agenda />}
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    marginLeft: 5,
    marginRight: 5,
  },
  headerStyle: {
    flexDirection: "row",
  },
});
