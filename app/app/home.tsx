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
import { useFetchCurDayData } from "../api";
import LoadingComp from "../components/LoadingComp";
import AgendaItem from "../components/AgendaItem";

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
  const router = useRouter();
  const [userName, setUserName] = React.useState("Friend");
  const [open, setOpen] = React.useState(false);

  const [uid, setUid] = React.useState("");
  const [dateString, setDateString] = React.useState("");
  const { curDayData, isLoading } = useFetchCurDayData(uid, dateString);

  React.useEffect(() => {
    (async () => {
      const userData = await storage.load({
        key: "user",
      });
      setUid(userData.id);
      setUserName(userData.name);
      setDateString(dayjs(Date.now()).format("YYYY-MM-DD"));
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
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text h4 h4Style={{ margin: 10, marginLeft: 0 }}>
                Today
              </Text>
              <Text style={{ fontSize: 14, color: "grey", marginLeft: 3 }}>
                {dayjs().format("YYYY MM-DD")}
              </Text>
            </View>

            {isLoading ? (
              <LoadingComp />
            ) : curDayData?.scheduleList.length === 0 &&
              curDayData.taskList.length === 0 ? (
              <View>
                <Text h4 h4Style={{ fontWeight: "500" }}>
                  今天没有需要做的事项哦
                </Text>
              </View>
            ) : (
              // schedule 或者 task 有一个为空就走这个分支
              <View>
                <Text style={styles.todayTitle}>Today's Schedule</Text>
                {curDayData?.scheduleList.length !== 0 ? (
                  curDayData?.scheduleList.map((item) => (
                    <ScheduleItem key={item.id} data={item} />
                  ))
                ) : (
                  <View style={{ marginVertical: 10 }}>
                    <Text>今天没有需要进行的日程哦</Text>
                  </View>
                )}
                <Text style={styles.todayTitle}>Today's Task</Text>
                {curDayData?.taskList.length !== 0 ? (
                  curDayData?.taskList.map((item) => (
                    <AgendaItem key={item.id} {...item} />
                  ))
                ) : (
                  <View style={{ marginVertical: 10 }}>
                    <Text>今天没有需要完成的任务哦</Text>
                  </View>
                )}
              </View>
            )}
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
        style={{ paddingBottom: 30 }}
      >
        <SpeedDial.Action
          icon={{ name: "search", color: "#fff" }}
          title='Search'
          color='#00adf5'
          onPress={() => router.push("/search")}
        />
        <SpeedDial.Action
          icon={{ name: "date-range", color: "#fff" }}
          title='Schedule'
          color='#00adf5'
          onPress={() => router.push("/schedule/operate")}
        />
        <SpeedDial.Action
          icon={{ name: "assignment", color: "#fff" }}
          title='Task'
          color='#00adf5'
          onPress={() => router.push("/task/operate")}
        />
        <SpeedDial.Action
          icon={{ name: "book", color: "#fff" }}
          title='Memo'
          color='#00adf5'
          onPress={() => router.push("/memorandum/detail")}
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
    minHeight: 500,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 50,
  },
  todayTitle: {
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 5,
    marginBottom: 10,
  },
});
