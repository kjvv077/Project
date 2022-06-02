
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Alert, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import * as Font from "expo-font"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import {
  where,
  deleteDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
} from "firebase/firestore";
import { db, auth } from "../../config";

function CheckTab({ navigation }) {
  const user = auth.currentUser;
  const isFocused = useIsFocused(false);

  let animalIds = [];
  let animals = [];

  useEffect(() => {
    const firstLoad = async () => {
      try {
        animalIds = [];
        animals = [];
        await showAnimals();
      } catch (err) {
        console.log(err);
      }
    };
    firstLoad();
  }, [isFocused]);

  const storeData = async (i) => {
    try {
      await AsyncStorage.setItem("age", animals[i].age.toString());
      await AsyncStorage.setItem("gender", animals[i].gender.toString());
      await AsyncStorage.setItem("petKind", animals[i].kind.toString());
      await AsyncStorage.setItem("name", animals[i].name.toString());
    } catch (err) {
      console.log(err);
    }
  }

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('session');
      await auth.signOut();
      Alert.alert("로그아웃 합니다.");
      navigation.navigate("logout");
    } catch (err) {
      Alert.alert('로그 아웃에 문제가 있습니다! ', err.message);
    }
  }


  const goModify = async (i) => {
    await storeData(i);
    navigation.navigate("Modify");
  }

  const goInsertSceen = async () => {
    navigation.navigate("InsertView");
  }

  const deleteAnimal = async (i) => {
    Alert.alert("삭제하시겠습니까?", "", [{
      text: "yes",
      onPress: (async () => {
        await deleteDoc(doc(db, "동물", animalIds[i]))
        const aniRef = collection(db, "소유");
        const myQuery = query(aniRef, where("animalId", "==", animalIds[i]));
        const data = await getDocs(myQuery);
        if (data.docs.length !== 0) {
          await deleteDoc(data.docs[0].ref);
        }
        try {
          animalIds = [];
          animals = [];
          await showAnimals();
        } catch (err) {
          console.log(err);
        }
      })
    }, { text: "no" }]);
  };

  const getAllanimals2 = async () => {
    const aniRef = collection(db, "소유");
    const myQuery = query(aniRef, where("user", "==", user.email));
    const mySnapshot = await getDocs(myQuery);
    mySnapshot.forEach(async (myDoc) => {
      animalIds.push(myDoc.data().animalId);
    })
    console.log(animalIds);
  }

  const getAllanimals = async () => {
    await getAllanimals2();
    animals = [];
    for (let j = 0; j < animalIds.length; j++) {
      const aniRef = collection(db, "동물");
      const docRef = doc(aniRef, animalIds[j]);
      const query = await getDoc(docRef);
      //console.log(query.data());
      animals.push(query.data());
    }
    console.log(animals);
  }

  const [showName, setShowName] = useState([]);
  const showAnimals = async () => {
    setShowName([]);
    await getAllanimals();
    let a = [];
    for (let i = 0; i < animals.length; i++) {
      a.push(
        <View style={[styles.showbox]}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={[styles.show, { color: 'black', marginRight: 50 }]}><Text style={{ color: '#008B8B', fontSize: 25 }}>이름 : </Text>{animals[i].name}</Text>
              <Text style={[styles.show, { color: 'black' }]}><Text style={{ color: '#008B8B', fontSize: 25 }}>나이 : </Text>{animals[i].age} 살</Text></View>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                onPress={() => {
                  goModify(i);
                }}
              ><MaterialCommunityIcons name="pencil-circle-outline"
                size={28} color="skyblue" style={{ marginTop: -5, marginRight: 3 }} /></TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  deleteAnimal(i);
                }}
              ><Ionicons name="trash-outline" size={24} color="skyblue" style={{ marginTop: -5 }} /></TouchableOpacity></View></View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={[styles.show, { color: 'black', marginRight: 50 }]}><Text style={{ color: '#008B8B', fontSize: 25 }}>성별 : </Text>{animals[i].gender}</Text>
            <Text style={[styles.show, { color: 'black' }]}><Text style={{ color: '#008B8B', fontSize: 25 }}>종 : </Text>{animals[i].kind}</Text></View>
        </View>
      );
    }
    setShowName(a);
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
      <View style={styles.inputContainer}>
        {/* <StatusBar style="dark"></StatusBar> */}
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 75 }}>
          <Image
            source={require("../../assets/images/foot.png")}
            style={styles.image}
          />
          <Text style={styles.text}>My Pets</Text>
          <Image
            source={require("../../assets/images/foot.png")}
            style={styles.image}
          />
        </View>
        <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
          <View style={{ marginTop: -10, alignItems: 'flex-start' }}>
            <TouchableOpacity style={styles.login} onPress={logout}
            ><Text style={styles.loginText}>로그아웃</Text></TouchableOpacity></View>
          <TouchableOpacity onPress={goInsertSceen}

          ><AntDesign name="pluscircleo" size={24} color="skyblue" style={{ marginRight: 20 }} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.container}>
          {showName.length == 0 ? <View style={{ height: 400, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontFamily: 'garam', fontSize: 50 }}>기다려주세요 </Text>
            <Text style={{ fontFamily: 'garam', fontSize: 20, marginTop: 100 }}>등록된 동물이 없다면 </Text>
            <Text style={{ fontFamily: 'garam', fontSize: 20 }}>등록해주세요 </Text>
            <TouchableOpacity onPress={goInsertSceen}
            ><AntDesign name="pluscircleo" size={35} color="skyblue" style={{ marginTop: 20 }} />
            </TouchableOpacity></View> :
            (showName.map((co, i) => {
              var a = <View key={i}>
                {co}
              </View>
              return a;
            }))
          }

        </ScrollView>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  image: {
    marginLeft: 5,
    width: 70,
    height: 50,
  },
  text: {
    fontSize: 35,
    fontFamily: 'name',
  },
  inputContainer: {
    flex: 1,
    backgroundColor: 'white'
  },

  container: {
    paddingTop: 10,
    backgroundColor: 'white',
    margin: 10,
    height: 600, borderWidth: 3, borderColor: 'skyblue', borderRadius: 10,
  },

  inputs: {
    fontSize: 25, marginTop: 5, color: 'skyblue',
  },

  scrollView: {
    marginHorizontal: 20,
  },
  show: {
    padding: 5, paddingLeft: 2,
    fontSize: 30, color: 'black', fontFamily: 'garam',
  }, showbox: {
    marginTop: 20, padding: 10,
    marginHorizontal: 10, borderWidth: 5, borderColor: 'skyblue', borderRadius: 5
  },

  login: {
    backgroundColor: 'lightgray', borderRadius: 6, marginLeft: 10,
    paddingHorizontal: 10, paddingVertical: 5, justifyContent: 'center'
  }, loginText: { fontSize: 20, fontFamily: 'garam' },
})


export default CheckTab;
