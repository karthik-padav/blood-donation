import React from "react";
import { Platform, StatusBar } from "react-native";
import {
  StackNavigator,
  TabNavigator,
  SwitchNavigator
} from "react-navigation";
import { FontAwesome } from "react-native-vector-icons";

import SignUp from "./screens/SignUp";
import SignIn from "./screens/SignIn";
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import EditProfile from "./screens/EditProfile";
import Otp from "./screens/Otp";

// const headerStyle = {
//   marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
// };

export const otpSceen = StackNavigator({
  Otp: {
    screen: Otp,
    navigationOptions: {
      header: null
    }
  },
  EditProfile: {
    screen: EditProfile
  }
});

export const SignedIn = TabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: "Home",
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarLabel: "Profile",
      }
    }
  },
  {
    tabBarPosition: 'bottom'
  }
);

export const createRootNavigator = (signedIn = false) => {
  return SwitchNavigator(
    {
      Otp: {
        screen: otpSceen,
      },
      SignedIn: {
        screen: SignedIn
      },
    },
    {
      initialRouteName: signedIn ? "SignedIn" : "SignedIn"
    }
  );
};