import  React, { useState,useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Calendar } from "react-native-calendars";
import { Ionicons } from '@expo/vector-icons'; 
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, ScrollView, View, Button, Text,
  Alert, TouchableHighlight, TouchableOpacity } from "react-native";
import * as Font from "expo-font"

function DetailSettingView(){

  return (
    <View style={styles.container}>
    <NavigationContainer>
      <StatusBar style='dark'></StatusBar>
    <Ionicons name="chevron-back-sharp" size={24} color="black" style={styles.back}/>
    <View style={{alignItems: 'center', justifyContent:'center', borderBottomWidth:1}}><Text style={styles.title}>설정</Text></View>
    <ScrollView>
      <View style={{marginTop:20}}>
      <TouchableOpacity style={styles.box}>
          <Text style={styles.menuText}>개인정보 수정</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.box}>
          <Text style={styles.menuText}>사용자 연결하기</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.box}>
          <Text style={styles.menuText}>회원탈퇴</Text>
      </TouchableOpacity>
      </View>
    </ScrollView>
    </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop: 50,
  },
  title:{
    marginTop:20,
    fontSize:37,
    color: 'gray',
    borderBottomWidth:20
  },
  box:{
    height:50,
    marginLeft:10,
  },
  menuText: {
    fontSize:20,
  },
  back:{position: 'absolute', marginLeft:10,marginTop:10}
});


export default DetailSettingView;