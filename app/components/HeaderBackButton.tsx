import { View } from "react-native";
import { useRouter } from "expo-router";
import { Button, Icon } from "@rneui/base";

interface IProps {
  rightContent?: React.ReactNode;
}

export default function HeaderBackButton(props: IProps) {
  const router = useRouter();

  return (
    <View
      style={{
        backgroundColor: "white",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Button iconPosition='left' type='clear' onPress={() => router.back()}>
        <Icon name='chevron-left' color='black' />
        Back
      </Button>
      <View>{props.rightContent}</View>
    </View>
  );
}
