import React from "react";
import { StyleSheet, View } from "react-native";
import { Link, Stack, useSearchParams } from "expo-router";
import Toast from "react-native-toast-message";
import { Button, Icon, Input, ListItem, Switch } from "@rneui/base";
import { Text } from "@rneui/themed";
import dayjs from "dayjs";
import { ISchedule } from "../../types";
import HeaderBackButton from "../../components/HeaderBackButton";
import { Controller, useForm } from "react-hook-form";
import DatePicker from "../../components/DatePicker";

export default function OperateComp() {
  const searchParams = useSearchParams();
  console.log(searchParams);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: searchParams,
  });
  const [selectedFullDay, setSelectedFullDay] = React.useState(false);

  const onSubmit = async (data: any) => {
    try {
      console.log(data);
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: error.message || "操作失败",
      });
    }
  };

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
              errorMessage={errors.account ? "必填项" : ""}
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
            render={({ field: { onChange } }) => (
              <View style={{ display: "flex", flexDirection: "column" }}>
                <Text style={styles.labelStyle}>日期</Text>
                <DatePicker onChange={onChange} showMode='date' />
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
              render={({ field: { onChange } }) => (
                <View style={{ display: "flex", flexDirection: "column" }}>
                  <Text style={styles.labelStyle}>开始时间</Text>
                  <DatePicker onChange={onChange} showMode='datetime' />
                </View>
              )}
            />
            <Controller
              name='endTime'
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange } }) => (
                <View style={{ display: "flex", flexDirection: "column" }}>
                  <Text style={styles.labelStyle}>结束时间</Text>
                  <DatePicker onChange={onChange} showMode='datetime' />
                </View>
              )}
            />
          </>
        )}

        <Controller
          name='desc'
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              style={{ marginVertical: 10 }}
              value={value}
              label='描述'
              placeholder='Place your description'
              onBlur={onBlur}
              onChangeText={onChange}
              errorMessage={errors.account ? "必填项" : ""}
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
});
