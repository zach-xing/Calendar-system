import { View, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState, useCallback } from "react";
import { CheckBox, Dialog, Input } from "@rneui/base";
import { RemindEnum } from "../types";

function remindTitle(arg: RemindEnum): string {
  switch (arg) {
    case RemindEnum.FIVE_MIN:
      return "5 分钟前";
    case RemindEnum.TEN_MIN:
      return "10 分钟前";
    case RemindEnum.HALF_HOUR:
      return "30 分钟前";
    case RemindEnum.ONE_HOUR:
      return "1 小时前";
    case RemindEnum.ONT_DAY:
      return "1 天前";
  }
}

interface IProps {
  defaultValue: string | number;
  onChange: (...event: any[]) => void;
}

/**
 * 以对话框的形式显示 select 组件
 */
export default function SelectRemindDialog(props: IProps) {
  const [dialogVisible, setDialogVisible] = React.useState(false);
  const [checked, setChecked] = React.useState(Number(props.defaultValue));

  const handleSelected = useCallback(() => {
    props.onChange(checked);
    closeDialog();
  }, [checked]);

  const openDialog = useCallback(() => {
    setDialogVisible(true);
  }, []);

  const closeDialog = useCallback(() => {
    setDialogVisible(false);
  }, []);

  return (
    <View>
      <TouchableOpacity onPress={openDialog}>
        <Input placeholder='日期' disabled value={remindTitle(checked)} />
      </TouchableOpacity>

      <Dialog
        isVisible={dialogVisible}
        overlayStyle={{ backgroundColor: "white" }}
        onBackdropPress={closeDialog}
      >
        <Dialog.Title title='提醒' />
        {[0, 1, 2, 3, 4].map((l, i) => (
          <CheckBox
            key={i}
            title={remindTitle(l)}
            containerStyle={{ backgroundColor: "white", borderWidth: 0 }}
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            checked={checked === i}
            onPress={() => setChecked(i)}
          />
        ))}

        <Dialog.Actions>
          <Dialog.Button title='保存' onPress={handleSelected} />
          <Dialog.Button title='取消' onPress={closeDialog} />
        </Dialog.Actions>
      </Dialog>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 6,
    width: 220,
    margin: 20,
  },
  buttonContainer: {
    margin: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
