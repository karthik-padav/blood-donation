/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Text,
  View,
  Button
} from 'react-native';
import { StackNavigator } from 'react-navigation';

class Profile extends Component {
    static navigationOptions = {
        title: 'Profile',
    };
    render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Home Screen</Text>
          <Button
            title="Go to EditProfile"
            onPress={() => {
              /* 1. Navigate to the Details route with params */
              this.props.navigation.navigate('EditProfile', {
                itemId: 86,
                otherParam: 'anything you want here',
              });
            }}
          />
        </View>
      );
    }
}

class EditProfile extends Component {
    static navigationOptions = {
        title: 'Edit Profile'
    };
    render(){
        /* 2. Read the params from the navigation state */
        const { params } = this.props.navigation.state;
        const itemId = params ? params.itemId : null;
        const otherParam = params ? params.otherParam : null;
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text>Profile Screen</Text>
              <Text>itemId: {JSON.stringify(itemId)}</Text>
              <Text>otherParam: {JSON.stringify(otherParam)}</Text>
              <Button
                title="Go to Profile... again"
                onPress={() => this.props.navigation.navigate('Profile')}
              />
              <Button
                title="Go back"
                onPress={() => this.props.navigation.goBack()}
              />
            </View>
            );
    }
}

const RootStack = StackNavigator({
    Profile: {
        screen: Profile,
    },
    EditProfile: {
        screen: EditProfile
    },
},
{
    initialRouteName: 'Profile',
}
);

export default class ProfilePage extends Component {
  render() {
    return <RootStack />;
  }
}
