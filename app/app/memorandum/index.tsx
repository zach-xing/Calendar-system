import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Button, ListItem } from "@rneui/base";
import { useRouter } from "expo-router";
import HeaderBackButton from "../../components/HeaderBackButton";

/**
 * 事件视图
 */
export default function AgendaComp() {
  const router = useRouter();

  const handleCheckMemo = () => {
    console.log("handleCheckMemo");
    router.push("/memorandum/detail");
  };

  return (
    <>
      <HeaderBackButton />
      <View style={styles.container}>
        <ListItem.Swipeable
          rightContent={(reset) => (
            <Button
              title='Delete'
              onPress={() => reset()}
              icon={{ name: "delete", color: "white" }}
              buttonStyle={{ minHeight: "100%", backgroundColor: "red" }}
            />
          )}
        >
          <ListItem.Content>
            <TouchableOpacity onPress={handleCheckMemo}>
              <ListItem.Title>这个是标题</ListItem.Title>
            </TouchableOpacity>
            <ListItem.Subtitle
              style={{ fontSize: 12, color: "#5a5a5a", paddingTop: 3 }}
            >
              最后更新于: 2023-03-16 12:00
            </ListItem.Subtitle>
          </ListItem.Content>
        </ListItem.Swipeable>
        <ListItem.Swipeable
          rightContent={(reset) => (
            <Button
              title='Delete'
              onPress={() => reset()}
              icon={{ name: "delete", color: "white" }}
              buttonStyle={{ minHeight: "100%", backgroundColor: "red" }}
            />
          )}
        >
          <ListItem.Content>
            <TouchableOpacity onPress={handleCheckMemo}>
              <ListItem.Title>这个是标题</ListItem.Title>
            </TouchableOpacity>
            <ListItem.Subtitle
              style={{ fontSize: 12, color: "#5a5a5a", paddingTop: 3 }}
            >
              最后更新于: 2023-03-16 12:00
            </ListItem.Subtitle>
          </ListItem.Content>
        </ListItem.Swipeable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
