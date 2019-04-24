import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { Container, Content, Thumbnail } from "native-base";
import LinearGradient from "react-native-linear-gradient";

export default class Profile extends Component {
  //temp
  toLogout = () => this.props.logout();

  render() {
    return (
      <Container>
        <Content>
          <LinearGradient
            style={styles.content}
            colors={["#58C7FF", "#4F65B6"]}
          >
            <TouchableOpacity style={styles.setting} onPress={this.toLogout}>
              <Text>lg</Text>
            </TouchableOpacity>
            <View style={styles.header}>
              <Thumbnail
                source={{ uri: "https://placeimg.com/640/480/people" }}
                large
              />
              <Text style={styles.headerTxt}>Fadli Muharram</Text>
            </View>
          </LinearGradient>
          <View>
            <Text>Username</Text>
            <Text>fadlimuharram</Text>

            <Text>Email</Text>
            <Text>fadli@tes.com</Text>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: Dimensions.get("screen").height / 3,
    alignItems: "center",
    justifyContent: "center"
  },
  headerTxt: {
    color: "white",
    marginTop: 20,
    fontSize: 20
  },
  setting: {
    alignSelf: "flex-end",
    padding: 2
  }
});
