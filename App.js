// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  * @flow
//  */

// import React, { Component } from 'react';
// import {
//   Text,
//   View,
//   Navigator,
// } from 'react-native';
// import Otp from './app/components/Otp/Otp';
// import Tabs from './app/components/Tabs/Tabs';
// import NavigationExperimental from 'react-native-deprecated-custom-components';
// import EditProfile from './app/components/EditProfile/EditProfile';


// fetchData = async () => {
//   try {
//     const value = await AsyncStorage.getItem('MySuperStore');
//     if (value !== null) {
//       // We have data!!
//       console.log(value);
//     }
//   } catch (error) {
//     // Error retrieving data
//     console.log('Error retrieving data');
//   }
// }

// export default class App extends Component {
//   componentWillMount() {
//     // this.fetchData();
//   }
//   render() {
//     return (
//       <NavigationExperimental.Navigator
//         initialRoute={{ name: 'tabPage' }}
//         renderScene={RouteMapper}
//       />
//     );
//   }
// }

// const RouteMapper = (route, navigator) => {
//   if (route.name === 'OtpPage') {
//     return <Otp navigator={navigator} />
//   } else if (route.name == 'tabPage') {
//     return <Tabs navigator={navigator} />
//   } else if (route.name == 'editPage') {
//     return <EditProfile navigator={navigator} />
//   }
// }
import App from "./app/index";
export default App;