import React, { Component } from "react";
import { Text } from "react-native";

class AuthLoading extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate("App");
    }, 2000);
  }
  render() {
    return <Text>Auth Loading</Text>;
  }
}
export default AuthLoading;
