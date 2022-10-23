import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import React from "react";
import { Button, Icon, Input, Layout, Text } from "@ui-kitten/components";
import { Controller, useForm } from "react-hook-form";
import Toast from "react-native-toast-message";
import { useLinkTo } from "@react-navigation/native";
import { login } from "../../data/user";
import storage from "../../utils/storage";

/**
 * 登录 Screen
 */
export default function Login({ navigation }) {
  const linkTo = useLinkTo();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const info = await login(data);
      console.log(info);
      storage
        .save({
          key: "user",
          data: { token: info.token },
        })
        .then(() => {
          linkTo("/home");
          Toast.show({
            type: "success",
            text1: "登录成功",
          });
        });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "登录失败",
      });
    }
  };

  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? "eye-off" : "eye"} />
    </TouchableWithoutFeedback>
  );

  return (
    <Layout style={styles.container}>
      <View style={styles.titleStyle}>
        <Text category="h5" style={{ marginVertical: 20, color: "blue" }}>
          Welcome Back👋👋👋
        </Text>
        <Text style={{ color: "grey" }}>
          We happy to see you again. To use your account, you should log in
          first.
        </Text>
      </View>

      <Controller
        name="account"
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            style={{ marginVertical: 10 }}
            value={value}
            label="账号"
            placeholder="Place your Account"
            onBlur={onBlur}
            onChangeText={onChange}
            status={errors.password ? "danger" : "basic"}
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            style={{ marginVertical: 10 }}
            value={value}
            label="密码"
            placeholder="Place your Password"
            accessoryRight={renderIcon}
            secureTextEntry={secureTextEntry}
            onBlur={onBlur}
            onChangeText={onChange}
            status={errors.password ? "danger" : "basic"}
          />
        )}
      />

      <View>
        <Text
          style={{ color: "grey" }}
          onPress={() => navigation.navigate("loginOrRegister-register")}
        >
          注册账号👈
        </Text>
      </View>

      <Button style={{ marginTop: 50 }} onPress={handleSubmit(onSubmit)}>
        Login
      </Button>
    </Layout>
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
