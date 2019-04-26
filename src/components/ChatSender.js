import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "native-base";
import AutoHeightImage from "react-native-auto-height-image";
import { api_picture } from "react-native-dotenv";
const ChatSender = ({ text, typeData }) => (
  <View style={styles.senderStyle}>
    <View style={styles.bgSender}>
      {typeData === "text" ? (
        <Text style={styles.senderTxt}>{text}</Text>
      ) : (
        <AutoHeightImage source={{ uri: `${api_picture}${text}` }} width={80} />
      )}

      <Text style={styles.timeSender} note>
        19:00
      </Text>
    </View>
  </View>
);

export default ChatSender;

const styles = StyleSheet.create({
  senderStyle: {
    marginTop: 10,
    alignItems: "flex-end",
    marginRight: 5
  },
  bgSender: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20
  },
  senderTxt: {
    padding: 10
  },
  timeSender: {
    alignSelf: "flex-start"
  }
});
