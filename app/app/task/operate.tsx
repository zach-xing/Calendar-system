import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { useRouter, useSearchParams } from "expo-router";
import Toast from "react-native-toast-message";
import { Button, Input } from "@rneui/base";
import { Text } from "@rneui/themed";
import dayjs from "dayjs";
import HeaderBackButton from "../../components/HeaderBackButton";
import { Controller, useForm } from "react-hook-form";
import DatePicker from "../../components/DatePicker";
import { createTask, modifyTask } from "../../api/task";
import SelectLevelDialog from "../../components/SelectLevelDialog";

export default function OperateComp() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: JSON.parse(
      searchParams.data ||
        JSON.stringify({
          title: "",
          time: dayjs(Date.now()).format("YYYY-MM-DD HH:mm"),
          isDone: false,
          desc: "",
          level: 4,
        })
    ),
  });

  const onSubmit = useCallback(async (data: any) => {
    try {
      console.log("最后的数据", {
        ...data,
      });
      if (!!searchParams.data) {
        // modify
        await modifyTask(data);
      } else {
        // create
        await createTask({
          ...data,
          isDone: false,
        });
      }
      router;
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

        <Controller
          name='time'
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <View style={{ display: "flex", flexDirection: "column" }}>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <Text style={styles.labelStyle}>截止日期</Text>
                <Text style={styles.errorText}>
                  {errors.time ? "必填项" : ""}
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

        <Controller
          name='level'
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <View style={{ display: "flex", flexDirection: "column" }}>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <Text style={styles.labelStyle}>优先级</Text>
                <Text style={styles.errorText}>
                  {errors.level ? "必填项" : ""}
                </Text>
              </View>
              <SelectLevelDialog defaultValue={value} onChange={onChange} />
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
