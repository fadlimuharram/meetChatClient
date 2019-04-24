import React from "react";
import { StyleSheet, View, Text } from "react-native";
const ChatSender = ({ text }) => (
  <View style={styles.senderStyle}>
    <Text style={styles.senderTxt}>{text}</Text>
  </View>
);

export default ChatSender;

const styles = StyleSheet.create({
  senderStyle: {
    marginTop: 2,
    alignItems: "flex-end",
    marginRight: 2
  },
  senderTxt: {
    backgroundColor: "white",
    padding: 10
  }
});
