import React, { Component } from "react";
import { ActivityIndicator, View } from "react-native";
import { Provider } from "react-redux";
import AppContainer from "./_navigation/AppContainer";
import { store, persistore } from "./_redux/store";
import { PersistGate } from "redux-persist/integration/react";
import SocketContext from "./SocketContext";
import io from "socket.io-client";
import { socket_url } from "react-native-dotenv";
import OneSignal from "react-native-onesignal"; // Import package from node modules
import { onesignal_id } from "react-native-dotenv";
/**
 * primary color: 4F65B6
 */

const socket = io(socket_url);

type Props = {};
export default class App extends Component<Props> {
  constructor(prop) {
    super(prop);
    OneSignal.init(onesignal_id);

    OneSignal.addEventListener("received", this.onReceived);
    OneSignal.addEventListener("opened", this.onOpened);
    OneSignal.addEventListener("ids", this.onIds);
  }

  componentWillUnmount() {
    OneSignal.removeEventListener("received", this.onReceived);
    OneSignal.removeEventListener("opened", this.onOpened);
    OneSignal.removeEventListener("ids", this.onIds);
  }

  onReceived(notification) {
    console.log("Notification received: ", notification);
  }

  onOpened(openResult) {
    console.log("Message: ", openResult.notification.payload.body);
    console.log("Data: ", openResult.notification.payload.additionalData);
    console.log("isActive: ", openResult.notification.isAppInFocus);
    console.log("openResult: ", openResult);
  }

  onIds(device) {
    console.log("Device info: ", device);
  }

  renderLoading = () => (
    <View>
      <ActivityIndicator size="large" />
    </View>
  );
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistore} loading={this.renderLoading()}>
          <SocketContext.Provider value={socket}>
            <AppContainer />
          </SocketContext.Provider>
        </PersistGate>
      </Provider>
    );
  }
}
