import { View, StyleSheet } from "react-native";
import React from "react";
import {
  Card,
  Input,
  Select,
  SelectItem,
  Text,
  Toggle,
  Button,
} from "@ui-kitten/components";
import { Controller, useForm } from "react-hook-form";
import dayjs from "dayjs";
import Toast from "react-native-toast-message";
import { remindArr, repeatArr } from "../../constant";
import DatePicker from "../DatePicker";
import storage from "../../utils/storage";
import {
  handleDateGap,
  removeEventById,
  sortEvent,
} from "../../utils/handleDate";
import { event, REFRESH_DATE } from "../../events";

interface IProps {
  data: RNType.ImportantDayType;
  goBack: Function;
}

/**
 * 编辑 schedule event
 */
export default function ImportantDayEdit(props: IProps) {
  const { data } = props;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: data.title,
      remind: data.remind,
      repeat: data.repeat,
      dateString: data.dateString,
      desc: data.desc,
    },
  });
  const nowDateString = dayjs(new Date()).format("YYYY-MM-DD HH:mm");

  const onSubmit = async (newData) => {
    const list = await getStorageData();
    const removedArr = removeEventById(data.id, list);
    console.log({
      ...newData,
      id: data.id,
      dateString: newData.dateString.slice(0, 10),
    });

    storage
      .save({
        key: "event",
        id: newData.dateString.slice(0, 7),
        data: sortEvent([
          {
            ...newData,
            id: data.id,
            dateString: newData.dateString.slice(0, 10),
          },
          ...removedArr,
        ]),
      })
      .then(() => {
        event.emit(REFRESH_DATE, undefined);
        Toast.show({
          type: "success",
          text1: "修改成功",
        });
        props.goBack();
      })
      .catch((err) => {
        Toast.show({
          type: "error",
          text1: "修改失败",
        });
      });
  };

  // 从 storage 获取数据，返回值长度肯定大于等于 1
  const getStorageData = async () => {
    try {
      const list = await storage.load({
        key: "event",
        id: data.dateString.slice(0, 7),
      });
      return list;
    } catch (error) {
      return [];
    }
  };

  return (
    <Card style={{ width: 300 }}>
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
          name="dateString"
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
