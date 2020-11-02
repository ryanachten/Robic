import React from "react";
import {
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { Button as RnButton, ButtonProps, Icon } from "react-native-elements";
import { Colors } from "../constants/Colors";
import { Margin } from "../constants/Sizes";
import { Text } from "./Themed";

export const Button = (props: ButtonProps) => (
  <RnButton
    {...props}
    raised={true}
    buttonStyle={[styles.button, props.buttonStyle]}
    titleStyle={[styles.title, props.titleStyle]}
  />
);

type FabProps = {
  icon: string;
  label: string;
  containerStyles?: StyleProp<ViewStyle>;
  onPress: (event: GestureResponderEvent) => void;
};

export const Fab = ({ containerStyles, icon, label, onPress }: FabProps) => (
  <View style={[styles.fabContainer, containerStyles]}>
    <Text>{label}</Text>
    <Icon
      color={Colors.orange}
      containerStyle={styles.fabIcon}
      name={icon}
      raised
      onPress={onPress}
    />
  </View>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.white,
  },
  title: {
    color: Colors.orange,
  },
  fabContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Margin.md,
    maxHeight: 60,
    minHeight: 60,
  },
  fabIcon: {
    width: 60,
    margin: 0,
    marginLeft: Margin.sm,
  },
});
