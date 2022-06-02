import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoadingScreen from './LoadingScreen';
import MainScreen from './Components/MainScreen';
import SignUp from './SignUp';


const AppStackNavigator = createStackNavigator({

  screen1: {
    screen: LoadingScreen,
    navigationOptions: {
      headerShown: false,
    }
  },
  CheckView: {
    screen: MainScreen,
    navigationOptions: {
      headerShown: false,
    }
  },
  signup: {
    screen: SignUp,
    navigationOptions: {
      headerShown: false,
    }
  }// MainScreen 컴포넌트를 네비게이터에 등록
},
  { initialRouteName: 'screen1', }
);

export default createAppContainer(AppStackNavigator);
