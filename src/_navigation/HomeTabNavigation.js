import React from "react";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import Chats from "../enhance/Chats";
import Timeline from "../enhance/TImeline";
import Profile from "../enhance/Profile";
import Friends from "../enhance/Friends";
import {
  ChatIcon,
  FriendsIcon,
  TimelineIcon,
  ProfileIcon
} from "../assets/svg";
export default createMaterialBottomTabNavigator(
  {
    Chats: {
      screen: Chats,
      navigationOptions: {
        tabBarIcon: ({ tintColor, focused }) => (
          <ChatIcon size="20" color="black" />
        )
      }
    },
    Friends: {
      screen: Friends,
      navigationOptions: {
        tabBarIcon: ({ tintColor, focused }) => (
          <FriendsIcon size="20" color="black" />
        )
      }
    },
    Timeline: {
      screen: Timeline,
      navigationOptions: {
        tabBarIcon: ({ tintColor, focused }) => (
          <TimelineIcon size="20" color="black" />
        )
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarIcon: ({ tintColor, focused }) => (
          <ProfileIcon size="20" color="black" />
        )
      }
    }
  },
  {
    barStyle: { backgroundColor: "#F7F7F7" }
  }
);
