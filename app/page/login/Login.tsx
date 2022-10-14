import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import React from "react";
import { Button, Icon, Input, Text } from "@ui-kitten/components";
import { Controller, useForm } from "react-hook-form";

/**
 * 登录 Screen
 */
export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

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
    <View style={styles.container}>
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
        <Text style={{ color: "grey" }}>注册账号👈</Text>
      </View>

      <Button style={{ marginTop: 50 }} onPress={handleSubmit(onSubmit)}>
        Login
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    marginHorizontal: 15,
  },
  titleStyle: {
    marginVertical: 40,
  },
});
