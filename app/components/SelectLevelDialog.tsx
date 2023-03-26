import { View, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState, useCallback } from "react";
import { CheckBox, Dialog, Input } from "@rneui/base";
import { TaskLevelEnum } from "../types";

function levelTitle(arg: TaskLevelEnum): string {
  switch (arg) {
    case TaskLevelEnum.ONE:
      return "优先级 一";
    case TaskLevelEnum.TWO:
      return "优先级 二";
    case TaskLevelEnum.THREE:
      return "优先级 三";
    case TaskLevelEnum.FOUR:
      return "优先级 四";
  }
}

interface IProps {
  defaultValue: string | number;
  onChange: (...event: any[]) => void;
}

/**
 * 以对话框的形式显示 select level 组件
 */
export default function SelectLevelDialog(props: IProps) {
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
        <Input placeholder='优先级' disabled value={levelTitle(checked)} />
      </TouchableOpacity>

      <Dialog
        isVisible={dialogVisible}
        overlayStyle={{ backgroundColor: "white" }}
        onBackdropPress={closeDialog}
      >
        <Dialog.Title title='选择优先级' />
        {[1, 2, 3, 4].map((l, i) => (
          <CheckBox
            key={i}
            title={levelTitle(l)}
            containerStyle={{ backgroundColor: "white", borderWidth: 0 }}
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            checked={checked === l}
            onPress={() => setChecked(l)}
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
