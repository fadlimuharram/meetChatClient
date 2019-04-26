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
import Loading from "../components/Loading";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

export default class Profile extends Component {
  state = {
    username: "",
    email: "",
    avatarSource: null,
    latitude: null,
    longitude: null,
    teslong: "-122.084",
    error: null
  };

  componentDidMount() {
    const { username, email } = this.props.user;
    this.setState({
      username,
      email
    });
    this.watchId = navigator.geolocation.watchPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null
        });
      },
      error => this.setState({ error: error.message }),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 10
      }
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
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
    this.setState({
      avatarSource: ""
    });
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
        {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
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
    if (this.props.isLoading) {
      return <Loading />;
    }
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
                <Text style={styles.txtBtnEdit}>
                  Ubahh {this.state.latitude}
                </Text>
              </Button>
              {this.state.latitude && this.state.longitude && (
                <MapView
                  style={styles.mapStyle}
                  region={{
                    latitude: this.state.latitude,
                    longitude: parseFloat(this.state.teslong),
                    latitudeDelta: 0.003,
                    longitudeDelta: 0.003
                  }}
                  showsUserLocation={true}
                />
              )}
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
  },
  mapStyle: {
    width: "100%",
    height: 200,
    marginTop: 20
  }
});
