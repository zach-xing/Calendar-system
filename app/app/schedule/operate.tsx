import React from "react";
import { StyleSheet, View } from "react-native";
import { Link, Stack, useSearchParams } from "expo-router";
import Toast from "react-native-toast-message";
import { Button, Icon, ListItem } from "@rneui/base";
import { Text } from "@rneui/themed";
import dayjs from "dayjs";
import { ISchedule } from "../../types";
import HeaderBackButton from "../../components/HeaderBackButton";

export default function OperateComp() {
  const data = useSearchParams();
  console.log(data);

  return (
    <>
      <HeaderBackButton />
      <View style={styles.container}>
        <Text>sdf</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#edf1f3",
  },
});
