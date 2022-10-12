import { View, StyleSheet } from "react-native";
import React from "react";
import {
  Card,
  Layout,
  Text,
  Input,
  Toggle,
  Button,
  Datepicker,
} from "@ui-kitten/components";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "../../../components/DatePicker";
import dayjs from "dayjs";

/**
 * 日程 comp
 */
export default function Schedule() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isFullDay, setIsFullDay] = React.useState(false);
  const nowDateString = dayjs(new Date()).format("YYYY-MM-DD hh:mm");

  const onSubmit = (data) => console.log(data);

  return (
    <Layout style={styles.container}>
      <Card appearance="filled">
        <Controller
          name="title"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              value={value}
              label="标题"
              placeholder="Place your title"
              onBlur={onBlur}
              onChangeText={onChange}
              status={errors.title ? "danger" : "basic"}
            />
          )}
        />

        {/* 选择日程的时间 */}
        <View style={styles.gap}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              ...styles.gap,
            }}
          >
            <Text>全天</Text>
            <Toggle
              checked={isFullDay}
              onChange={(res) => {
                setIsFullDay(res);
              }}
            />
          </View>

          {isFullDay ? (
            // 全天
            <Controller
              name="startTime"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, value } }) => (
                <DatePicker label={"全天"} onChange={onChange} mode="date" />
              )}
            />
          ) : (
            // 不是 全天
            <>
              <Controller
                name="startTime"
                control={control}
                defaultValue={nowDateString}
                render={({ field: { onChange } }) => (
                  <DatePicker
                    label={"开始时间"}
                    onChange={onChange}
                    mode="datetime"
                  />
                )}
              />
              <Controller
                name="endTime"
                control={control}
                defaultValue={nowDateString}
                render={({ field: { onChange } }) => (
                  <DatePicker
                    label={"结束时间"}
                    onChange={onChange}
                    mode="datetime"
                  />
                )}
              />
            </>
          )}
        </View>

        <Button onPress={handleSubmit(onSubmit)}>Submit</Button>
      </Card>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  gap: {
    marginVertical: 10,
  },
});
