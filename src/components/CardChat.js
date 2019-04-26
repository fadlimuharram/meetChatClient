import React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { CardItem, Body, Text, Thumbnail, Left, Right } from "native-base";
import { api_picture } from "react-native-dotenv";

const CardChat = ({ username, message, cover, time, onPress, isOnline }) => (
  <TouchableOpacity onPress={onPress}>
    <CardItem>
      <Left>
        <Thumbnail source={{ uri: `${api_picture}${cover}` }} />
        <Body>
          <View style={styles.headerContainer}>
            <Text>{username}</Text>
            {isOnline && <View style={styles.greenOl} />}
          </View>

          <Text note>{message}</Text>
        </Body>
        <Right>
          <Text note>{time}</Text>
        </Right>
      </Left>
    </CardItem>
  </TouchableOpacity>
);

export default CardChat;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row"
  },
  greenOl: {
    width: 5,
    height: 5,
    backgroundColor: "green",
    borderRadius: 5
  }
});
