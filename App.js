import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack'
import MainScreen from './Components/MainScreen';
import {name as appName} from './app.json';
import { Navigation } from 'react-navigation';
import LoadingScreen from './LoadingScreen'
/*
Navigation.startSingleScreenApp({
  screen: {
    screen: LoadingScreen, // unique ID registered with Navigation.registerScreen
    title: 'Welcome', // title of the screen as appears in the nav bar (optional)
    navigatorStyle: {
      navBarHidden: false,
    }, // override the navigator style for the screen, see "Styling the navigator" below (optional)
    navigatorButtons: {} // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
  }
});
*/

const AppStackNavigator = createStackNavigator({
  
     screen1: {
       screen:LoadingScreen,
       navigationOptions:{
         headerShown:false,
    }
      } // MainScreen 컴포넌트를 네비게이터에 등록
  ,
    screen2: {
      screen: MainScreen,
      navigationOptions:{
        headerShown:false,
   }
     } 

},
{initialRouteName: 'screen1',}
);

export default createAppContainer(AppStackNavigator);