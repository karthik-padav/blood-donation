import { AsyncStorage } from "react-native";
import RNAccountKit from 'react-native-facebook-account-kit';
export const USER_DATA = "auth-demo-key";

export const onSignIn = () => {
    return new Promise((resolve, reject) => {
    RNAccountKit.getCurrentAccount()
        .then((account) => {
            if (account !== null) {
                console.log('auth page');
                console.log(account);
                this.userInfo = account;
                AsyncStorage.setItem(USER_DATA, JSON.stringify(this.userInfo))
                .then(res => {
                    resolve(true);
                }).catch(err => reject(err));
            } else {
                resolve(false);
            }
        }).catch(err => reject(err));

    })
};

export const onSignOut = () => {
    AsyncStorage.removeItem(USER_DATA);
    // RNAccountKit.logout()
    //     .then(() => {
    //         console.log('Logged out');
    //     })
};

export const isSignedIn = () => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem(USER_DATA)
            .then(res => {
                if (res !== null) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            }).catch(err => reject(err));
    });
};