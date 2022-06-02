import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet, ScrollView, View, Button, Text, Image,
  Alert, TouchableHighlight, TouchableOpacity, Dimensions, FlatList,
  TextInput, TouchableWithoutFeedback, Keyboard
} from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import * as Font from "expo-font"
import {
  where,
  addDoc,
  deleteDoc,
  collection,
  doc,
  getDoc,
  setDoc,
  getDocs,
  query,
  orderBy,
  startAt,
  endAt,
} from "firebase/firestore";
import { db, auth } from "../../config";
import AsyncStorage from '@react-native-async-storage/async-storage';

function InsertView() {
  const user = auth.currentUser;
  let animalIds = [];
  let animal = [];
  const [petid,setPetId]= useState("");
  const [petAge, setPetAge] = useState("");
  const [petGender, setPetGender] = useState("");
  const [petKind, setPetKind] = useState("");
  const [petName, setPetName] = useState("");

  useEffect(() => {
    const firstLoad = async () => {
      try {
        const savedAge = await AsyncStorage.getItem("age");//키 'animal2' 값으로 setItem해준 동물 id 받아오기
        const savedGender = await AsyncStorage.getItem("gender");
        const savedKind = await AsyncStorage.getItem("petKind");
        const savedName = await AsyncStorage.getItem("name");
        console.log(savedAge);
        setPetAge(savedAge);
        setPetGender(savedGender);
        setPetKind(savedKind);
        setPetName(savedName);
        await getAllanimals();
        await getNowanimals(savedName);
      } catch (err) {
        console.log(err);
      }
    };
    firstLoad();
  }, []);


  //현재 동물 정보 firebase에서 가져오기
  // const getNowanimals2 = async (petid) => {
  //   animal.push(query.data());
  //   let id = "";
  //   const aniRef= collection(db,"동물");
  //   const docRef = doc(aniRef, petid);
  //   const query = await getDoc(docRef);
  //     setPetName(query.data().name) // "
  //     setPetKind(query.data().kind) // query.data().kind 확실하지 않음 암튼 받은 firebase에서 kind값 petkind로 저장해주기
  //     setPetAge(query.data().age) // "
  //     setPetGender(query.data().gender) // "
  //   return id;
  // }


  const getNowanimals = async (id2) => {
    //removeAll();
    let id = "";
    
    for (let j = 0; j < animalIds.length; j++) {
      console.log(animalIds[j]);
      const aniRef= collection(db,"동물");
      const docRef = doc(aniRef, animalIds[j]);
      const query = await getDoc(docRef);
      if(query.data().name==id2) {
        id = animalIds[j];
        setPetId(animalIds[j]);
        console.log(`저장${petid}`);
      }
   }
    return id;
  }

  const setAges=()=>{
  const ages = [];
  for (let i = 1; i <= 100; i++) {
    ages.push({ label: `${i}살`, value: i })
  }
  return ages;
}


const getAllanimals2 = async () => {
  const aniRef = collection(db, "소유");
  const myQuery = query(aniRef, where("user", "==", user.email));
  const mySnapshot = await getDocs(myQuery);
  mySnapshot.forEach(async (myDoc) => {
    animalIds.push(myDoc.data().animalId);
  })
}

const getAllanimals = async () => {
  await getAllanimals2();
  for (let j = 0; j < animalIds.length; j++) {
    console.log(animalIds[j]);
    const aniRef= collection(db,"동물");
    const docRef = doc(aniRef, animalIds[j]);
    const query = await getDoc(docRef);
    animal.push(query.data());
  }
}

  const Create = async() => { //수정 함수
    await getAllanimals();
    await getNowanimals(petName);
    const aniRef = collection(db,"동물");
    const docRef = doc(aniRef, petid);

    const docData = {
      name: petName,
      kind: petKind,
      gender: petGender,
      age: petAge,
    };

    if(petName=="") Alert.alert("이름을 입력해주세요");
    else{
     await setDoc(docRef, docData, { merge: true })
      // Handling Promises
      .then(() => {
        Alert.alert("수정되었습니다");
        console.log("수정되었습니다");
      })
      .catch((error) => {
        alert(error.message);
      });
    }
  };




  //폰트
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
        <StatusBar style="dark"></StatusBar>
        <ScrollView>
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
            <Image
              source={require("../../assets/images/foot.png")}
              style={styles.image}
            />
            <Text style={styles.text}>{petName}</Text>
            <Image
              source={require("../../assets/images/foot.png")}
              style={styles.image}
            />
          </View>
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <Text style={styles.inputs}>이름 :</Text>
            <TextInput style={styles.inputBox}
              value={petName} onChangeText={(name) => setPetName(name)}></TextInput>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.inputs}>종 :</Text>
            <TextInput style={[styles.inputBox, { marginLeft: 36 }]}
              value={petKind} onChangeText={(kind) => setPetKind(kind)}></TextInput>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.inputs}>성별 :</Text>
            <RNPickerSelect style={pickerSelectStyles}
              placeholder={{
                label: '성별을 선택해주세요',

              }}
              value={petGender}
              onValueChange={value => setPetGender(value)}
              items={[
                { label: '남', value: '남' },
                { label: '여', value: '여' },
              ]}
            />

          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.inputs}>나이 :</Text>
            <RNPickerSelect style={pickerSelectStyles}

              placeholder={{
                label: `나이를 수정해주세요`,

              }}
              value={petAge}
              items={setAges()}
              onValueChange={value => setPetAge(value)}
            />
          </View>
          <View style={{ alignItems: 'flex-end', marginTop: 80, marginRight: 30 }}>
            <TouchableOpacity style={styles.button} onPress={Create}
            ><Text style={styles.buttonText}>수정</Text></TouchableOpacity></View>
        </ScrollView>
      </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    margin: 2, 
    height: 755, borderWidth: 3, borderColor: 'skyblue', borderRadius: 10,
  },
  image: {
    marginLeft: 5,
    width: 60,
    height: 40,
  },
  text: {
    fontSize: 30,
    fontFamily: 'name',
  },
  inputs:
  {
    fontSize: 32, fontFamily: 'garam', marginLeft: 25, marginTop: 20,
    color: '#045FB4'
  },
  inputBox:
  {
    borderWidth: 2, borderColor: 'skyblue', borderRadius: 10, height: 40, width: 245,
    marginLeft: 20, marginTop: 23, padding: 10
  },
  container2: {
    borderBottomWidth: 1,
    height: 100,
  },
  text2: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 50,
  },
  button: {
    backgroundColor: 'lightgray', borderRadius: 6,
    paddingHorizontal: 17, paddingVertical: 3, justifyContent: 'center'
  }, buttonText: { fontSize: 28, fontFamily: 'garam' }
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    borderWidth: 2, borderColor: 'skyblue',
    borderRadius: 10, height: 40, width: 245, marginLeft: 24, marginTop: 23,
    fontSize: 26,
    color: '#000000',
    textAlign: 'center',
    fontFamily: 'garam',
  },
  inputAndroid: { 
    borderWidth: 2, borderColor: 'skyblue',
    borderRadius: 10, height: 40, width: 245, marginLeft: 24, marginTop: 23,
    fontSize: 26,
    color: '#000000',
    textAlign: 'center',
    fontFamily: 'garam',
  },
});


export default InsertView;