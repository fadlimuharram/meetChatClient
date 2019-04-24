import React, { Component } from "react";
import { StyleSheet, Image, Text } from "react-native";
import { Container, Content, Card } from "native-base";
import CardChat from "../components/CardChat";

export default class Chats extends Component {
  componentDidMount() {
    this.props.socket.on("chat messages", msg => {
      alert(msg);
    });
  }

  render() {
    return (
      <Container>
        <Content>
          <Card>
            <CardChat />
            <CardChat />
            <CardChat />
            <CardChat />
            <CardChat />
            <CardChat />
            <CardChat />
            <CardChat />
            <CardChat />
            <CardChat />
            <CardChat />
          </Card>
        </Content>
      </Container>
    );
  }
}
