import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React from "react";
import HeaderBackButton from "../../components/HeaderBackButton";
import { Input } from "@rneui/base";

interface IProps {}

/**
 * 备忘录 详情
 */
export default function Detail() {
  const [value, onChangeText] = React.useState("Useless Multiline Placeholder");

  return (
    <>
      <HeaderBackButton />
      <View style={styles.container}>
        <Input placeholder='标题' />
        <View style={styles.textAreaContainer}>
          <TextInput
            // editable
            multiline={true}
            numberOfLines={20}
            placeholderTextColor='grey'
            onChangeText={(text) => onChangeText(text)}
            value={value}
            style={styles.textArea}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  textAreaContainer: {
    backgroundColor: "white",
    padding: 5,
  },
  textArea: {
    height: 300,
    display: "flex",
    justifyContent: "flex-start",
  },
});
