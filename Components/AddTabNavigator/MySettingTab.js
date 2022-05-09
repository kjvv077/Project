import  React, { useState,useEffect,Component } from "react";
import { StatusBar } from "expo-status-bar";
import { SimpleLineIcons } from '@expo/vector-icons';
import { StyleSheet, ScrollView, View, Button, Text,
  Alert, TouchableHighlight, TouchableOpacity, Dimensions } from "react-native";
import * as Font from "expo-font"
import {createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import DetailSetting from './DetailSetting'
import { NavigationContainer } from "@react-navigation/native";


class SettingView extends Component {

 constructor(props) {
     super(props);
 }

goDatail(){
    this.props.navigation.navigate('Detail');
}

render(){
  return (
    <View style={styles.container}>
      <StatusBar style='dark'></StatusBar>
    <View style={{alignItems:'flex-end'}}>
        <TouchableOpacity onpress={()=>this.goDatail()}><SimpleLineIcons name="settings" size={30} color="black" style={{marginRight:20, marginTop:20}} /></TouchableOpacity>
    </View>
    <ScrollView>
      <View style={{flexDirection: 'row',justifyContent:'space-evenly'}}>
      <View style={{flexDirection: 'column', width:100}}>
      <View style={styles.image}/>
      <View style={styles.nameBox}><Text style={styles.name}>나</Text></View>
      </View>
      <View style={{flexDirection: 'column', width:100}}>
      <View style={styles.image}/>
      <View style={styles.nameBox}><Text style={styles.name}>공유인1</Text></View>
      </View>
      <View style={{flexDirection: 'column', width:100}}>
      <View style={styles.image}/>
      <View style={styles.nameBox}><Text style={styles.name}>공유인2</Text></View>
      </View>
      </View>
    </ScrollView>
    </View>
  );
 }
}

const styles = StyleSheet.create({
    container:{
      flex:1,
    }, 
    image:{
      marginTop:20,
      width:100, height:100, 
      borderRadius:50, 
      backgroundColor:'skyblue'
    },
    name:{
      fontSize:24,
      marginTop:10
    },
    nameBox:{
      alignItems:'center',justifyContent:'center'
    }
  });
  


export default SettingView;