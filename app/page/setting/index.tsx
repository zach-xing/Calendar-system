import { StyleSheet, View } from "react-native";
import React from "react";
import { Icon, Button } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";

/**
 * 设置页面
 */
export default function Setting() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.headerStyle}>
        <Button
          appearance="ghost"
          accessoryLeft={
            <Icon name="arrow-ios-back" style={{ width: 40, height: 40 }} />
          }
          onPress={() => navigation.goBack()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
  headerStyle: {
    display: "flex",
    flexDirection: "row",
  },
});
