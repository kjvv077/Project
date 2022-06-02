import  React, { useState,useEffect } from "react";
import { StyleSheet, ScrollView, View, Text,
  TouchableOpacity,} from "react-native";
import * as Font from "expo-font"
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  collection,
  doc,
  getDoc,
} from "firebase/firestore";
import { db, auth } from "../../config";


function CheckDotView() {
  const [animalname,setAnimalName] = useState("")
  const[content,setContent]=useState([]);
  const[kind,setKind]=useState("");
  const[animalId,setanimalId]=useState();  
  const [final,setFinal]=useState([]);

  useEffect(() => {
    const firstLoad = async () => {
      try {
        const vomits =  await AsyncStorage.getItem("vomit");
        const vomits2 = JSON.parse(vomits);
        const drugs =  await AsyncStorage.getItem("drugs");
        const drugs2 = JSON.parse(drugs);
        const kind =  await AsyncStorage.getItem("kind");
        const symtomdays =  await AsyncStorage.getItem("symtomdays");
        const symtomdays2 = JSON.parse(symtomdays);
        const savedNickname2 = await AsyncStorage.getItem("animalname");
        const savedId = await AsyncStorage.getItem("animal");
  
        console.log(vomits);
        kind==="구토"?setContent(vomits2.sort()):kind==="투약"?setContent(drugs2.sort()):setContent(symtomdays2.sort());
        
        console.log(content);
        setKind(kind);
        setAnimalName(savedNickname2);
        setanimalId(savedId);
   
      } catch (err) {
        console.log(err);
      }
    };
    firstLoad();
  }, []);

  const getTimesPuke = async()=>{
    let times = [];
    for(let i = 0; i < content.length; i++){
    const aniRef = collection(db,"동물");
    const docRef = doc(aniRef, animalId);
    const colRef = doc(docRef, "건강기록", content[i]);
    const docSnap = await getDoc(colRef);
    times.push(`${content[i]}  :   ${docSnap.data().Puke}회`);}

    console.log(times);
    
    setFinal(times);
    console.log(final);
  }

  const getTimesDrug = async()=>{
    let times = [];
    for(let i = 0; i < content.length; i++){
    const aniRef = collection(db,"동물");
    const docRef = doc(aniRef, animalId);
    const colRef = doc(docRef, "건강기록", content[i]);
    const docSnap = await getDoc(colRef);
    times.push(`${content[i]}  :   ${docSnap.data().Drug}회`);}

    console.log(times);
    
    setFinal(times);
    console.log(final);
  }

  const getSymtom = async()=>{
    let times = [];
    for(let i = 0; i < content.length; i++){
    const aniRef = collection(db,"동물");
    const docRef = doc(aniRef, animalId);
    const colRef = doc(docRef, "건강기록", content[i]);
    const docSnap = await getDoc(colRef);
    times.push(`- ${content[i]}  :   
    ${docSnap.data().symtoms}
    `);}

    console.log(times);
    
    setFinal(times);
    console.log(final);
  }

  const[isShow,setIsShow]=useState(true);
  const[timeState,SettimeState]=useState("상세보기");
  const onPress=async()=>{
    kind==="구토"?await getTimesPuke():kind==="투약"?await getTimesDrug():await getSymtom();
    isShow==true?SettimeState("상세숨기기"):SettimeState("상세보기");
    isShow==true?setIsShow(false):setIsShow(true);
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
  <View style={styles.container}>
     <View style={{flexDirection:'row', marginTop:3, justifyContent:'space-around'}}>
      <Text style={{fontFamily:'garam', fontSize:30, marginTop: 5, color: '#247aff', marginLeft:-25}}>{animalname}의 {kind}
    </Text>
      <TouchableOpacity onPress={onPress} style={styles.button}
      ><Text style={styles.buttonText}>{timeState}</Text></TouchableOpacity></View>
      <ScrollView style={styles.inputBox}>
      
      {isShow===true?
        (content.map((co,i) =>{ 
            var a=   <View key={i}>
            <Text style={styles.loginText}>{co}</Text>
            </View>
          return a;
        })):(final.map((co,i) =>{ 
          var a=   <View key={i}>
          <Text style={styles.loginText}>{co}</Text>
          </View>
        return a;
          }))
      }
      </ScrollView>
  </View>
  );
}}



const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white'
  },
  inputBox:
  { height:"100%", padding:30,
    borderWidth: 2, borderColor: 'skyblue', borderRadius: 10,
    margin:10, 
    flexDirection:'column'
  },
  login: {
    backgroundColor: 'lightgray', borderRadius: 6, width:120, height:50,
    paddingHorizontal: 10, paddingVertical: 5, justifyContent: 'center', alignItems:'center',
  }, loginText: { fontSize: 28, fontFamily: 'garam' },
  button: {
    width: 80,
    height: 35,
    marginTop:15,
    backgroundColor: "lightgray",
    borderRadius: 4.5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontFamily:'garam',
    fontSize: 22,
    fontWeight: "400",
  },
});


export default CheckDotView;