import { View, StyleSheet } from "react-native";
import React from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import {
  Icon,
  Layout,
  Button,
  Text,
  Divider,
  Card,
} from "@ui-kitten/components";
import InfoShow from "./components/InfoShow";
import { remindArr, repeatArr } from "../../constant";

/**
 * 显示某个事件详情
 */
export default function ShowScreen() {
  const route = useRoute();
  const data: RNType.ScheduleType | RNType.ImportantDayType =
    route.params as any;
  const navigation = useNavigation();
  console.log(data);

  return (
    <Layout style={styles.container}>
      <View style={styles.headerStyle}>
        <Button
          appearance="ghost"
          accessoryLeft={
            <Icon name="arrow-ios-back" style={{ width: 40, height: 40 }} />
          }
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={styles.bodyStyle}>
        <Text category="h4">{data.title}</Text>
        <View style={{ paddingVertical: 10 }}>
          {data.category === "schedule" ? (
            <>
              {data.isFullDay ? (
                <>
                  {data.startTime.slice(0, 10) !== data.dateString ? (
                    <Text>
                      {data.startTime} - {data?.endTime}
                    </Text>
                  ) : (
                    <Text>全天 - {data.dateString}</Text>
                  )}
                </>
              ) : (
                <Text>
                  {data.startTime} - {data?.endTime}
                </Text>
              )}
            </>
          ) : (
            <Text>{data.dateString}</Text>
          )}
        </View>
        <Divider />
        {(data as RNType.ImportantDayType).repeat !== undefined ? (
          <InfoShow
            iconName={"repeat"}
            text={repeatArr[(data as RNType.ImportantDayType).repeat].value}
          />
        ) : null}
        <InfoShow iconName={"bell"} text={remindArr[data.remind].value} />

        {data?.desc && (
          <Card
            style={{ marginTop: 20 }}
            header={() => <Text>描述</Text>}
            appearance="filled"
          >
            <Text>{data.desc}</Text>
          </Card>
        )}
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  headerStyle: {
    display: "flex",
    flexDirection: "row",
  },
  bodyStyle: {
    paddingHorizontal: 20,
  },
  icon: {
    width: 30,
    height: 30,
  },
  listStyle: {
    display: "flex",
    flexDirection: "row",
  },
});
