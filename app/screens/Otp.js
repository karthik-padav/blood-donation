/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Text,
  View,
  AsyncStorage,
  Image,
  Button,
  TouchableOpacity,
  ToastAndroid,
  StyleSheet
} from 'react-native';
import RNAccountKit from 'react-native-facebook-account-kit';
export const USER_DATA = "auth-demo-key";

import { getUserData } from '../dataService';
import { onSignIn } from "../auth";

export default class Otp extends Component {

  constructor(props) {
    super(props);

    this.state = {
      userData: '',
    };
  }

  componentDidMount() {
    // Configures the SDK with some options
    RNAccountKit.configure({
      initialPhoneCountryPrefix: '+91',
      initialPhoneNumber: '9538001583',
    })
  }

  displayOtpScreen = () => {
    RNAccountKit.loginWithPhone()
      .then((token) => {
        if (!token) {
          console.log('Login cancelled');
        } else {
          RNAccountKit.getCurrentAccount()
            .then((account) => {
              console.log("Account info ");
              console.log( account);
              this.userInfo = account;
              this.userInfo.token = token.token;

              // Check for existing user
              getUserData(this.userInfo)
                .then(res => {
                  this.setState({ userData: res });
                  console.log('get user data response');
                  console.log(res);
                  if (this.state.userData.status == "user_not_found") {
                    this.props.navigation.navigate('EditProfile', {
                      "countryCode": this.userInfo.phoneNumber.countryCode,
                      "number": this.userInfo.phoneNumber.number
                    });
                  } else {
                    onSignIn().then(() => {
                      this.props.navigation.navigate("SignedIn");
                    }).catch(err => ToastAndroid.show("An error occurred in storing user data locally", ToastAndroid.SHORT));;
                  }

                })
                .catch(err => ToastAndroid.show("An error occurred in fetching user data", ToastAndroid.SHORT));
            })
        }
      })
  }

  render() {
    return (
      <View style={styles.formContainer}>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={this.displayOtpScreen}
        >
          <Text style={styles.loginButtonText}> Login </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d63031',
  },
  formContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center'
  },
  logo: {
    width: 100,
    height: 100
  },
  loginButton: {
    backgroundColor: '#0984e3',
    paddingVertical: 10
  },
  loginButtonText: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: "#ffffff"
  },
});
