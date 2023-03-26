import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Button, ListItem, SpeedDial } from "@rneui/base";
import { useRouter } from "expo-router";
import HeaderBackButton from "../../components/HeaderBackButton";
import { useFetchMemo } from "../../api";
import LoadingComp from "../../components/LoadingComp";
import EmptyListComponent from "../../components/EmptyComp";
import storage from "../../utils/storage";

/**
 * 备忘录视图
 */
export default function AgendaComp() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [uid, setUid] = React.useState("");
  const { memoList, isLoading } = useFetchMemo(uid);
  console.log(memoList);

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

  const handleCheckMemo = (data: any) => {
    console.log("handleCheckMemo");
    router.push(`/memorandum/detail?data=${JSON.stringify(data)}`);
  };

  const linkToCreate = () => {
    router.push("/memorandum/detail");
  };

  return (
    <>
      <HeaderBackButton />
      <View style={styles.container}>
        {isLoading ? (
          <LoadingComp />
        ) : memoList?.length === 0 ? (
          <EmptyListComponent />
        ) : (
          memoList?.map((item) => (
            <ListItem.Swipeable
              key={item.id}
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
                <TouchableOpacity onPress={() => handleCheckMemo(item)}>
                  <ListItem.Title>{item.title}</ListItem.Title>
                </TouchableOpacity>
                <ListItem.Subtitle
                  style={{ fontSize: 12, color: "#5a5a5a", paddingTop: 3 }}
                >
                  最后更新于: {item.lastModifiedTime}
                </ListItem.Subtitle>
              </ListItem.Content>
            </ListItem.Swipeable>
          ))
        )}
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
          onPress={linkToCreate}
        />
        <SpeedDial.Action
          icon={{ name: "search", color: "#fff" }}
          title='Search'
          color='#00adf5'
          onPress={() => console.log("Delete Something")}
        />
      </SpeedDial>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
