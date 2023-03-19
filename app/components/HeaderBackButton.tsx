import { View } from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "react-native";
import { Button, Icon } from "@rneui/base";

export default function HeaderBackButton() {
  const router = useRouter();

  return (
    <View
      style={{
        backgroundColor: 'white',
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Button iconPosition='left' type='clear' onPress={() => router.back()}>
        <Icon name='chevron-left' color='black' />
        Back
      </Button>
      <View />
    </View>
  );
}
