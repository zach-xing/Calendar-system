import { View, TouchableOpacity } from "react-native";
import React from "react";
import dayjs from "dayjs";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Input, ListItem, Text } from "@rneui/base";

interface IProps {
  defalutValue: string | Date;
  onChange: (...event: any[]) => void;
  showMode: "date" | "datetime";
}

/**
 * 自定义 “时间选择器” 组件
 */
export default function DatePicker(props: IProps) {
  const id = React.useId();
  const [curTime, setCurTime] = React.useState(new Date(props.defalutValue));
  const [mode, setMode] = React.useState<"date" | "time">("date");
  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);

  const openDatePicker = (type?: "date" | "time") => {
    setDatePickerVisibility(true);
    setMode(type || "date");
  };

  const handleConfirm = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (selectedDate) {
      setCurTime(selectedDate);
      setDatePickerVisibility(false);
      props.onChange(dayjs(selectedDate).format("YYYY-MM-DD HH:mm"));
    }
  };

  return (
    <View>
      {props.showMode === "date" ? (
        <TouchableOpacity onPress={() => openDatePicker()}>
          <Input
            value={dayjs(curTime).format("YYYY-MM-DD")}
            placeholder='日期'
            disabled
          />
        </TouchableOpacity>
      ) : (
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            style={{ width: "45%" }}
            onPress={() => openDatePicker("date")}
          >
            <Input
              value={dayjs(curTime).format("YYYY-MM-DD")}
              placeholder='日期'
              disabled
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ width: "45%" }}
            onPress={() => openDatePicker("time")}
          >
            <Input
              value={dayjs(curTime).format("HH:mm")}
              placeholder='时间'
              disabled
            />
          </TouchableOpacity>
        </View>
      )}

      {isDatePickerVisible && (
        <DateTimePicker
          testID={id}
          mode={mode}
          value={curTime}
          is24Hour={true}
          onChange={handleConfirm}
        />
      )}
    </View>
  );
}
