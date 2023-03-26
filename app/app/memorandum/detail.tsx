import { View, StyleSheet, TextInput } from "react-native";
import React from "react";
import { Button, Input } from "@rneui/base";
import dayjs from "dayjs";
import { useRouter, useSearchParams } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import HeaderBackButton from "../../components/HeaderBackButton";
import Toast from "react-native-toast-message";
import { createMemo, modifyMemo } from "../../api";

interface IProps {}

/**
 * 备忘录 详情
 */
export default function Detail() {
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
          text: "",
          createTime: dayjs(Date.now()).format("YYYY-MM-DD HH:mm"),
          lastModifiedTime: dayjs(Date.now()).format("YYYY-MM-DD HH:mm"),
        })
    ),
  });

  const onSubmit = React.useCallback(async (data: any) => {
    try {
      console.log("最后的数据", {
        ...data,
      });
      if (!!searchParams.data) {
        // modify
        await modifyMemo(data);
      } else {
        // create
        await createMemo(data);
      }
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
      <HeaderBackButton
        rightContent={
          <Button type='clear' onPress={handleSubmit(onSubmit)}>
            保存
          </Button>
        }
      />
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
              placeholder='标题'
              onBlur={onBlur}
              onChangeText={onChange}
              errorMessage={errors.title ? "必填项" : ""}
            />
          )}
        />
        <Controller
          name='text'
          control={control}
          rules={{
            required: false,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.textAreaContainer}>
              <TextInput
                multiline={true}
                numberOfLines={20}
                placeholderTextColor='grey'
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={styles.textArea}
                placeholder={"在这里输入..."}
              />
            </View>
          )}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  textAreaContainer: {
    backgroundColor: "white",
    padding: 5,
  },
  textArea: {
    height: 300,
    display: "flex",
    justifyContent: "flex-start",
    textAlignVertical: "top",
  },
});
