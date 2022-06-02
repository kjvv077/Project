import React, { Component } from 'react';
import { StyleSheet, Platform, View, Dimensions } from 'react-native';
import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import {createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import SearchMapTab from './AddTabNavigator/SearchMapTab'
import CalenderView from './AddTabNavigator/PetCalendarTab';
import WriteView from './AddTabNavigator/WriteView'
import HomePetTab from './AddTabNavigator/PetInsert';
import CheckView from './AddTabNavigator/CheckTab';
import FirstView from './AddTabNavigator/CameraTab'
import CheckDots from './AddTabNavigator/CheckDots'
import Modify from './AddTabNavigator/Modify'
import Logout from '../LoadingScreen'
import { Ionicons} from '@expo/vector-icons';
import TodoTab from './AddTabNavigator/TodoTab'
import Signup from '../SignUp';
const Tab= createBottomTabNavigator();
const Stack = createStackNavigator();

const CalenderStack = () => {
    return(
      <Stack.Navigator initialRouteName="FirstView">
        <Stack.Screen
          name="CalenderView"
          component={CalenderView}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name="WriteView"
          component={WriteView}
          options={{ headerShown:true,   headerTitle: '이상증상',
            headerBackTitleVisible: false, 
            headerStyle:{height:100},
            headerTitleStyle: {fontSize: 24}}}
        />
        <Stack.Screen
          name="CheckDots"
          component={CheckDots}
          options={{ headerShown:true,   headerTitle: '기록날짜',
            headerBackTitleVisible: false, 
            headerStyle:{height:100},
            headerTitleStyle: {fontSize: 24}}}
        />
      </Stack.Navigator>
    );
  }


  const CheckStack = () => {
    return(
      <Stack.Navigator initialRouteName="CheckView">
        <Stack.Screen
          name="CheckView"
          component={CheckView}
          options={{headerShown:false}}
        />
         <Stack.Screen
          name="logout"
          component={Logout}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name="signup"
          component={Signup}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name="InsertView"
          component={HomePetTab}
          options={{ headerShown:true,   headerTitle: '추가등록',
            headerBackTitleVisible: false, 
            headerStyle:{height:100},
            headerTitleStyle: {fontSize: 20}}}
        />
         <Stack.Screen
          name="Modify"
          component={Modify}
          options={{ headerShown:true,   headerTitle: '수정',
            headerBackTitleVisible: false, 
            headerStyle:{height:100},
            headerTitleStyle: {fontSize: 20}}}
        />
      </Stack.Navigator>
    );}

export default () => {
    return (
      <View style={{flex:1}}>
        <StatusBar/>
        <NavigationContainer>
        <Tab.Navigator>
            <Tab.Screen name="Home" component={CheckStack}options={{
         headerShown: false,
              tabBarIcon: () => (
                  <Ionicons
                      name='ios-home'
                  />),}}
             /> 
              <Tab.Screen name="To-do" component={TodoTab}options={{
         headerShown: false,
              tabBarIcon: () => (
                  <Ionicons
                      name="checkbox-outline"
                     
                  />),}}
             />
            <Tab.Screen name="캘린더" component={CalenderStack} options={{
              headerShown: false,
              tabBarIcon: () => (
                  <Ionicons
                      name="calendar-outline"
                      
                  />),}}
           />
            <Tab.Screen name="지도" component={SearchMapTab}options={{
              headerShown:false,
              tabBarIcon: () => (
                  <Ionicons
                      name="location-outline"
                      
                  />),}}
             />
       
            <Tab.Screen name="카메라" component={FirstView}options={{
              headerShown: false,
              tabBarIcon: () => (
                  <Ionicons
                      name="camera-outline"
                      
                  />),}}
             />
           
        </Tab.Navigator>
    </NavigationContainer>
    </View>
    );
};
