import { AsyncStorage } from "react-native";
import RNAccountKit from 'react-native-facebook-account-kit';
export const USER_DATA = "auth-demo-key";
// export const onSignIn = () => {
//     RNAccountKit.getCurrentAccount()
//     .then((account) => {
//       this.userInfo = account;
//       this.userInfo.token = token.token;
//       console.log('user info auth page')
//       console.log(this.userInfo);
//       AsyncStorage.setItem(USER_DATA, JSON.stringify(this.userInfo));
//     })
// };
export const onSignOut = () => AsyncStorage.removeItem(USER_DATA);

export const isSignedIn = () => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem(USER_DATA)
        .then(res => {
            if(res!== null){
                resolve(true);
            } else {
                resolve(false);
            }
        }).catch (err => reject(err));
    });
};