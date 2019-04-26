import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "native-base";
const ChatReceiver = ({ text }) => (
  <View style={styles.receiverStyle}>
    <View style={styles.bgReceiver}>
      <Text style={styles.receiverTxt}>{text}</Text>
      <Text style={styles.timeReceiver} note>
        20:00
      </Text>
    </View>
  </View>
);

export default ChatReceiver;

const styles = StyleSheet.create({
  receiverStyle: {
    marginTop: 5,
    alignItems: "flex-start",
    marginLeft: 2
  },
  bgReceiver: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20
  },
  receiverTxt: {
    padding: 10
  },
  timeReceiver: {
    alignSelf: "flex-end"
  }
});
