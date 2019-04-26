import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Image,
  KeyboardAvoidingView
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
import HeaderChat from "../components/HeaderChat";
import {
  ArrowLeft,
  SendIcon,
  FileAttachmentIcon,
  TrashIcon
} from "../assets/svg";
import ImagePicker from "react-native-image-picker";
import AutoHeightImage from "react-native-auto-height-image";
import { api_picture } from "react-native-dotenv";

export default class Chat extends Component {
  state = {
    message: "",
    messages: [],
    attachmentSource: null,
    type: "",
    extension: "",
    filename: "",
    base64source: ""
  };

  componentDidMount() {
    this.props.getAllMessages(
      this.props.access_token,
      this.props.navigation.getParam("id", 0)
    );
    this.socket = io(socket_url, {
      query: "token=" + this.props.socket_access_token
    });
    this.socket.on("getMessage", data => {
      alert(JSON.stringify(data, null, 2));
      this.setState({
        messages: [
          ...this.state.messages,
          {
            type: "receiver",
            message: data.message,
            typeData: data.type
          }
        ]
      });
    });
  }

  selectAttachmentTapped = () => {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, response => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled photo picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        let type = response.type;
        let extension = response.fileName.split(".").pop();
        let filename = response.fileName;
        let source = { uri: response.uri };
        let base64source = "data:image/jpeg;base64," + [response.data];
        this.setState({
          attachmentSource: source,
          extension,
          type,
          filename,
          base64source
        });
      }
    });
  };

  deleteSelectAttachment = () => {
    this.setState({
      attachmentSource: null,
      type: "",
      extension: ""
    });
  };

  sendMessage = data => {
    this.socket.emit("sendMessage", {
      ...data,
      type: "text"
    });

    this.setState({
      messages: [
        ...this.state.messages,
        {
          type: "sender",
          message: this.state.message,
          typeData: "text"
        }
      ],
      message: ""
    });
  };

  sendAttachment = idReceiver => {
    const data = {
      id: idReceiver,
      type: "file",
      base64source: this.state.base64source
    };

    this.socket.emit("sendMessage", data);
    this.socket.on("conditionFile", filename => {
      this.setState({
        messages: [
          ...this.state.messages,
          {
            type: "sender",
            message: filename,
            typeData: "picture"
          }
        ],
        attachmentSource: null,
        type: "",
        extension: "",
        filename: "",
        base64source: ""
      });
    });
  };

  send = () => {
    if (this.state.base64source) {
      this.sendAttachment(this.props.navigation.getParam("id", 0));
    } else {
      const data = {
        message: this.state.message,
        id: this.props.navigation.getParam("id", 0)
      };

      this.sendMessage(data);
    }
  };

  renderMessage = () => {
    return this.state.messages.map(val => {
      if (val.type === "sender") {
        return <ChatSender text={val.message} typeData={val.typeData} />;
      } else if (val.type === "receiver") {
        return <ChatReceiver text={val.message} typeData={val.typeData} />;
      }
    });
  };

  renderOldMessage = () => {
    const userId = this.props.user_id;
    const receiverId = this.props.navigation.getParam("id", 0);

    return this.props.messages.map(val => {
      if (val.sender === userId) {
        return <ChatSender text={val.content} typeData={val.typeData} />;
      } else if (val.receiver === receiverId) {
        return <ChatReceiver text={val.content} typeData={val.typeData} />;
      } else if (val.sender === receiverId) {
        return <ChatReceiver text={val.content} typeData={val.typeData} />;
      } else if (val.receiver === userId) {
        return <ChatSender text={val.content} typeData={val.typeData} />;
      }
    });
  };

  render() {
    if (this.props.isLoading) {
      return <Loading />;
    }

    return (
      <Container>
        <HeaderChat
          onLeftPress={() => this.props.navigation.navigate("Chats")}
          renderLogo={() => <ArrowLeft size="20" color="white" />}
          title={this.props.navigation.getParam("username", "")}
        />
        <ImageBackground source={defaultChat} style={styles.bgImg}>
          <View style={styles.scrollStyle}>
            <ScrollView
              ref={ref => (this.scrollView = ref)}
              onContentSizeChange={(contentWidth, contentHeight) => {
                this.scrollView.scrollToEnd({ animated: true });
              }}
            >
              <KeyboardAvoidingView>
                {this.renderOldMessage()}
                {this.renderMessage()}
              </KeyboardAvoidingView>
            </ScrollView>
          </View>

          <View style={styles.btnConten}>
            {this.state.attachmentSource && (
              <View style={styles.contentAttachment}>
                <TouchableOpacity
                  style={styles.deleteAttachment}
                  onPress={this.deleteSelectAttachment}
                >
                  <TrashIcon size="25" />
                </TouchableOpacity>
                <AutoHeightImage
                  source={this.state.attachmentSource}
                  width={80}
                  style={styles.attachStyle}
                />
              </View>
            )}

            <View style={styles.txtInputContent}>
              <TouchableOpacity
                style={styles.fileBtn}
                onPress={this.selectAttachmentTapped}
              >
                <FileAttachmentIcon size="25" color="black" />
              </TouchableOpacity>
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
                <SendIcon size="25" color="white" />
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
    bottom: 60,
    width: "100%",
    backgroundColor: "#F7F7F7"
  },
  contentAttachment: {
    backgroundColor: "rgba(247,247,247,0.5)"
  },
  deleteAttachment: {
    alignSelf: "center",
    marginLeft: 85,
    marginBottom: -10,
    zIndex: 9
  },
  attachStyle: {
    alignSelf: "center",
    paddingTop: 5,
    paddingBottom: 5
  },
  fileBtn: {
    backgroundColor: "transparent",
    alignSelf: "center"
  },
  sendBtn: {
    backgroundColor: "#4F65B6",
    borderRadius: 100,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50
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
    width: Dimensions.get("window").width / 1.5
  },
  txtInput: {
    backgroundColor: "white",
    borderRadius: 50
  },
  scrollStyle: {
    height: Dimensions.get("window").height - 150,
    width: Dimensions.get("window").width
  }
});
