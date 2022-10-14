import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import React from "react";
import { Button, Icon, Input, Layout, Text } from "@ui-kitten/components";
import { Controller, useForm } from "react-hook-form";

/**
 * 登录 Screen
 */
export default function Login({ navigation }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    navigation.goBack();
    console.log(data);
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
          Sign Up
        </Text>
      </View>

      <Controller
        name="name"
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            style={{ marginVertical: 10 }}
            value={value}
            label="名称"
            placeholder="Place your Name"
            onBlur={onBlur}
            onChangeText={onChange}
            status={errors.password ? "danger" : "basic"}
          />
        )}
      />

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

      <Button style={{ marginTop: 50 }} onPress={handleSubmit(onSubmit)}>
        Register
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
    marginTop: 40,
    marginBottom: 20,
  },
});
