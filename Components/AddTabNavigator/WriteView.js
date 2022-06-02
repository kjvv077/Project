import  React, { useState,useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text,
  Alert, TouchableOpacity,TextInput,TouchableWithoutFeedback, Keyboard } from "react-native";
import * as Font from "expo-font"
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  collection,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { db, auth } from "../../config";


function WriteView() {

  const [animalId,setanimalId] = useState("");
  const [animalname,setAnimalName] = useState("")
  const [day, setDay] = useState("");
  const[content,setContent]=useState("");
  const[co,setCo]=useState("");

  useEffect(() => {
    const firstLoad = async () => {
      try {
        const selectedday = await AsyncStorage.getItem("Day");
        const savedNickname2 = await AsyncStorage.getItem("animalname");
        const savedNickname = await AsyncStorage.getItem("animal");
        console.log(savedNickname)

        setanimalId(savedNickname);
        setAnimalName(savedNickname2);
        setDay(selectedday);

        await GetDetails(selectedday,savedNickname);

        console.log(animalId);
        console.log(selectedday);
        console.log(content);
      } catch (err) {
        console.log(err);
      }
    };
    firstLoad();
  }, []);


  const onChangeText =async (content)=>{
    setContent(content);
    console.log(content);
  }



  const Create = async () => {
    const aniRef = collection(db,"동물");
    const docRef = doc(aniRef, animalId.toString());
    const aniRef2 = collection(docRef,"건강기록");
    const colRef = doc(aniRef2,day.toString());
    await setDoc(colRef, { symtoms: content}, { merge: true });
    Alert.alert("메모 등록 완료")

  };

  const GetDetails = async (day,animal) => {
    const aniRef = collection(db,"동물");
    const docRef = doc(aniRef, animal.toString());
    const aniRef2 = collection(docRef,"건강기록");
    const colRef = doc(aniRef2,day.toString());
    const docSnap = await getDoc(colRef);

    if (docSnap.exists()) {
      setContent(docSnap.data().symtoms);
    } else {
     console.log("없음");
    }

  }



  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      'name': require('../../assets/fonts/SingleDay-Regular.ttf'),
      'garam': require('../../assets/fonts/GARAM.ttf')
    })
      .then(() => {
        setFontLoaded(true);
      })
  }, [])

  if (!fontLoaded) return null;
  else {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <View style={styles.container}>
      <StatusBar style='dark'></StatusBar>
    <View style={{flex:1}}>
    <View style={{alignItems:'center',marginTop:3}}>
      <Text style={{fontFamily:'garam', fontSize:25}}>
        {animalname}의  {day}  기록</Text></View>
      <View style={styles.inputBox}>
      <TextInput onChangeText={onChangeText}
      value={content} multiline={true} placeholder="다른 증상을 메모하세요"></TextInput>
      </View>
      <View style={{ marginLeft:270, marginTop: 15 }}>
      <TouchableOpacity style={styles.login} onPress={Create.bind(this)}
            ><Text style={styles.loginText}>저장하기</Text></TouchableOpacity></View>
    </View>
    </View>
    </TouchableWithoutFeedback>
  );
}}



const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white'
  },
  inputBox:
  { height:'100%', height:300, padding:30,
    borderWidth: 2, borderColor: 'skyblue', borderRadius: 10,
    margin:10, 
  },
  login: {
    backgroundColor: 'lightgray', borderRadius: 6, width:120, height:50,
    paddingHorizontal: 10, paddingVertical: 5, justifyContent: 'center', alignItems:'center',
  }, loginText: { fontSize: 28, fontFamily: 'garam' },
});


export default WriteView;