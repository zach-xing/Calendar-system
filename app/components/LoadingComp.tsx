import { View, Text } from "react-native";
import React from "react";
import { Button } from "@rneui/base";

export default function LoadingComp() {
  return (
    <View style={{ paddingHorizontal: 20 }}>
      <Button
        loading={true}
        loadingProps={{
          size: "large",
          color: "#2089dc",
        }}
        buttonStyle={{
          backgroundColor: "white",
        }}
      />
    </View>
  );
}
