import { View, StyleSheet } from "react-native";
import React from "react";
import { Button, Dialog, Icon, Text, SearchBar } from "@rneui/base";
import HeaderBackButton from "../components/HeaderBackButton";
import storage from "../utils/storage";
import { useFetchSearchData } from "../api";
import LoadingComp from "../components/LoadingComp";
import ScheduleItem from "../components/ScheduleItem";
import AgendaItem from "../components/AgendaItem";

/**
 * 搜索对话框
 */
const SearchPage: React.FC = () => {
  const [uid, setUid] = React.useState("");
  const [title, setTitle] = React.useState("");

  const { searchedData, isLoading } = useFetchSearchData(uid, title);

  React.useEffect(() => {
    storage
      .load({
        key: "user",
      })
      .then((user) => {
        setUid(user.id);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const updateSearch = (search: string) => {
    setTitle(search);
  };

  return (
    <View style={styles.container}>
      <HeaderBackButton />
      <SearchBar
        lightTheme={true}
        placeholder='Type Here...'
        onChangeText={updateSearch}
        value={title}
      />

      <View style={{ paddingHorizontal: 10 }}>
        {isLoading ? (
          <LoadingComp />
        ) : searchedData?.scheduleList.length === 0 &&
          searchedData.taskList.length === 0 ? (
          <View>
            <Text
              h4
              h4Style={{
                marginTop: 10,
                fontWeight: "500",
                textAlign: "center",
              }}
            >
              没有数据
            </Text>
          </View>
        ) : (
          <View>
            <Text style={styles.title}>Schedule's Result</Text>
            {searchedData?.scheduleList.length !== 0 ? (
              searchedData?.scheduleList.map((item) => (
                <ScheduleItem key={item.id} data={item} />
              ))
            ) : (
              <View style={{ marginVertical: 10 }}>
                <Text>没有此日程哦</Text>
              </View>
            )}
            <Text style={styles.title}>Task's Result</Text>
            {searchedData?.taskList.length !== 0 ? (
              searchedData?.taskList.map((item) => (
                <AgendaItem key={item.id} {...item} />
              ))
            ) : (
              <View style={{ marginVertical: 10 }}>
                <Text>没有此任务哦</Text>
              </View>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 5,
    marginBottom: 10,
  },
});

export default SearchPage;
