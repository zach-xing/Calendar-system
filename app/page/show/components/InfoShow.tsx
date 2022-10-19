import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Icon } from "@ui-kitten/components";

interface IProps {
  iconName: string;
  text: string;
}

/**
 * 展示事件中的某个信息
 */
export default function InfoShow(props: IProps) {
  return (
    <View style={styles.container}>
      <Icon style={styles.icon} fill="black" name={props.iconName} />
      <Text>{props.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26,
    marginRight: 15,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
});
