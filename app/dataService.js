const Base_url = 'http://192.168.1.249:8080'


export const getUserData = (userInfo) => {
    console.log(userInfo);
    console.log('getUserData API called');
    return new Promise((resolve, reject) => {
        fetch(Base_url + '/getUserData', {
            method: 'POST',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(userInfo.phoneNumber)
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson !== null) {
                    console.log('API response');
                    console.log(responseJson);
                    resolve(responseJson);
                } else {
                    resolve(false);
                }
            }).catch(err => {
                console.log(err);
                reject(err)
            });
    });
};

export const regUser = (userData) => {
    console.log('userData');
    return new Promise((resolve, reject) => {
        fetch(Base_url + '/register', {
            method: 'POST',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(userData)
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson !== null) {
                    resolve(responseJson);
                } else {
                    resolve(false);
                }
            }).catch(err => reject(err));
    });
};