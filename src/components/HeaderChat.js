import React from "react";
import { View, StatusBar, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "native-base";

const HeaderChat = ({ onLeftPress, renderLogo, title }) => (
  <React.Fragment>
    <StatusBar barStyle="light-content" backgroundColor="#4F65B6" />
    <View style={styles.content}>
      <TouchableOpacity style={styles.iconLeftContent} onPress={onLeftPress}>
        {renderLogo()}
      </TouchableOpacity>
      <Text style={styles.txtTitle}>{title}</Text>
    </View>
  </React.Fragment>
);

export default HeaderChat;

const styles = StyleSheet.create({
  content: {
    height: 60,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",

    backgroundColor: "#4A65CD",
    borderColor: "#C9C9C9",
    borderBottomWidth: 1
  },
  iconLeftContent: {
    marginRight: 10,
    marginLeft: 5
  },
  txtTitle: {
    color: "white"
  }
});
