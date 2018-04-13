import React, {Component} from "react";
import {
  View,
  StyleSheet,
  AsyncStorage,
  ToastAndroid
} from "react-native";
import { Card, Button, Text } from "react-native-elements";
import { onSignOut, isSignedIn } from "../auth";
import { getUserData } from '../dataService';

export const USER_DATA = "auth-demo-key";

// export default ({ navigation }) => (
//   <View style={{ paddingVertical: 20 }}>
//     <Card title="John Doe">
//       <View
//         style={{
//           backgroundColor: "#bcbec1",
//           alignItems: "center",
//           justifyContent: "center",
//           width: 80,
//           height: 80,
//           borderRadius: 40,
//           alignSelf: "center",
//           marginBottom: 20
//         }}
//       >
//         <Text style={{ color: "white", fontSize: 28 }}>JD</Text>
//       </View>
//       <Button
//         backgroundColor="#03A9F4"
//         title="SIGN OUT"
//         onPress={() => onSignOut().then(() => navigation.navigate("SignedOut"))}
//       />
//     </Card>
//   </View>
// );

export default class Profile extends Component {

  componentDidMount(){
    console.log('Profile page');
    AsyncStorage.getItem(USER_DATA)
    .then(res => {
        if (res !== null) {
          console.log(res);
          getUserData(res)
            .then(res => {
              this.setState({ userData: res });
              console.log('get user data response');
              console.log(res);
              // if (this.state.userData.status == "user_not_found") {
              //   console.log();
              // } else {
              //   console.log(this.state);
              // }

            })
            .catch(err => ToastAndroid.show("An error occurred in fetching user data", ToastAndroid.SHORT));
        
        }
    }).catch(err => reject(err));
  }

  render() {
    return (
      <View>
          <Text> Stack popup </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({

});
