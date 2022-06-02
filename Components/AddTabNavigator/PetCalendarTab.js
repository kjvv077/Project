import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Calendar } from "react-native-calendars";
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import {
  StyleSheet, View, Text,
  Alert, TouchableOpacity,ScrollView
} from "react-native";
import * as Font from "expo-font";
import RNPickerSelect from 'react-native-picker-select';
import {
  where,
  collection,
  doc,
  getDoc,
  setDoc,
  getDocs,
  query,
} from "firebase/firestore";
import { db, auth } from "../../config";
import AsyncStorage from '@react-native-async-storage/async-storage';



const now = new Date().date;

function CalendarView({ navigation }) {
  const user = auth.currentUser;

  //동물 선택 번호
  let animalIds = [];
  let animals = [];
  let vomits = [];
  let drugs = [];
  let symtomdays = [];
  const [currentAnimal, setCurrentAnimal] = useState("");
  const [currentAnimalId, setCurrentAnimalId] = useState();
  const [selectedDay, setSelectedDay] = useState("");

  useEffect(() => {
    const firstLoad = async () => {
      try {
        await storeData();
        const savedNickname = await AsyncStorage.getItem("animal");
        setCurrentAnimalId2(savedNickname);
        const savedNickname2 = await AsyncStorage.getItem("animalname");
        setCurrentAnimal2(savedNickname2);
        console.log(savedNickname, savedNickname2);
        await getVomits(currentAnimalId);
        await AsyncStorage.setItem("vomit", JSON.stringify(vomits));
        await getDrugs(currentAnimalId);
        await AsyncStorage.setItem("drugs", JSON.stringify(drugs));
        await getSymtomDays(currentAnimalId);
        await AsyncStorage.setItem("symtomdays", JSON.stringify(symtomdays));
      } catch (err) {
        console.log(err);
      }
    };
    firstLoad();
    storeData();
  }, []);

  const setCurrentAnimal2 = async (savedNickname) => {
    setCurrentAnimal(savedNickname);
  }
  const setCurrentAnimalId2 = async (savedNickname) => {
    setCurrentAnimalId(savedNickname);
  }


  let kind = ""
  const storeData = async () => {
    try {
      console.log(currentAnimalId);
      console.log(currentAnimal);
      console.log(selectedDay);
      await AsyncStorage.setItem("animal", currentAnimalId);
      await AsyncStorage.setItem("animalname", currentAnimal);
      await AsyncStorage.setItem("Day", selectedDay);
      await AsyncStorage.setItem("kind", kind);
    } catch (err) {
      console.log(err);
    }
  };



  //4주인지 5주인지 확인
  var a = 5;
  const [isLong, SetIsLong] = useState(false);

  function weekCount(year, month_number) {
    var firstOfMonth = new Date(year, month_number - 1, 1);
    var lastOfMonth = new Date(year, month_number, 0);

    var used = firstOfMonth.getDay() + lastOfMonth.getDate();

    return Math.ceil(used / 7);
  }

  const setTimes = () => {
    const times = [];
    for (let i = 1; i <= 10; i++) {
      times.push({ label: `${i}회`, value: i })
    }
    return times;
  }


  const goDetail = async () => {
    Create();
    await storeData();
    navigation.navigate("WriteView");
  }

  const goCheck = async () => {
    kind = "구토";
    await getVomits(currentAnimalId);
    await AsyncStorage.setItem("vomit", JSON.stringify(vomits));
    await storeData();
    navigation.navigate("CheckDots");
  }

  const goCheck2 = async () => {
    await getDrugs(currentAnimalId);
    await AsyncStorage.setItem("drugs", JSON.stringify(drugs));
    kind = "투약";
    await storeData();
    navigation.navigate("CheckDots");
  }

  const goCheck3 = async () => {
    kind = "증상기록";
    await storeData();
    await getSymtomDays(currentAnimalId);
    await AsyncStorage.setItem("symtomdays", JSON.stringify(symtomdays));
    navigation.navigate("CheckDots");
  }


  useEffect(() => {
    setCurrentAnimalId(currentAnimalId);
  });

  const getVomits = async (id) => {
    vomits = [];
    const docRef = doc(db, "동물", id);
    const colRef = collection(docRef, "건강기록");
    const myQuery2 = query(colRef, where("Puke", "!=", 0));
    const mySnapshot2 = await getDocs(myQuery2);
    mySnapshot2.forEach((myDoc) => {
      vomits.push(myDoc.data().Day);
    });
    console.log("최종");
    console.log(vomits);
  }

  const getDrugs = async (id) => {
    drugs = [];
    const docRef = doc(db, "동물", id);
    const colRef = collection(docRef, "건강기록");
    const myQuery2 = query(colRef, where("Drug", "!=", 0));
    const mySnapshot2 = await getDocs(myQuery2);
    mySnapshot2.forEach((myDoc) => {
      drugs.push(myDoc.data().Day);
    });
    console.log("최종");
    console.log(drugs);
  }


  const getSymtomDays = async (id) => {
    symtomdays = [];
    const docRef = doc(db, "동물", id);
    const colRef = collection(docRef, "건강기록");
    const myQuery2 = query(colRef, where("symtoms", "!=", ""));
    const mySnapshot2 = await getDocs(myQuery2);
    mySnapshot2.forEach((myDoc) => {
      symtomdays.push(myDoc.data().Day);
    });
    console.log("최종");
    console.log(symtomdays);
  }

  const updateAnimals = async () => {
    animalIds = [];
    animals = [];
    await getAllanimals();
    console.log(`확인`);
    console.log(animals);
    showAnimals();
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
      const aniRef = collection(db, "동물");
      const docRef = doc(aniRef, animalIds[j]);
      const query = await getDoc(docRef);
      animals.push(query.data());
    }
  }

  const getNowanimals = async (i) => {
    let id = "";

    for (let j = 0; j < animalIds.length; j++) {
      console.log(animalIds[j]);
      const aniRef = collection(db, "동물");
      const docRef = doc(aniRef, animalIds[j]);
      const query = await getDoc(docRef);
      if (query.data().name == animals[i].name) {
        id = animalIds[j];
        setCurrentAnimalId(animalIds[j]);
      }
    }
    return id;
  }

  const showAnimals2 = async (i, id2) => {
    await getNowanimals(i);
    await getVomits(id2);
  }

  const removeAll = () => {
    setAmountFood("");
    setAmountSnack("");
    setAmountWater("");
    setnumPee(0);
    setnumPoop(0);
    setnumPuke(0);
    setnumWalk(0);
    setnumDrug(0);
    setSelectedDay("");
  }

  const showAnimals = async () => {
    const calenders = [];
    for (let i = 0; i < animals.length; i++) {
      calenders.push({
        text: animals[i].name,
        //캘린더 이동 함수
        onPress: (async () => {
          Alert.alert("바꾸겠습니까?", "", [{
            text: "yes",
            onPress: (async () => {
              const id2 = await getNowanimals(i); showAnimals2(i, id2);
              setCurrentAnimal(animals[i].name); removeAll();
            })
          }, { text: "no" }]);
        })
      }
      )
    }
    Alert.alert("캘린더 이동", "", calenders);
  }

  const [amountFood, setAmountFood] = useState("");
  const [amountSnack, setAmountSnack] = useState("");
  const [amountWater, setAmountWater] = useState("");
  const [numPee, setnumPee] = useState(0);
  const [numPoop, setnumPoop] = useState(0);
  const [numPuke, setnumPuke] = useState(0);
  const [numDrug, setnumDrug] = useState(0);
  const [numWalk, setnumWalk] = useState(0);


  const GetDetails = async (date) => {
    const aniRef = collection(db, "동물");
    const docRef = doc(aniRef, currentAnimalId)
    const aniRef2 = collection(docRef, "건강기록");
    const colRef = doc(aniRef2, date);
    const docSnap = await getDoc(colRef);

    if (docSnap.exists()) {
      setAmountFood(docSnap.data().Food);
      setAmountSnack(docSnap.data().Snack);
      setAmountWater(docSnap.data().Water);
      setnumPee(docSnap.data().Pee);
      setnumPoop(docSnap.data().Poop);
      setnumPuke(docSnap.data().Puke);
      console.log(docSnap.data().Walk);
      console.log(docSnap.data().Drug);
      setnumWalk(docSnap.data().Walk);
      setnumDrug(docSnap.data().Drug);
    } else {
      setAmountFood("");
      setAmountSnack("");
      setAmountWater("");
      setnumPee(0);
      setnumPoop(0);
      setnumPuke(0);
      setnumWalk(0);
      setnumDrug(0);
    }

  }


  const Create = async () => {

    const docData = {
      Day: selectedDay,
      Food: amountFood,
      Snack: amountSnack,
      Water: amountWater,
      Pee: numPee,
      Poop: numPoop,
      Puke: numPuke,
      Drug: numDrug,
      Walk: numWalk,
    };

    const aniRef = collection(db, "동물");
    const docRef = doc(aniRef, currentAnimalId);
    const colRef = doc(docRef, "건강기록", selectedDay);
    await setDoc(colRef, docData, { merge: true });
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
      <View style={{ backgroundColor: 'white' }}>
        <StatusBar style="dark" />
        <View style={{
          borderWidth: 3, borderColor: 'skyblue', borderRadius: 10, margin: 8,
          marginTop: 40, height: 770
        }}>
          <View style={{ flex:25,
            marginTop: 12,
            backgroundColor: 'white',
          }}>
            <View style={{ marginBottom: -20, flexDirection: 'row', marginLeft: 10 }}>
              <TouchableOpacity onPress={goCheck} style={styles.dotbox}><Text style={[styles.dot, { color: 'green' }]}> 구토한 날</Text></TouchableOpacity>
              <TouchableOpacity onPress={goCheck2} style={styles.dotbox}><Text style={[styles.dot, { color: 'orange' }]}> 투약한 날</Text></TouchableOpacity>
              <TouchableOpacity onPress={goCheck3} style={styles.dotbox}><Text style={[styles.dot, { color: 'red' }]}> 기록한 날</Text></TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ width: 70 }}></View>
              <View style={{ alignItems: 'flex-end', justifyContent: 'center', flexDirection: 'row' }}><Text style={styles.currentAnimal}>{currentAnimal}'</Text>
                <Text style={{ fontSize: 18, marginRight: 13, color: 'gray' }}>s</Text>
              </View>
              <TouchableOpacity onPress={updateAnimals} style={styles.showAnimals}>
                <Entypo name="menu" size={35} color='#827E7E' /></TouchableOpacity>
            </View>
            <Calendar
              style={styles.calendar}
              theme={{
                textDayFontSize: 17, textMonthFontSize: 20, textDayHeaderFontWeight: '400'
              }}
              current={now}
              onDayPress={(day) => {
                setSelectedDay(day.dateString);
                GetDetails(day.dateString);
              }}
              onMonthChange={(month) => {
                SetIsLong(false);
                a = weekCount(month.year, month.month);
                if (a === 6) SetIsLong(true);
              }}
              monthFormat={'MMMM yyyy'}
              markingType={'multi-dot'}
            >
            </Calendar>
            <View>
              {
                isLong ?
                  (
                    <View style={{ height: 45 }}></View>
                  ) : null
              }
            </View>
            <ScrollView
              nestedScrollEnabled={true} style={{ borderTopWidth: 1, borderTopColor: 'lightgray', marginLeft: 10, marginTop: -5 }}>
              <ScrollView style={{height:'100%'}}  nestedScrollEnabled={true}>
                <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 7, justifyContent: 'space-between' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialIcons name="pets" size={21} color="blue" />
                    <Text style={styles.checkTitle}>섭취기록</Text>
                  </View>
                  <Text style={{ marginRight: 10, marginTop: -10, paddingTop: -8, fontFamily: 'name', fontSize: 18, color: '#FE2E2E' }}>{selectedDay}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'baseline', marginTop: 12, marginLeft: 10, justifyContent: 'space-around' }}>
                  <MaterialIcons name="rice-bowl" size={24} color="black" />
                  <RNPickerSelect style={pickerSelectStyles}
                    useNativeAndroidPickerStyle={false}
                    selectedValue='select'
                    value={amountFood}
                    onValueChange={(value) => {
                      setAmountFood(value);
                      Create();
                    }
                    }
                    items={[
                      { label: "적음", value: "적음" },
                      { label: "보통", value: "보통" },
                      { label: "많음", value: "많음" }
                    ]}
                  >
                  </RNPickerSelect>
                  <MaterialCommunityIcons name="food-drumstick-outline" size={24} color="black" />
                  <RNPickerSelect style={pickerSelectStyles}
                    useNativeAndroidPickerStyle={false}
                    selectedValue='select'
                    value={amountSnack}
                    onValueChange={(value) => {
                      setAmountSnack(value);
                      Create();
                    }
                    }
                    items={[
                      { label: "적음", value: "적음" },
                      { label: "보통", value: "보통" },
                      { label: "많음", value: "많음" }
                    ]}
                  >
                  </RNPickerSelect>
                  <Ionicons name="water-outline" size={24} color="black" />
                  <RNPickerSelect style={pickerSelectStyles}
                    useNativeAndroidPickerStyle={false}
                    selectedValue='select'
                    value={amountWater}
                    onValueChange={(value) => {
                      setAmountWater(value);
                      Create();
                    }
                    }
                    items={[
                      { label: "적음", value: "적음" },
                      { label: "보통", value: "보통" },
                      { label: "많음", value: "많음" }
                    ]}
                  >
                  </RNPickerSelect>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 10, marginTop: 10, borderTopWidth: 1, borderTopColor: 'lightgray', marginRight: 10, justifyContent: 'space-between' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialIcons name="pets" size={21} color="pink" />
                    <Text style={styles.checkTitle}>소변</Text>
                  </View>
                  <RNPickerSelect style={pickerSelectStyles}
                    useNativeAndroidPickerStyle={false}
                    value={numPee}
                    items={setTimes()}
                    onValueChange={(value) => {
                      setnumPee(value); Create();
                    }}
                  />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginTop: 8, marginRight: 10, justifyContent: 'space-between' }}>
                  <Text style={styles.checkTitle}>   대변</Text>
                  <RNPickerSelect style={pickerSelectStyles}
                    useNativeAndroidPickerStyle={false}
                    value={numPoop}
                    items={setTimes()}
                    onValueChange={(value) => {
                      setnumPoop(value); Create();
                    }}
                  />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 10, marginTop: 9, borderTopWidth: 1, borderTopColor: 'lightgray', marginRight: 10, justifyContent: 'space-between' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialIcons name="pets" size={21} color="green" />
                    <Text style={styles.checkTitle}>구토</Text>
                  </View>
                  <RNPickerSelect style={pickerSelectStyles}
                    useNativeAndroidPickerStyle={false}
                    value={numPuke}
                    items={setTimes()}
                    onValueChange={(value) => {
                      setnumPuke(value); Create();
                    }}
                  />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 5, marginTop: 9, borderTopWidth: 1, borderTopColor: 'lightgray', marginRight: 10, justifyContent: 'space-between' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialIcons name="pets" size={21} color="orange" />
                    <Text style={styles.checkTitle}>투약</Text>
                  </View>
                  <RNPickerSelect style={pickerSelectStyles}
                    useNativeAndroidPickerStyle={false}
                    value={numDrug}
                    items={setTimes()}
                    onValueChange={(value) => {
                      setnumDrug(value); Create();
                    }}
                  />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 5, marginTop: 9, borderTopWidth: 1, borderTopColor: 'lightgray', marginRight: 10, justifyContent: 'space-between' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialIcons name="pets" size={21} color="darkviolet" />
                    <Text style={styles.checkTitle}>산책</Text>
                  </View>
                  <RNPickerSelect style={pickerSelectStyles}
                    useNativeAndroidPickerStyle={false}
                    value={numWalk}
                    items={setTimes()}
                    onValueChange={(value) => {
                      setnumWalk(value); Create();
                    }}
                  />
                </View>
                <TouchableOpacity nestedScrollEnabled={true} onPress={goDetail} style={[styles.checkbox,{marginBottom:10}]}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 5, marginTop: 9, borderTopWidth: 1, borderTopColor: 'lightgray', width: 370, justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <MaterialIcons name="pets" size={21} color="red" />
                      <Text style={styles.checkTitle}>이상증상</Text>
                    </View>
                    <Entypo style={{ marginTop: 5, marginRight: 25 }} name="pencil" size={27} color="black" /></View>
                </TouchableOpacity>
                </View>
              </ScrollView>
            </ScrollView>
          </View>
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  calendar: {
    backgroundColor: '#00000000',
    height: 320,
  },
  showAnimals: {
    marginTop: 20,
    alignItems: 'flex-end',
    marginRight: 18,
  },
  currentAnimal: {
    fontSize: 33, fontFamily: 'name', color: '#37A3EB', marginBottom: -10
  },
  dot: {
    padding: 5, paddingLeft: 2,
    fontSize: 18, color: '#605959', fontFamily: 'garam',
  }, dotbox: {
    marginRight: 10, borderWidth: 0.8, borderColor: 'skyblue', borderRadius: 3,
  },

  checkTitle: {
    fontFamily: 'garam', fontSize: 25, marginLeft: 10
  },
  checkbox: {
    marginRight: 30, marginTop: 5,
  }
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    borderWidth: 2, borderColor: 'skyblue',
    borderRadius: 6, height: 28, width: 80, marginRight: 15,
    fontSize: 23,
    color: '#000000',
    textAlign: 'center',
    fontFamily: 'garam',
  },
  inputAndroid: {
    borderWidth: 2, borderColor: 'skyblue',
    borderRadius: 6, height: 28, width: 80, marginRight: 15,
    fontSize: 23,
    color: '#000000',
    textAlign: 'center',
    fontFamily: 'garam',
  },
});




export default CalendarView;