import { View, Text, StyleSheet } from "react-native";
import React, { useCallback } from "react";
import { Agenda, DateData, AgendaSchedule } from "react-native-calendars";
import dayjs from "dayjs";
import AgendaItem from "../../components/AgendaItem";
import storage from "../../utils/storage";
import HeaderBackButton from "../../components/HeaderBackButton";
import { SpeedDial } from "@rneui/base";
import { fetchTask } from "../../api/task";
import { ITask } from "../../types/task";
import { useRouter } from "expo-router";
import { event, REFRESH_TASK_PAGE } from "../../event";

const renderEmptyDate = () => {
  return (
    <View style={styles.emptyDate}>
      <Text>This is empty date!</Text>
    </View>
  );
};

/**
 * 根据当月获取数据
 */
const getAgedaDataWithMonth = (
  dateString: string,
  list: ITask[]
): AgendaSchedule => {
  const res: AgendaSchedule = {};
  list.forEach((item) => {
    const key = dayjs(item.time).format("YYYY-MM-DD");
    const newObj = {
      name: item.title,
      height: 50,
      day: "day",
      dateString: key,
      ...item,
    };
    Array.isArray(res[key]) ? res[key].push(newObj) : (res[key] = [newObj]);
  });
  const preDateStr = dayjs(dateString).format("YYYY-MM-"); // 之后直接在后面加个 day
  // 补齐
  for (let day = 1; day <= 31; day++) {
    let newKey = `${preDateStr}${day < 10 ? "0" + day : day}`;
    if (!res[newKey]) {
      res[newKey] = [];
    }
  }
  return res;
};

/**
 * task 视图
 */
export default function AgendaComp() {
  const router = useRouter();

  const [items, setItems] = React.useState<AgendaSchedule>({});

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    event.on(REFRESH_TASK_PAGE, refreshPage);
    return () => {
      event.off(REFRESH_TASK_PAGE);
    };
  }, []);

  const refreshPage = () => {
    router.replace("/task");
  };

  const loadMonthItems = async (day: DateData) => {
    console.log('load', day)
    const user = await storage.load({
      key: "user",
    });
    const data = await fetchTask(user.id, day.dateString.slice(0, 7));
    setItems(getAgedaDataWithMonth(day.dateString.slice(0, 7), data.list));
  };

  const rowHasChanged = (r1: any, r2: any) => {
    return r1.id !== r2.id;
  };

  const linkToCreate = useCallback(() => {
    router.push(`/task/operate`);
  }, []);

  return (
    <>
      <HeaderBackButton />
      <Agenda
        items={items}
        loadItemsForMonth={loadMonthItems}
        selected={dayjs(Date.now()).format("YYYY-MM-DD")}
        renderItem={AgendaItem}
        renderEmptyDate={renderEmptyDate}
        rowHasChanged={rowHasChanged}
        showClosingKnob={true}
      />

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
          onPress={linkToCreate}
        />
        <></>
      </SpeedDial>
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
