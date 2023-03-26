import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React from "react";
import HeaderBackButton from "../../components/HeaderBackButton";
import { Button, Input } from "@rneui/base";

interface IProps {}

/**
 * 备忘录 详情
 */
export default function Detail() {
  const [value, onChangeText] = React.useState("Useless Multiline Placeholder");

  const handleMemo = React.useCallback(() => {
    console.log("操作成功");
  }, []);

  return (
    <>
      <HeaderBackButton
        rightContent={
          <Button type='clear' onPress={handleMemo}>
            保存
          </Button>
        }
      />
      <View style={styles.container}>
        <Input placeholder='标题' />
        <View style={styles.textAreaContainer}>
          <TextInput
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
    textAlignVertical: "top",
  },
});
