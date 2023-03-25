import { View, Text } from "react-native";
import React, { useCallback, useState } from "react";
import { Dialog } from "@rneui/base";
import { TouchableOpacity } from "react-native";

interface IProps {
  children: React.ReactNode;
  onConfirm: (...args: any) => void;
}

/**
 * 二次确认删除的对话框
 */
const ConfirmDeleteButton: React.FC<IProps> = (props) => {
  const [visible, setVisible] = useState(false);

  const openDialog = useCallback(() => {}, []);

  return (
    <View>
      <TouchableOpacity onPress={openDialog}>{props.children}</TouchableOpacity>

      <Dialog isVisible={visible} onBackdropPress={() => setVisible(false)}>
        <Dialog.Title title='确定删除么？' />
        <Dialog.Actions>
          <Dialog.Button
            title='删除'
            titleStyle={{ color: "red" }}
            onPress={() => console.log("Primary Action Clicked!")}
          />
          <Dialog.Button title='取消' onPress={() => setVisible(false)} />
        </Dialog.Actions>
      </Dialog>
    </View>
  );
};

export default ConfirmDeleteButton;
