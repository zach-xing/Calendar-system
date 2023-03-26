import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Icon, SpeedDial, Text } from "@rneui/base";
import { useRouter } from "expo-router";
import dayjs from "dayjs";
import ScheduleItem from "../components/ScheduleItem";
import storage from "../utils/storage";

/** 展示样式块 */
const InfoBlock: React.FC<{
  goPath: string;
  title: string;
  color: string;
  icon: string;
}> = (props) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.push(props.goPath)}
      style={{
        flex: 1,
        backgroundColor: `${props.color}22`,
        borderRadius: 10,
        height: 100,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Icon name={props.icon} size={30} color={props.color} />
      <Text style={{ textAlign: "center", marginTop: 10 }}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default function Home() {
  const [userName, setUserName] = React.useState("Friend");
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const userData = await storage.load({
        key: "user",
      });
      setUserName(userData.name);
    })();
  }, []);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={{ paddingLeft: 30, paddingRight: 30 }}>
            <View>
              <Text h3 h3Style={{ fontWeight: "500", fontFamily: "monospace" }}>
                Hello! Welcome
              </Text>
              <Text h3 h3Style={{ fontFamily: "monospace" }}>
                {userName}
              </Text>
              <Text h4 h4Style={{ fontFamily: "monospace" }}>
                Have a nice day!
              </Text>
            </View>

            <View
              style={{
                marginTop: 30,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
                gap: 20,
              }}
            >
              <InfoBlock
                title={"Schedule"}
                color={"#629e6c"}
                icon={"date-range"}
                goPath='/schedule'
              />
              <InfoBlock
                title={"Task"}
                color={"#7a7fe8"}
                icon={"assignment"}
                goPath='/task'
              />
              <InfoBlock
                title={"Memo"}
                color={"#fc977e"}
                icon={"book"}
                goPath='/memorandum'
              />
            </View>
          </View>

          <View style={styles.todayBlock}>
            <Text h4 h4Style={{ margin: 10, marginLeft: 0 }}>
              Today
              <Text style={{ fontSize: 12, color: "grey" }}>
                {dayjs().format("YYYY MM-DD")}
              </Text>
            </Text>

            {/* TODO: 这里需要加 Schedule 和 task 的显示 */}
            {[1, 2, 3, 4, 5].map((item) => (
              <ScheduleItem
                key={item}
                data={{
                  id: "sdf",
                  title: "说法水电费水电费水电111",
                  isFullDay: false,
                  startTime: "2023-02-27 10:00",
                  endTime: "2023-02-27 10:00",
                  remind: 0,
                  desc: "123123131231sdgsgsdfgdgsdgsd",
                }}
                nowDateStr={""}
              />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>

      <SpeedDial
        isOpen={open}
        icon={{ name: "add", color: "#fff" }}
        openIcon={{ name: "close", color: "#fff" }}
        onOpen={() => setOpen(!open)}
        onClose={() => setOpen(!open)}
        color='#00adf5'
        style={{ paddingBottom: 50 }}
      >
        <SpeedDial.Action
          icon={{ name: "date-range", color: "#fff" }}
          title='Schedule'
          color='#00adf5'
          onPress={() => console.log("Add schedule")}
        />
        <SpeedDial.Action
          icon={{ name: "assignment", color: "#fff" }}
          title='Task'
          color='#00adf5'
          onPress={() => console.log("Add task")}
        />
        <SpeedDial.Action
          icon={{ name: "book", color: "#fff" }}
          title='Memo'
          color='#00adf5'
          onPress={() => console.log("Add Memo")}
        />
      </SpeedDial>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    minHeight: "100%",
    paddingTop: 20,
  },
  todayBlock: {
    backgroundColor: "#e9ebf599",
    marginTop: 30,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    minHeight: "100%",
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 50,
  },
});
