import React, { Component } from "react";
import { StyleSheet, Image, Text, StatusBar } from "react-native";
import { Container, Content, Card } from "native-base";
import CardChat from "../components/CardChat";
import Loading from "../components/Loading";
import moment from "moment";
import io from "socket.io-client";
import { socket_url } from "react-native-dotenv";

export default class Chats extends Component {
  state = {
    onlineUsers: []
  };

  componentDidMount() {
    this.socket = io(socket_url, {
      query: "token=" + this.props.socket_access_token
    });

    this.socket.on("online_users", users => {
      this.setState({
        onlineUsers: users
      });
    });

    // alert(this.props.access_token);
    this.props.navigation.addListener("didFocus", () => {
      this.props.getMessagesConnections(this.props.access_token);
    });
  }

  toChat = (id, username) => {
    this.props.navigation.navigate("Chat", {
      id,
      username
    });
  };

  findOnlineReceiver = id => {
    findOnline = this.state.onlineUsers.find(val => val.id === id);
    if (findOnline) return true;
    return false;
  };

  renderMessage = () => {
    return this.props.connections.map(val => (
      <CardChat
        username={val.username}
        cover={val.cover}
        message={val.message}
        time={moment(val.createdAt, "YYYY-MM-DD HH:mm:ss.SSS").fromNow()}
        onPress={() => this.toChat(val.receiver, val.username)}
        isOnline={this.findOnlineReceiver(val.receiver)}
      />
    ));
  };

  render() {
    if (this.props.isLoading) {
      return <Loading />;
    }
    return (
      <Container>
        <StatusBar barStyle="light-content" backgroundColor="#4F65B6" />

        <Content>
          <Card>{this.renderMessage()}</Card>
        </Content>
      </Container>
    );
  }
}
