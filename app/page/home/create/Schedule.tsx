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
  const [date, setDate] = React.useState(new Date());

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
              name="dataString"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, value } }) => (
                <Datepicker
                  date={value}
                  onSelect={onChange}
                  status={errors.dataString ? "danger" : "basic"}
                />
              )}
            />
          ) : (
            // 不是 全天
            <>
              <Controller
                name="startTime"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    value={value}
                    label="开始时间"
                    placeholder="Place your start time"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    status={errors.title ? "danger" : "basic"}
                  />
                )}
              />
              <Controller
                name="endTime"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    value={value}
                    label="结束时间"
                    placeholder="Place your end time"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    status={errors.title ? "danger" : "basic"}
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
