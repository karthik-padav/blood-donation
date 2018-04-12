import React, { Component } from 'react';
import {
  Button,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Picker,
  StyleSheet,
  ScrollView,
  ToastAndroid,
  Image,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { regUser } from '../dataService';

// var ImagePicker = NativeModules.ImageCropPicker;

export default class EditProfile extends Component {
  static navigationOptions = {
    headerTitle: 'Edit profile',
    headerRight: (
      <Button
        onPress={() => alert('This is a button!')}
        title="Info"
        color="#fff"
      />
    ),
  };
  constructor(props) {
    super(props)

    const {state} = props.navigation;
    console.log('data from otp page');
    console.log(state.params);

    this.state = {
      userData: {
        'name': '',
        'phone_number': state.params?state.params.number:'',
        'country_code': state.params?state.params.countryCode: '',
        'email': '',
        'gender': 'Male',
        'user_dp': '',
        'blood_group': 'O+',
        'age': '',
        'location': ''
      }
    };
    this.userData = this.state.userData;
  }
  // Image picker with camara
  pickSingleWithCamera(cropit, circular = false) {
    ImagePicker.openCamera({
      width: 500,
      height: 500,
      cropping: cropit,
      cropperCircleOverlay: circular,
      compressImageMaxWidth: 640,
      compressImageMaxHeight: 480,
      compressImageQuality: 0.5,
      compressVideoPreset: 'MediumQuality',
      includeBase64: true,
      includeExif: true,
    }).then(image => {
      // console.log('received image', image);
      this.userData.user_dp = {
        'image': image.data,
        'cropRect-width': image.cropRect.width,
        'cropRect-height': image.cropRect.height,
        'cropRect-y': image.cropRect.y,
        'cropRect-x': image.cropRect.x
      };
      this.setState({ userData: this.userData });
    }).catch(e => alert(e));
  }

  // Image picker from gallery
  pickSingle(cropit, circular = false) {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: cropit,
      cropperCircleOverlay: circular,
      compressImageMaxWidth: 640,
      compressImageMaxHeight: 480,
      compressImageQuality: 0.5,
      compressVideoPreset: 'MediumQuality',
      includeBase64: true,
      includeExif: true,
    }).then(image => {
      // console.log('received image', image);
      this.userData.user_dp = {
        'image': image.data,
        'cropRect-width': image.cropRect.width,
        'cropRect-height': image.cropRect.height,
        'cropRect-y': image.cropRect.y,
        'cropRect-x': image.cropRect.x
      };
      this.setState({ userData: this.userData });
    }).catch(e => {
      console.log(e);
      Alert.alert(e.message ? e.message : e);
    });
  }

  // Submit user data
  submitUserData() {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    console.log(this.state);
    if(!this.state.userData.name){
      console.log('invalid name');
      this.setState({invalidName: true});
    } else {
      this.setState({invalidName: false});
    }
    if(!this.state.userData.age){
      console.log('invalid age');
      this.setState({invalidAge: true});
    } else {
      this.setState({invalidAge: false});
    }
    if(reg.test(this.state.userData.email) === false){
      console.log('invalid email');
      this.setState({invalidEmail: true});
    } else {
      this.setState({invalidEmail: false});
    }
    regUser(this.state.userData)
      .then(res => {
        console.log(res);
        if(res.status == 'Success'){
          this.props.navigation.navigate("SignedIn");
          ToastAndroid.show("Hi " + res.userData.name +"", ToastAndroid.SHORT);
        }
      })
      .catch(err => ToastAndroid.show("An error occurred in fetching user data", ToastAndroid.SHORT));
  }


  render() {
    return (
      <ScrollView
      // keyboardDismissMode = 'on-drag'
      >
        <View style={styles.container}>
          <Text>Edit porfile </Text>
          <TouchableOpacity onPress={() => this.pickSingleWithCamera(true, true)}>
            <Text>Select Single With Camera With Cropping</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.pickSingle(true)}>
            <Text>Select Single With Cropping</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.pickSingle(true, true)}>
            <Text>Select Single With Circular Cropping</Text>
          </TouchableOpacity>

          <View style={styles.userDpWrapper}>
            <Image style={styles.userDp} source={require('../images/User-blue-icon.png')} />
            <Text style={styles.changeDpText}>Change Photo</Text>
          </View>

          <View>
            <View style={styles.userInputWrapper}>
              <Text style={[styles.userInputLabel, this.state.invalidName ? styles.error : '']}>Name</Text>
              <TextInput
                placeholder="Name"
                // autoFocus = {true}
                underlineColorAndroid="transparent"
                placeholderTextColor='#95a5a6'
                returnKeyType={"next"}
                onSubmitEditing={() => { this.secondTextInput.focus(); }}
                onChangeText={(name) => {
                  this.userData.name = name;
                  this.setState({ userData: this.userData })
                }}
                value={this.state.userData.name}
                style={styles.userInput} />
            </View>

            <View style={styles.userInputWrapper}>
              <Text style={[styles.userInputLabel, , this.state.invalidAge ? styles.error : '']}>Age</Text>
              <TextInput
                placeholder="Age"
                placeholderTextColor='#95a5a6'
                ref={(input) => { this.secondTextInput = input; }}
                returnKeyType={"next"}
                onSubmitEditing={() => { this.thirdTextInput.focus(); }}
                underlineColorAndroid="transparent"
                keyboardType='numeric'
                onChangeText={(age) => {
                  this.userData.age = age;
                  this.setState({ userData: this.userData })
                }}
                value={this.state.userData.age}
                style={styles.userInput} />
            </View>

            <View style={styles.userInputWrapper}>
              <Text style={[styles.userInputLabel, , this.state.invalidEmail ? styles.error : '']}>Email</Text>
              <TextInput
                placeholder="Email"
                keyboardType='email-address'
                ref={(input) => { this.thirdTextInput = input; }}
                placeholderTextColor='#95a5a6'
                underlineColorAndroid="transparent"
                onChangeText={(email) => {
                  this.userData.email = email;
                  this.setState({ userData: this.userData })
                }}
                value={this.state.userData.email}
                style={styles.userInput} />
            </View>

            <View style={styles.userInputWrapper}>
              <Text style={styles.userInputLabel}>Phone number</Text>
              <TextInput
                placeholder="Phone Number"
                // placeholderTextColor='#95a5a6'
                editable={false} selectTextOnFocus={false}
                value={this.state.userData.phone_number}
                style={styles.userInput} />
            </View>

            <View style={styles.userInputWrapper}>
              <Text style={styles.userInputLabel}>Gender</Text>
              <Picker
                style={styles.userPicker}
                selectedValue={this.state.userData.gender}
                mode='dropdown'
                onValueChange={(itemValue, itemIndex) => {
                  this.userData.gender = itemValue;
                  this.setState({ userData: this.userData })
                }}
              >
                <Picker.Item label="Male" value="Male" />
                <Picker.Item label="Female" value="Female" />
              </Picker>
            </View>

            <View>
              <Text style={styles.userInputLabel}>Blood group</Text>
              <Picker
                style={styles.userPicker}
                selectedValue={this.state.userData.blood_group}
                mode='dropdown'
                onValueChange={(itemValue, itemIndex) => {
                  this.userData.blood_group = itemValue;
                  this.setState({ userData: this.userData })
                }}
              >
                <Picker.Item label="O+" value="O+" />
                <Picker.Item label="O-" value="O-" />
                <Picker.Item label="A+" value="A+" />
                <Picker.Item label="A-" value="A-" />
                <Picker.Item label="B+" value="B+" />
                <Picker.Item label="B-" value="B-" />
                <Picker.Item label="AB+" value="AB+" />
                <Picker.Item label="AB-" value="AB-" />
              </Picker>
            </View>

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => this.submitUserData()}
            >
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>

          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  error: {
    color: 'red'
  },
  buttonContainer: {
    backgroundColor: '#2980b9',
    paddingVertical: 15,
    marginTop: 10
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  userDp: {
    width: 70,
    height: 70,
  },
  userDpWrapper: {
    alignItems: 'center',
    marginBottom: 15,
  },
  changeDpText: {
    textAlign: 'center',
    marginTop: 5,
    fontSize: 15,
    fontWeight: 'bold'
  },
  userInput: {
    // height: 40,
    paddingHorizontal: 10,
    color: '#34495e',
    fontSize: 15,
  },
  userInputWrapper: {
    borderBottomWidth: 0.5,
    borderColor: '#95a5a6'
  },
  userPicker: {
    // height: 40,
    paddingHorizontal: 10,
    color: '#34495e',
    borderBottomWidth: 0.5,
  },
  userInputLabel: {
    paddingLeft: 10,
    marginTop: 10,
    color: '#34495e',
    fontSize: 15,
  }
})