import { View } from "react-native";
import React from "react";
import dayjs from "dayjs";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { ListItem, Text } from "@rneui/base";

interface IProps {
  label: string;
  onChange: (...event: any[]) => void;
  mode: "date" | "time" | "datetime";
}

/**
 * 自定义 “时间选择器” 组件
 */
export default function DatePicker(props: IProps) {
  const [curTime, setCurTime] = React.useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: any) => {
    setCurTime(date);
    setDatePickerVisibility(false);
    props.onChange(
      dayjs(date).format(
        props.mode !== "datetime" ? "YYYY-MM-DD 00:00" : "YYYY-MM-DD HH:mm"
      )
    );
  };

  return (
    <View>
      <ListItem onPress={() => setDatePickerVisibility(true)}>
        <ListItem.Content>
          <ListItem.Title>{props.label}</ListItem.Title>
          <ListItem.Subtitle>
            {dayjs(curTime).format(
              props.mode !== "datetime" ? "YYYY-MM-DD" : "YYYY-MM-DD HH:mm"
            )}
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode={props.mode}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
}
