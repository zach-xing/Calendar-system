import { View, StyleSheet } from "react-native";
import React from "react";
import {
  Card,
  Layout,
  Text,
  Input,
  Button,
  Select,
  SelectItem,
} from "@ui-kitten/components";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "../../../components/DatePicker";
import { repeatArr, remindArr } from "../../../constant";
import dayjs from "dayjs";

/**
 * 重要日 screen
 */
export default function ImportantDay() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const nowDateString = dayjs(new Date()).format("YYYY-MM-DD");

  const onSubmit = (data) => console.log(data);

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

        <View style={styles.gap}>
          <Text style={{ fontSize: 12, color: "grey", fontWeight: "bold" }}>
            日期
          </Text>
          <Controller
            name="startTime"
            control={control}
            rules={{
              required: true,
            }}
            defaultValue={nowDateString}
            render={({ field: { onChange } }) => (
              <DatePicker label={"全天"} onChange={onChange} mode="date" />
            )}
          />
        </View>

        <Controller
          name="repeat"
          control={control}
          rules={{
            required: true,
          }}
          defaultValue={0}
          render={({ field: { onChange, value } }) => (
            <Select
              value={repeatArr[value].value}
              label="重复"
              onSelect={(index: any) => {
                onChange(index.row);
              }}
            >
              {repeatArr.map((item) => (
                <SelectItem key={item.id} title={item.value} />
              ))}
            </Select>
          )}
        />

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
