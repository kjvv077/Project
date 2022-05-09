import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert, Button, TextInput, View, StyleSheet, Text, Image } from 'react-native';
import { TouchableOpacity } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import * as Font from "expo-font"
import {createStackNavigator} from 'react-navigation-stack'
import MainScreen from "./Components/MainScreen";


export default class App extends Component {


  constructor(props) {
    super(props);
    
    this.state = {
      username: '',
      password: '',
      fontLoaded:false
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'bodum-font': require('./assets/fonts/SingleDay-Regular.ttf')
    }).then(()=>{
      this.setState({
        fontLoaded: true
      })
    })
  }

  
  onLogin() {
    const { username, password } = this.state;

    Alert.alert('Credentials', `${username} + ${password}`);
  }
  goMainScreen(){ 
    this.props.navigation.navigate("screen2");
   }



  render() {
    const{fontLoaded} = this.state;
    if(!fontLoaded){return null;}
    else{
    return (
      <View style={styles.container}>
      <StatusBar style="auto" />
        <View style={{flexDirection:'row', alignItems:"baseline" }}>
        <Text style ={styles.textStyle}>보듬</Text>
        <Image
            source={require("./assets/images/발바닥.png")}
            style={styles.image}
            />
        </View>  
        <Button onPress={()=> this.goMainScreen()}
          title={'Google Login'}
          //onPress={this.onLogin.bind(this)}
          
        />
      
    
            
    </View>
    );
  }
}}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginTop:-100,
  },
  image: {
    transform: [{ rotate: '15deg'}],
    marginLeft:-2,
    width: 70,
    height: 50,      
    },
  textStyle: {
    //글자 색을 결정합니다. rgb, 값 이름, 색상코드 모두 가능합니다
    color:"#696969",
    //글자의 크기를 결정합니다
    fontSize:70,
    //글자의 두께를 결정합니다
    fontWeight:"700",
    //가로기준으로 글자의 위치를 결정합니다
    fontFamily:'bodum-font',
    marginLeft:55,
    marginBottom:50
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
});
