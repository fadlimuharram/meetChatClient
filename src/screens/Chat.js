import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  ScrollView
} from "react-native";
import {
  Container,
  Content,
  Card,
  CardItem,
  Item,
  Input,
  Thumbnail
} from "native-base";
import defaultChat from "../assets/image/defaultchat.jpg";
import sendImage from "../assets/image/paper-plane.png";
import io from "socket.io-client";
import { socket_url } from "react-native-dotenv";
import ChatSender from "../components/ChatSender";
import ChatReceiver from "../components/ChatReceiver";
import Loading from "../components/Loading";

export default class Chat extends Component {
  state = {
    message: "",
    messages: []
  };

  componentDidMount() {
    this.props.getAllMessages(
      this.props.access_token,
      this.props.navigation.getParam("id", 0)
    );
    this.socket = io(socket_url, {
      query: "token=" + this.props.socket_access_token
    });
    this.socket.on("getMessage", msg => {
      this.setState({
        messages: [
          ...this.state.messages,
          {
            type: "receiver",
            message: msg
          }
        ]
      });
    });
  }

  send = () => {
    const data = {
      message: this.state.message,
      id: this.props.navigation.getParam("id", 0)
    };
    this.socket.emit("sendMessage", data);
    this.setState({
      messages: [
        ...this.state.messages,
        {
          type: "sender",
          message: this.state.message
        }
      ],
      message: ""
    });
  };

  renderMessage = () => {
    return this.state.messages.map(val => {
      if (val.type === "sender") {
        return <ChatSender text={val.message} />;
      } else if (val.type === "receiver") {
        return <ChatReceiver text={val.message} />;
      }
    });
  };

  renderOldMessage = () => {
    const userId = this.props.user_id;
    const receiverId = this.props.navigation.getParam("id", 0);

    return this.props.messages.map(val => {
      if (val.sender === userId) {
        return <ChatSender text={val.content} />;
      } else if (val.receiver === receiverId) {
        return <ChatReceiver text={val.content} />;
      } else if (val.sender === receiverId) {
        return <ChatReceiver text={val.content} />;
      } else if (val.receiver === userId) {
        return <ChatSender text={val.content} />;
      }
    });
  };

  render() {
    if (this.props.isLoading) {
      return <Loading />;
    }

    return (
      <Container>
        <ImageBackground source={defaultChat} style={styles.bgImg}>
          <ScrollView>
            {this.renderOldMessage()}
            {this.renderMessage()}
          </ScrollView>

          <View style={styles.btnConten}>
            <View style={styles.txtInputContent}>
              <Item style={styles.inputContainer} rounded>
                <Input
                  style={styles.txtInput}
                  placeholder="Rounded Textbox"
                  onChangeText={message => {
                    this.setState({ message });
                  }}
                  value={this.state.message}
                />
              </Item>
              <TouchableOpacity style={styles.sendBtn} onPress={this.send}>
                <Thumbnail source={sendImage} small />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  btnConten: {
    position: "absolute",
    bottom: 0,
    width: "100%"
  },
  sendBtn: {
    backgroundColor: "#4F65B6",
    borderRadius: 50,
    padding: 10
  },
  bgImg: {
    width: "100%",
    height: "100%"
  },

  txtInputContent: {
    flexDirection: "row",
    padding: 7,
    alignItems: "stretch",
    justifyContent: "space-around"
  },
  inputContainer: {
    width: Dimensions.get("window").width / 1.3
  },
  txtInput: {
    backgroundColor: "white",
    borderRadius: 50
  }
});
