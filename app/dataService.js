const Base_url = 'http://192.168.1.240:8080'


export const getUserData = (userInfo) => {
    console.log('user Info Api params in data service page');
    console.log(userInfo);
    return new Promise((resolve, reject) => {

        fetch(Base_url + '/getUserData', {
            method: 'POST',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(userInfo)
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