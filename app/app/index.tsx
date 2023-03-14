import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Input, Text } from "@rneui/base";
import { useRouter } from "expo-router";
import storage from "../utils/storage";
import Toast from "react-native-toast-message";
import { Controller, useForm } from "react-hook-form";
import { login } from "../api";

export default function Index() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  React.useEffect(() => {
    storage
      .load({
        key: "user",
        id: "user",
      })
      .then((res) => {
        router.replace("/home");
      })
      .catch((err) => {
        console.log(err);
        Toast.show({
          type: "error",
          text1: "需要登录",
        });
      });
  }, []);

  const onSubmit = async (data: any) => {
    try {
      const info = await login(data);
      await storage.save({ key: "user", data: info });
      router.replace("/home");
      Toast.show({
        type: "success",
        text1: "登录成功",
      });
    } catch (error) {
      console.log("这里是登录失败的error", error);
      Toast.show({
        type: "error",
        text1: "登录失败",
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleStyle}>
        <Text style={{ marginVertical: 20, color: "#2089dc", fontSize: 20 }}>
          Welcome Back👋👋👋
        </Text>
        <Text style={{ color: "grey" }}>We are very glad to meet you.</Text>
        <Text style={{ color: "grey" }}>
          To use your account, you should log in first.
        </Text>
      </View>

      <Controller
        name='account'
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            style={{ marginVertical: 10 }}
            value={value}
            label='账号'
            placeholder='Place your Account'
            onBlur={onBlur}
            onChangeText={onChange}
            errorMessage={errors.account ? "必填项" : ""}
          />
        )}
      />

      <Controller
        name='password'
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            style={{ marginVertical: 10 }}
            value={value}
            label='密码'
            placeholder='Place your Password'
            onBlur={onBlur}
            onChangeText={onChange}
            errorMessage={errors.password ? "必填项" : ""}
          />
        )}
      />

      <View style={{ marginBottom: 30 }}>
        <Text
          style={{ color: "grey" }}
          onPress={() => router.push("/register")}
        >
          注册账号👈
        </Text>
      </View>

      <Button onPress={handleSubmit(onSubmit)}>Login</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 15,
  },
  titleStyle: {
    marginVertical: 40,
  },
});
