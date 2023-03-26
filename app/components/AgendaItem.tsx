import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { ListItem, Button } from "@rneui/base";
import { Link } from "expo-router";
import { deleteTask } from "../api/task";
import Toast from "react-native-toast-message";
import { event, REFRESH_TASK_PAGE } from "../event";

/**
 * Agenda 列表渲染的 Item
 */
export default function AgendaItem(data: any) {
  const handleDoneTask = () => {};

  const handleDeleteTask = async () => {
    try {
      console.log("delete");
      await deleteTask(data.id);
      Toast.show({
        type: "success",
        text1: "删除成功",
      });
      event.emit(REFRESH_TASK_PAGE);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "删除失败",
      });
    }
  };

  return (
    <ListItem.Swipeable
      leftContent={() => (
        <Button
          title='Done'
          onPress={handleDoneTask}
          icon={{ name: "check", color: "white" }}
          buttonStyle={{ minHeight: "100%" }}
        />
      )}
      rightContent={() => (
        <Button
          title='Delete'
          onPress={handleDeleteTask}
          icon={{ name: "delete", color: "white" }}
          buttonStyle={{ minHeight: "100%", backgroundColor: "red" }}
        />
      )}
    >
      {/* 信息展示 */}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignContent: "flex-start",
          width: "100%",
        }}
      >
        <Link href={`/task/operate?data=${JSON.stringify(data)}`} asChild>
          <TouchableOpacity
            style={[styles.item]}
            // to={{ screen: "show", params: data }}
          >
            <View>
              <Text>{data.dateString}</Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "#00adf5",
                }}
              >
                {data.title}
              </Text>
            </View>
          </TouchableOpacity>
        </Link>
      </View>
    </ListItem.Swipeable>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "white",
    flex: 1,
    padding: 5,
    width: "100%",
    paddingLeft: 20,
  },
  timeStyle: {
    fontSize: 12,
    fontWeight: "bold",
  },
});
