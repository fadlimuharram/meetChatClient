import React from "react";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import Chats from "../enhance/Chats";
import Timeline from "../enhance/TImeline";
import Profile from "../enhance/Profile";
import Friends from "../enhance/Friends";

export default createMaterialBottomTabNavigator({
  Chats: {
    screen: Chats
  },
  Friends: {
    screen: Friends
  },
  Timeline: {
    screen: Timeline
  },
  Profile: {
    screen: Profile
  }
});
