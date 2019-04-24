import React from "react";
import { CardItem, Body, Text, Thumbnail, Left, Right } from "native-base";

const CardChat = () => (
  <CardItem>
    <Left>
      <Thumbnail source={{ uri: "https://placeimg.com/640/480/people" }} />
      <Body>
        <Text>NativeBase</Text>
        <Text note>GeekyAnts</Text>
      </Body>
      <Right>
        <Text>08:00</Text>
        <Text note>24</Text>
      </Right>
    </Left>
  </CardItem>
);

export default CardChat;
