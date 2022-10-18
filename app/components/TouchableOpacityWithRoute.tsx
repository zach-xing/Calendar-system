import { StyleProp, TouchableOpacity, ViewStyle } from "react-native";
import { useLinkProps } from "@react-navigation/native";
import React from "react";

interface IProps {
  to: any;
  style?: StyleProp<ViewStyle>;
  children: React.ReactElement | React.ReactElement[];
}

/**
 * 自定义的可以跳转路由的组件
 */
export default function TouchableOpacityWithRoute(props: IProps) {
  const { onPress } = useLinkProps({ to: props.to });
  const handlePress = () => {
    onPress();
  };

  return (
    <TouchableOpacity style={props.style} onPress={handlePress}>
      {props.children}
    </TouchableOpacity>
  );
}
