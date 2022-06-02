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

function InsertView() {
  const user = auth.currentUser;

  const [petName, setPetName] = useState("");
  const [petKind, setPetKind] = useState("");
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("");
  const [petid,setPetId]= useState("");


  const setAges=()=>{
  const ages = [];
  for (let i = 1; i <= 100; i++) {
    ages.push({ label: `${i}살`, value: i })
  }
  return ages;
}

  const registerUserandAnimal=async()=>{
    if(petName==""){Alert.alert("이름을 입력해주세요!")}
    else{
    const id2 = await Create();
    await CreateUserandAnimal(id2);}

  }

  const Create = async() => {
    let id4 = "";
    const myCollRef = collection(db, "동물");
    const myDocRef = doc(myCollRef);

    const docData = {
      name: petName,
      kind: petKind,
      gender: gender,
      age: age,
    };

    if(petName=="") Alert.alert("등록 오류");
    else{
    await setDoc(myDocRef, docData)
      // Handling Promises
      .then(() => {
        console.log("등록되었습니다");
        setPetId(myDocRef.id);
        id4=myDocRef.id;
        console.log(petid);
      })
      .catch((error) => {
        alert(error.message);
      });
    }
    return id4;
  };

  const CreateUserandAnimal = async(id2) => {
    let id3 = id2;
    console.log(petid);
    const myCollRef = collection(db, "소유");
    const myDocRef = doc(myCollRef);
    
    const docData = {
      user:user.email,
      animalId:id3
     };

    
    await setDoc(myDocRef, docData)
      // Handling Promises
      .then(() => {
        alert("등록되었습니다");
        console.log(petid);
      })
      .catch((error) => {
        console.log(error.message);
      });

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
            <Text style={styles.text}>등록</Text>
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
              value={gender}
              onValueChange={value => setGender(value)}
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
                label: '나이를 선택해주세요',

              }}
              value={age}
              items={setAges()}
              onValueChange={(value) => setAge(value)}
            />
          </View>
          <View style={{ alignItems: 'flex-end', marginTop: 80, marginRight: 30 }}>
            <TouchableOpacity style={styles.button} onPress={registerUserandAnimal}
            ><Text style={styles.buttonText}>등록</Text></TouchableOpacity></View>
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