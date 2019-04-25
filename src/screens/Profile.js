import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from "react-native";
import {
  Container,
  Content,
  Thumbnail,
  Form,
  Item,
  Label,
  Input,
  Button
} from "native-base";
import LinearGradient from "react-native-linear-gradient";
import { api_picture } from "react-native-dotenv";
import { LogoutIcon, CameraIcon } from "../assets/svg";
import ImagePicker from "react-native-image-picker";
export default class Profile extends Component {
  state = {
    username: "",
    email: "",
    avatarSource: null
  };

  componentDidMount() {
    const { username, email } = this.props.user;
    this.setState({
      username,
      email
    });
  }

  selectPhotoTapped = () => {
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
        let source = { uri: response.uri };

        this.setState({
          avatarSource: source
        });
      }
    });
  };

  //temp
  toLogout = () => this.props.logout();

  toUpload = () => {
    // alert(JSON.stringify(this.state.avatarSource, null, 2));
    this.props.cover(this.state.avatarSource, this.props.access_token);
  };

  renderTempImage = () => (
    <React.Fragment>
      <View style={styles.header}>
        <Thumbnail
          style={styles.imgStyle}
          source={this.state.avatarSource}
          large
        />
        <TouchableOpacity
          style={styles.cameraStyle}
          onPress={this.selectPhotoTapped}
        >
          <CameraIcon size="25" color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTxt}>{this.props.user.username}</Text>
      </View>
      <Button onPress={this.toUpload} style={styles.btnUploadImg}>
        <Text style={styles.txtBtnUploadImg}>Upload</Text>
      </Button>
    </React.Fragment>
  );

  renderCurrentImage = () => (
    <React.Fragment>
      <View style={styles.header}>
        <Thumbnail
          style={styles.imgStyle}
          source={{ uri: `${api_picture}${this.props.user.cover}` }}
          large
        />
        <TouchableOpacity
          style={styles.cameraStyle}
          onPress={this.selectPhotoTapped}
        >
          <CameraIcon size="25" color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTxt}>{this.props.user.username}</Text>
      </View>
    </React.Fragment>
  );

  render() {
    return (
      <Container>
        <Content>
          <LinearGradient
            style={styles.content}
            colors={["#58C7FF", "#4F65B6"]}
          >
            <TouchableOpacity style={styles.setting} onPress={this.toLogout}>
              <LogoutIcon size="30" color="white" />
            </TouchableOpacity>
            {this.state.avatarSource
              ? this.renderTempImage()
              : this.renderCurrentImage()}
          </LinearGradient>
          <View>
            <Form style={styles.formInput}>
              <Item style={styles.itemForm} floatingLabel>
                <Label>Username</Label>
                <Input
                  value={this.state.username}
                  onChangeText={username => this.setState({ username })}
                />
              </Item>
              <Item style={styles.itemForm} floatingLabel>
                <Label>Email</Label>
                <Input
                  value={this.state.email}
                  onChangeText={email => this.setState({ email })}
                />
              </Item>
              <Button style={styles.btnEdit} full>
                <Text style={styles.txtBtnEdit}>Ubah</Text>
              </Button>
            </Form>
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
    padding: 10
  },
  imgStyle: {
    borderWidth: 2,
    borderColor: "white",
    padding: 2,
    width: 150,
    height: 150,
    marginTop: -50,
    borderRadius: 150
  },
  formInput: {
    padding: 10
  },
  itemForm: {
    marginBottom: 20,
    marginTop: 10,
    paddingTop: 10
  },
  btnEdit: {
    backgroundColor: "#4F65B6"
  },
  txtBtnEdit: {
    color: "white"
  },
  cameraStyle: {
    backgroundColor: "rgba(198, 200, 206, 0.5)",
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -40,
    marginLeft: 100
  },
  btnUploadImg: {
    backgroundColor: "rgba(198, 200, 206, 0.5)",
    alignSelf: "center",
    padding: 10,
    marginBottom: 20,
    marginTop: -10
  },
  txtBtnUploadImg: {
    color: "white"
  }
});
