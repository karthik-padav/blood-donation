import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import { TabNavigator } from 'react-navigation';
// import { Icon } from 'react-native-elements';

import Profile from '../Profile/Profile'
import Allrequests from '../Allrequests/Allrequests'

var MainScreenNavigator = TabNavigator({
    Profile: {screen: Profile},
    Requests: {screen: Allrequests},
},
{
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    tabBarOptions: {
        activeTintColor : 'white',
        inactiveTintColor : '#830303',
        inactiveBackgroundColor : 'white',
        activeBackgroundColor : '#830303',
        labelStyle: {
            fontSize: 10,
            padding: 0
        }
    }
});

// MainScreenNavigator.navigationOptions = {
//     title: "Tab example"
// };
export default MainScreenNavigator;