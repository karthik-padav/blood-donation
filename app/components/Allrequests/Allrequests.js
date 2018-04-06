/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Text,
  View,
  StatusBar
} from 'react-native';
import NavigationExperimental from 'react-native-deprecated-custom-components';

export default class Allrequests extends Component {
    static navigationOptions = {
        title: 'Edit Profile'
    };
  render() {
    return (
        <View> <View>
        <StatusBar
          backgroundColor="blue"
          barStyle="light-content"
        />
        <NavigationExperimental.Navigator
          initialRoute={{statusBarHidden: true}}
          renderScene={(route, navigator) =>
            <View>
              <StatusBar hidden={route.statusBarHidden} />
              ...
            </View>
          }
        />
      </View>
          <Text>Allrequests</Text>
        </View>
    );
  }
}
