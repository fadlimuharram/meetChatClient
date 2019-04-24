import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image
} from "react-native";
import { Container, Content, Form, Item, Input, Button } from "native-base";
import imgPaperPlane from "../assets/image/paper-plane.png";
import LinearGradient from "react-native-linear-gradient";

export default class Login extends Component {
  static navigationOptions = {
    header: null
  };
  state = {
    email: "Fadlimuharram@hotmail.com",
    password: "fadli123456"
  };
  toRegister = () => {
    this.props.navigation.navigate("Register");
  };
  toRootApp = () => {
    // this.props.navigation.navigate("TabNav");
    const { email, password } = this.state;
    this.props.login(email, password);
    this.props.navigation.navigate("TabNav");
  };
  render() {
    return (
      <Container>
        <LinearGradient style={styles.content} colors={["#58C7FF", "#4F65B6"]}>
          <ScrollView>
            <View style={styles.logoContainer}>
              <Image source={imgPaperPlane} style={styles.logoImg} />
              <Text style={styles.txtLogo}>MEETCHAT</Text>
            </View>
            <View style={styles.formContainer}>
              <Form>
                <Item style={styles.itemInput}>
                  <Input
                    textContentType="emailAddress"
                    placeholder="Email"
                    placeholderTextColor="white"
                    selectionColor="white"
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })}
                  />
                </Item>
                <Item style={styles.itemInput} floatingLabel last>
                  <Input
                    secureTextEntry={true}
                    textContentType="password"
                    placeholder="Password"
                    placeholderTextColor="white"
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })}
                  />
                </Item>
                <Button style={styles.btnLogin} onPress={this.toRootApp} full>
                  <Text style={styles.txtLogin}>LOGIN</Text>
                </Button>
                <TouchableOpacity onPress={this.toRegister}>
                  <Text style={styles.txtRegister}>
                    Not Registered Yet? Create Here{" "}
                  </Text>
                </TouchableOpacity>
              </Form>
            </View>
          </ScrollView>
        </LinearGradient>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1
  },
  logoContainer: {
    alignSelf: "center",
    marginTop: 70
  },
  logoImg: {
    width: 150,
    height: 150,
    marginBottom: 5
  },
  txtLogo: {
    marginTop: 10,
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
    marginBottom: 20,
    alignSelf: "center"
  },
  formContainer: {
    padding: 20,
    marginTop: 20
  },
  itemInput: {
    marginBottom: 5
  },
  btnLogin: {
    marginTop: 50,
    backgroundColor: "white"
  },
  txtLogin: {
    color: "#4F65B6"
  },
  txtRegister: {
    color: "white",
    alignSelf: "center",
    marginTop: 20
  }
});
