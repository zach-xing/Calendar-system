import { View } from "react-native";
import React from "react";
import { ListItem, Text } from "@ui-kitten/components";
import dayjs from "dayjs";
import DateTimePickerModal from "react-native-modal-datetime-picker";

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

  const handleConfirm = (date) => {
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
      <ListItem
        title={props.label}
        onPress={() => setDatePickerVisibility(true)}
        accessoryRight={() => (
          <Text>
            {dayjs(curTime).format(
              props.mode !== "datetime" ? "YYYY-MM-DD" : "YYYY-MM-DD HH:mm"
            )}
          </Text>
        )}
      />

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode={props.mode}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
}
