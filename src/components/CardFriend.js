import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { CardItem, Body, Text, Thumbnail, Left, Right } from "native-base";
import { api_picture } from "react-native-dotenv";

const CardFriend = ({ photo, name, status, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <CardItem>
      <Left>
        <Thumbnail small source={{ uri: `${api_picture + photo}` }} />
        <Body>
          <Text>{name}</Text>
          <Text note>{status}</Text>
        </Body>
      </Left>
    </CardItem>
  </TouchableOpacity>
);

export default CardFriend;

// const styles = StyleSheet.create({

// })
