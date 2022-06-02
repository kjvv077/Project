import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert, Button, TextInput, View, StyleSheet, Text, Image,Keyboard,TouchableWithoutFeedback } from 'react-native';
import { TouchableOpacity } from "react-native";
import * as Font from "expo-font"
import {signInWithEmailAndPassword} from "firebase/auth"
import { auth } from './config';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default class App extends Component {


  constructor(props) {
    super(props);

    this.state = {
      email:'',
      password:'',
      fontLoaded: false,
      ready: false,
    };
  }

  async componentDidMount() {
    const {ready} = this.state;
      setTimeout(() => {
      AsyncStorage.getItem('session', (err, result) => {
        console.log('ASYNCSTORAGE');
        console.log(result);
        if (result) {
          this.goMainScreen();
        } else {
          console.log('ready');
        }
      });
      console.log('ready');
    }, 1000);
    await Font.loadAsync({
      'bodum-font': require('./assets/fonts/SingleDay-Regular.ttf'),
      'garam':require('./assets/fonts/GARAM.ttf')
    }).then(() => {
      this.setState({
        fontLoaded: true
      })
    })
  }

  


  async onLogin() {
    const {email, password} = this.state;
    try {
        const user = await signInWithEmailAndPassword(
            auth,
            email, password
        );
        await AsyncStorage.setItem('session', email);
        this.goMainScreen();
    } catch (error) {
        if (error.message=='Firebase: Error (auth/user-not-found).')  Alert.alert("가입되지 않은 이메일입니다.");
        else if (error.message=='Firebase: Error (auth/user-not-found).') Alert.alert("이메일을 입력헤주세요.");
        else if (error.message=='Firebase: Error (auth/invalid-email).') Alert.alert("이메일을 확인하세요");
        else if (error.message=='Firebase: Error (auth/internal-error).') Alert.alert("비밀번호를 입력하세요");
        else if (error.message=='Firebase: Error (auth/wrong-password).') Alert.alert("비밀번호를 확인하세요");
        else Alert.alert("다시 시도해주세요");

        console.log(error.message);
    }
};

  goMainScreen() {
    this.props.navigation.navigate("CheckView");
  }
  goSignScreen() {
    this.props.navigation.navigate("signup");
  }



  render() {
    const { fontLoaded } = this.state;
    const {ready} = this.state;
    if (!fontLoaded) { return null; }
    else {
      return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <StatusBar style="auto" />
          <View style={{ flexDirection: 'row', alignItems: "baseline" }}>
            <Text style={[styles.textStyle,{fontFamily:'bodum-font'}]}>보듬</Text>
            <Image
              source={require("./assets/images/foot.png")}
              style={styles.image}
            />
          </View>
          <View style={{ flexDirection: 'row', marginLeft: -30, marginTop: -20 }}>
            <Text style={styles.inputs} >이메일 :</Text>
            <TextInput style={styles.inputBox} placeholder='이메일을 입력해주세요'
              onChangeText={(value) => this.setState({email:value})}></TextInput>
          </View>
          <View style={{ flexDirection: 'row', marginLeft: -30 }}>
            <Text style={styles.inputs}>비밀번호 :</Text>
            <TextInput style={[styles.inputBox, { marginLeft: 10 }]} secureTextEntry
              placeholder='6자 이상 입력해주세요'
              onChangeText={(value) => this.setState({password:value})}></TextInput>
          </View>
          <View style={{ marginLeft:240, marginTop: 23 }}>
            <TouchableOpacity style={styles.login} onPress={this.onLogin.bind(this)}
            ><Text style={styles.loginText}>로그인하기</Text></TouchableOpacity>
          </View>
          <Text style={{fontSize:15,color:'#A4A4A4',marginTop:60}}>아직 가입하지 않았다면</Text>
          <Button onPress={() => this.goSignScreen()}
            title={'회원가입하기'}

          />

        </View>
        </TouchableWithoutFeedback>
      )
    }
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginTop: -100,
  },
  image: {
    transform: [{ rotate: '15deg' }],
    marginLeft: -2,
    width: 70,
    height: 50,
  },
  textStyle: {
    color: "#696969",
    fontSize: 70,
    fontWeight: "500",
    marginLeft: 55,
    marginBottom: 50
  },
  button: {
    width: 80,
    height: 40,
    backgroundColor: "#ad9d9d",
    borderRadius: 4.5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 17,
    fontWeight: "400",
    color: "#fff",
  },
  text: {
    fontSize: 35,
    fontFamily: 'bodum-font',
  },
  inputs:
  {
    fontSize: 32, fontFamily: 'garam', marginLeft: 25, marginTop: 20,
    color: '#045FB4'
  },
  inputBox:
  {
    borderWidth: 2, borderColor: 'skyblue', borderRadius: 10, height: 40, width: 230,
    marginLeft: 33, marginTop: 23, padding: 10
  },
  login: {
    backgroundColor: 'lightgray', borderRadius: 6,
    paddingHorizontal: 10, paddingVertical: 5, justifyContent: 'center'
  }, loginText: { fontSize: 25, fontFamily: 'garam' },
  
});
