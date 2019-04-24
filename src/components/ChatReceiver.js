import React from "react";
import { StyleSheet, View, Text } from "react-native";

const ChatReceiver = ({ text }) => (
  <View style={styles.receiverStyle}>
    <Text style={styles.receiverTxt}>{text}</Text>
  </View>
);

export default ChatReceiver;

const styles = StyleSheet.create({
  receiverStyle: {
    marginTop: 2,
    alignItems: "flex-start",
    marginLeft: 2
  },
  receiverTxt: {
    backgroundColor: "white",
    padding: 10
  }
});
