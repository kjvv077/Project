import React, { Component } from 'react';
import { StyleSheet, Platform, View, Dimensions } from 'react-native';
import 'react-native-gesture-handler';

import {createAppContainer } from 'react-navigation'; 
import { NavigationContainer } from '@react-navigation/native';
import {createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
//import { createBottomTabNavigator} from 'react-navigation'; 

//import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import HomeTab from './AddTabNavigator/HomeTab'
import SearchMapTab from './AddTabNavigator/SearchMapTab'
import CalendarTab from './AddTabNavigator/CalendarTab'
import MySettingTab from './AddTabNavigator/MySettingTab'
import HomePetTab from './AddTabNavigator/HomePetTab'
import PetCalendarTab from './AddTabNavigator/PetCalendarTab';
//import { Icon  } from 'native-base';
import { Ionicons} from '@expo/vector-icons';
const Tab= createBottomTabNavigator();

  /*HomeTab:{ screen: HomeTab },
  SearchMapTab:{ screen: SearchMapTab },
  CalendarTab:{ screen: CalendarTab },
  MySettingTab:{ screen: MySettingTab }

*/

const { height, width } = Dimensions.get("window");

export default () => {
    return (
      <View style={{height: height}}>
        <StatusBar/>
        <NavigationContainer >
        <Tab.Navigator>
            <Tab.Screen name="HomePetTab" component={HomePetTab}options={{       
              headerShown: false,
              tabBarIcon: () => (
                  <Ionicons
                      name="ios-home"
                      
                  />),}}
              />
            <Tab.Screen name="CalendarTab" component={PetCalendarTab} options={{
              headerShown: false,
              tabBarIcon: () => (
                  <Ionicons
                      name="calendar-outline"
                      
                  />),}}
           />
            <Tab.Screen name="SearchMapTab" component={SearchMapTab}options={{
              tabBarIcon: () => (
                  <Ionicons
                      name="location-outline"
                      
                  />),}}
             />
            <Tab.Screen name="MySettingTab" component={MySettingTab}options={{
              tabBarIcon: () => (
                  <Ionicons
                      name="person"
                      
                  />),}}
             />
           
        </Tab.Navigator>
    </NavigationContainer>
    </View>
    );
};
//export default createAppContainer(TabNavigation);
//const AppTabContainet = createAppContainer(AppTabNavigator);
/*
export default class MainScreen extends Component {
  render() {
    return <AppTabContainet/>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
/*
// const TabNavigation = createMaterialTopTabNavigator({
const TabNavigation = createMaterialTopTabNavigator({
  HomeTab:{ 
     screen: createStackNavigator({
		 	HomeTab : {
		 		screen: HomeTab,
		 		navigationOptions: {
		 			title: 'Home',
		 		}
		 	}
		 }), 
	  	screen: HomeTab, 
    navigationOptions: {
      tabBarIcon: ({ focused, tintColor }) => <Icon name='ios-home' style={{ color: tintColor }} />
    } 
  },
  SearchMapTab:{ 
		screen: SearchMapTab, 
    navigationOptions: {
      tabBarIcon: ({ focused, tintColor }) => <Icon name='ios-search' style={{ color: tintColor }} />
		}  
	},
  CalendarTab:{ screen: CalendarTab, 
    navigationOptions: {
      tabBarIcon: ({ focused, tintColor }) => <Icon name='ios-add-circle' style={{ color: tintColor }} />
		}  
	},
  MySettingTab:{ 
		screen: MySettingTab, 
    navigationOptions: {
      tabBarIcon: ({ focused, tintColor }) => <Icon name='ios-heart' style={{ color: tintColor }} />
		} 
	}
}, {
   animationEnabled: true,
   swipeEnabled: true,
   tabBarPosition: "bottom",
  tabBarOptions: {
    style: {
      backgroundColor:'white'
    },
    iconStyle: { 
      ...Platform.select({
        ios:{
          height: 35,
          marginBottom: 20
        }
      }) 
    },
    activeTintColor: '#000',
    inactiveTintColor: '#d1cece',
    upperCaseLabel: false,
    showLabel: false,
    showIcon: true,
  },
  defaultNavigationOptions: {
    header: null
  }
});



const AppTabNavigator = createBottomTabNavigator({
  HomeTab: { screen: HomeTab },
  SearchMapTab: { screen: SearchMapTab },
  CalendarTab: { screen: CalendarTab },
  MySettingTab: { screen: MySettingTab }
});*/

