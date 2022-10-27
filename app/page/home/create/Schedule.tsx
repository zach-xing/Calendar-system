import { View, StyleSheet } from "react-native";
import React from "react";
import {
  Card,
  Layout,
  Text,
  Input,
  Toggle,
  Button,
  Select,
  SelectItem,
} from "@ui-kitten/components";
import { useForm, Controller } from "react-hook-form";
import dayjs from "dayjs";
import Toast from "react-native-toast-message";
import DatePicker from "../../../components/DatePicker";
import { remindArr } from "../../../constant";
import storage from "../../../utils/storage";
import { event, REFRESH_DATE } from "../../../events";
import { createSchedule } from "../../../data/events";

/**
 * 日程 screen
 */
export default function Schedule() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isFullDay, setIsFullDay] = React.useState(false);
  const nowDateString = dayjs(new Date()).format("YYYY-MM-DD HH:mm");

  // schedule 提交
  const onSubmit = async (data) => {
    try {
      const newData = {
        ...data,
        category: "schedule",
        isFullDay: isFullDay,
        dateString: data.startTime.slice(0, 10),
        desc: data?.desc || "",
      };
      const user = await storage.load({
        key: "user",
      });
      await createSchedule(user.id, newData);
      event.emit(REFRESH_DATE, undefined);
      Toast.show({
        type: "success",
        text1: "创建成功",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: error?.message || "创建失败",
      });
    }
  };

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
              placeholder="please your title"
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
              render={({ field: { onChange } }) => (
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

        <Controller
          name="remind"
          control={control}
          rules={{
            required: true,
          }}
          defaultValue={0}
          render={({ field: { onChange, value } }) => (
            <Select
              value={remindArr[value].value}
              style={styles.gap}
              label="提醒"
              onSelect={(index: any) => {
                onChange(index.row);
              }}
            >
              {remindArr.map((item) => (
                <SelectItem key={item.id} title={item.value} />
              ))}
            </Select>
          )}
        />

        <Controller
          name="desc"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="描述"
              value={value}
              multiline={true}
              textStyle={{ minHeight: 64 }}
              placeholder="please input desc"
              onBlur={onBlur}
              onChangeText={onChange}
            />
          )}
        />
        <Button style={styles.gap} onPress={handleSubmit(onSubmit)}>
          Submit
        </Button>
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
