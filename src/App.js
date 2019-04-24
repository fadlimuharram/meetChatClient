import React, { Component } from "react";
import { ActivityIndicator, View } from "react-native";
import { Provider } from "react-redux";
import AppContainer from "./_navigation/AppContainer";
import { store, persistore } from "./_redux/store";
import { PersistGate } from "redux-persist/integration/react";
import SocketContext from "./SocketContext";
import io from "socket.io-client";
import { api_url } from "react-native-dotenv";
/**
 * primary color: 4F65B6
 */

const socket = io(api_url);

type Props = {};
export default class App extends Component<Props> {
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
