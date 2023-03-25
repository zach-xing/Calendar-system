import React from "react";
import { View, Text, StyleSheet } from "react-native";

const EmptyListComponent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>这里没有数据</Text>
    </View>
  );
};

EmptyListComponent.defaultProps = {
  message: "列表为空",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default EmptyListComponent;
