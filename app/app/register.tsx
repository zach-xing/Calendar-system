import { View, StyleSheet } from "react-native";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";
import { Input, Text, Button } from "@rneui/base";

/**
 * 登录 Screen
 */
export default function Login() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      // await register(data);
      router.back();
      Toast.show({
        type: "success",
        text1: "注册成功!",
      });
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: error.message || "注册失败",
      });
    }
  };

  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleStyle}>
        <Text style={{ marginVertical: 20, color: "blue", fontSize: 20 }}>
          Sign Up
        </Text>
      </View>

      <Controller
        name='name'
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            style={{ marginVertical: 10 }}
            value={value}
            label='名称'
            placeholder='Place your Name'
            onBlur={onBlur}
            onChangeText={onChange}
            errorMessage={errors.account ? "必填项" : ""}
          />
        )}
      />

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
            errorMessage={errors.account ? "必填项" : ""}
          />
        )}
      />

      <Button style={{ marginTop: 50 }} onPress={handleSubmit(onSubmit)}>
        Register
      </Button>
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
    marginTop: 40,
    marginBottom: 20,
  },
});
