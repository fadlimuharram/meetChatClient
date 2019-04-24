import React from "react";
import { createStackNavigator, createDrawerNavigator } from "react-navigation";
import TabNav from "./HomeTabNavigation";
import Chat from "../enhance/Chat";

export default createStackNavigator({
  TabNav: {
    screen: TabNav
  },
  Chat: {
    screen: Chat
  }
});
