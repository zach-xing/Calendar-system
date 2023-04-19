import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { useRouter, useSearchParams } from "expo-router";
import Toast from "react-native-toast-message";
import { Button, Input, Switch } from "@rneui/base";
import { Text } from "@rneui/themed";
import dayjs from "dayjs";
import { ISchedule } from "../../types";
import HeaderBackButton from "../../components/HeaderBackButton";
import { Controller, useForm } from "react-hook-form";
import DatePicker from "../../components/DatePicker";
import SelectRemindDialog from "../../components/SelectRemindDialog";
import { createSchedule, modifySchedule } from "../../api/schedule";

export default function OperateComp() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: JSON.parse(
      searchParams.data as string ||
        JSON.stringify({
          desc: "",
          endTime: dayjs(Date.now()).format("YYYY-MM-DD HH:mm"),
          isFullDay: false,
          remind: "0",
          startTime: dayjs(Date.now()).format("YYYY-MM-DD HH:mm"),
          title: "",
        })
    ),
  });

  const [selectedFullDay, setSelectedFullDay] = React.useState(false);

  const onSubmit = useCallback(async (data: any) => {
    try {
      if (!!searchParams.data) {
        // modify
        await modifySchedule(data);
      } else {
        // create
        await createSchedule(data);
      }
      console.log("最后的数据", {
        ...data,
        isFullDay: selectedFullDay,
      });
      Toast.show({
        type: "success",
        text1: "保存成功",
      });
      router.back();
    } catch (error: any) {
      console.error(error);
      Toast.show({
        type: "error",
        text1: error.message || "保存失败",
      });
    }
  }, []);

  return (
    <>
      <HeaderBackButton />
      <View style={styles.container}>
        <Controller
          name='title'
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              style={{ marginVertical: 10 }}
              value={value}
              label='标题'
              placeholder='Place your title'
              onBlur={onBlur}
              onChangeText={onChange}
              errorMessage={errors.title ? "必填项" : ""}
            />
          )}
        />

        <View style={{ display: "flex", flexDirection: "column" }}>
          <Text style={styles.labelStyle}>是否全天</Text>
          <Switch
            value={selectedFullDay}
            onValueChange={setSelectedFullDay}
            style={{ width: 50 }}
          />
        </View>

        {selectedFullDay ? (
          // 全天
          <Controller
            name='startTime'
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <View style={{ display: "flex", flexDirection: "column" }}>
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <Text style={styles.labelStyle}>日期</Text>
                  <Text style={styles.errorText}>
                    {errors.startTime ? "必填项" : ""}
                  </Text>
                </View>
                <DatePicker
                  defalutValue={value}
                  onChange={onChange}
                  showMode='date'
                />
              </View>
            )}
          />
        ) : (
          <>
            <Controller
              name='startTime'
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, value } }) => (
                <View style={{ display: "flex", flexDirection: "column" }}>
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    <Text style={styles.labelStyle}>开始时间</Text>
                    <Text style={styles.errorText}>
                      {errors.startTime ? "必填项" : ""}
                    </Text>
                  </View>
                  <DatePicker
                    defalutValue={value}
                    onChange={onChange}
                    showMode='datetime'
                  />
                </View>
              )}
            />
            <Controller
              name='endTime'
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, value } }) => (
                <View style={{ display: "flex", flexDirection: "column" }}>
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    <Text style={styles.labelStyle}>结束时间</Text>
                    <Text style={styles.errorText}>
                      {errors.endTime ? "必填项" : ""}
                    </Text>
                  </View>
                  <DatePicker
                    defalutValue={value}
                    onChange={onChange}
                    showMode='datetime'
                  />
                </View>
              )}
            />
          </>
        )}

        <Controller
          name='remind'
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <View style={{ display: "flex", flexDirection: "column" }}>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <Text style={styles.labelStyle}>提醒</Text>
                <Text style={styles.errorText}>
                  {errors.remind ? "必填项" : ""}
                </Text>
              </View>
              <SelectRemindDialog defaultValue={value} onChange={onChange} />
            </View>
          )}
        />

        <Controller
          name='desc'
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              style={{ marginVertical: 10 }}
              value={value}
              label='描述'
              placeholder='Place your description'
              onBlur={onBlur}
              onChangeText={onChange}
              errorMessage={errors.desc ? "必填项" : ""}
            />
          )}
        />

        <Button style={{ marginTop: 50 }} onPress={handleSubmit(onSubmit)}>
          保存
        </Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#edf1f3",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  labelStyle: {
    fontSize: 16,
    color: "#86939e",
    paddingLeft: 10,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    paddingLeft: 10,
  },
});
