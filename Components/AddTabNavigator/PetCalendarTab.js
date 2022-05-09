import  React, { useState,useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Calendar } from "react-native-calendars";
import { Entypo } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, ScrollView, View, Button, Text,
  Alert, TouchableHighlight, TouchableOpacity, Dimensions } from "react-native";
import * as Font from "expo-font"

const now = new Date().date;

function CalendarView(){

  //4주인지 5주인지 확인
  var a = 5;
  const [isLong,SetIsLong]= useState(false);

  function weekCount(year, month_number) {
    var firstOfMonth = new Date(year, month_number-1, 1);
    var lastOfMonth = new Date(year, month_number, 0);

    var used = firstOfMonth.getDay() + lastOfMonth.getDate();

    return Math.ceil( used / 7);
  }

  //구토 초록, 투약 오렌지, 증상 빨강
  const vomit = {key: 'vacation', color: 'green'};
  const medicine = {key: 'massage', color: 'orange'};
  const symptoms = {key: 'workout', color: 'red'};


  //동물 선택 번호
  const [currentAnimal, setCurrentAnimal] = useState("아롱이");

  showAnimals = () => Alert.alert("캘린더 이동", "",
    [
      {
        text: "동물1",
        //캘린더 이동 함수
        onPress: () => setCurrentAnimal("동물1"),
      },
      { text: "동물2", onPress: () => setCurrentAnimal("동물2") },
      { text: "동물3", onPress: () => setCurrentAnimal("동물3") },
    ],
    { cancelable: false }
  );


  //폰트
  const[fontLoaded, setFontLoaded] = useState(false);

  useEffect(()=>{
    Font.loadAsync({
      'name':  require('../../assets/fonts/SingleDay-Regular.ttf'),
      'garam': require('../../assets/fonts/GARAM.ttf')
    })
    .then(()=>{
      setFontLoaded(true);
    })
  },[])

  if(!fontLoaded) return null;
  else{
  return (
    <ScrollView>
      <StatusBar style="dark"/>
      <View style={styles.calendarContainer}>
        <View style={{ flexDirection: 'row', justifyContent:'space-between'}}>
          <View style={{ marginBottom: -10}}><Text style={{marginTop: -30,fontSize:45, color: 'green'}}> .<Text style={styles.dot}> 구토한 날</Text></Text>
            <Text style={{marginTop: -38,fontSize:45, color: 'orange'}}> .<Text style={styles.dot}> 투약한 날</Text></Text>
            <Text style={{marginTop: -38,fontSize:45, color: 'red'}}> .<Text style={styles.dot}> 이상증상</Text></Text>
          </View>
          <View style={{alignItems: 'flex-end', justifyContent:'center', flexDirection:'row'}}><Text style={styles.currentAnimal}>{currentAnimal}'</Text>
          <Text style={{fontSize:18, marginRight:13, color:'gray'}}>s</Text>
            </View>
          <TouchableOpacity onPress={showAnimals} style={styles.showAnimals}>
            <Entypo name="menu" size={32} color='#827E7E' /></TouchableOpacity>
        </View>
        <Calendar 
          style={styles.calendar}
          theme={{
            textDayFontSize: 17, textMonthFontSize: 20, textDayHeaderFontWeight: '400'}}
          current={now}
          //날짜 눌렀을때 밑에 체크 목록 뜨도록 함수 생성해야함
          onDayPress={(day) => { console.log('selected day', day); } }
          // 달력에서 보이는 월이 바뀔때 실행되는 함수, Default = undefined
          onMonthChange={(month) => { 
          SetIsLong(false);
          a = weekCount(month.year,month.month);
          if(a ===6) SetIsLong(true); }}
          monthFormat={'MMMM yyyy'}
          markingType={'multi-dot'}
          markedDates={{
            '2022-05-25': {dots: [vomit, medicine, symptoms]},
            '2022-05-22': {dots: [medicine, symptoms]}
          }}
        >
        </Calendar>
        {
          isLong?
          (
            <View style={{height:45}}></View>
          ):null
        }
      </View>
      <ScrollView>
      <Text style={{fontSize:17}}>
      {"\n"}
      &nbsp;   <MaterialIcons name="pets" size={21} color="blue" />
      &nbsp; 섭취기록 {"\n\n"}
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <MaterialIcons name="rice-bowl" size={24} color="black" /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      {/* selectbox */}
      <MaterialCommunityIcons name="food-drumstick-outline" size={24} color="black" /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
       {/* selectbox */}
      <Ionicons name="water-outline" size={24} color="black" />
       {/* selectbox */}
      {"\n\n"}
      &nbsp;   <MaterialIcons name="pets" size={21} color="pink" />
      &nbsp; 소변 {/* -+스크롤박스*/}
      {"\n\n"} &nbsp;          대변 {/* -+스크롤박스*/}
      {"\n\n"}    <MaterialIcons name="pets" size={21} color="green" />
      &nbsp; 구토 {/* -+스크롤박스*/}
      {"\n\n"}    <MaterialIcons name="pets" size={21} color="orange" />
      &nbsp; 투약 {/* 세부사항 페이지로 넘기기*/}
      {"\n\n"}    <MaterialIcons name="pets" size={21} color="darkviolet" />
      &nbsp; 산책 {/* 체크박스*/}
      {"\n\n"}    <MaterialIcons name="pets" size={21} color="red" />
      &nbsp; 이상증상 {/* 세부사항 페이지로 넘기기*/}
      {"\n\n"}
      </Text>
    </ScrollView>

    </ScrollView>
  );
}}

const styles = StyleSheet.create({
  calendarContainer:{
    flex:1,
    marginTop: 50,
    marginBottom:-12
  },
  calendar: {
    backgroundColor: '#00000000',
    height: 320,
    marginTop:-5
  },
  showAnimals:{
    marginTop: 20,
    alignItems: 'flex-end',
    marginRight: 18,
  },
  currentAnimal:{ 
    fontSize: 33, marginTop:10, fontFamily: 'name', color: '#37A3EB'
  },
  dot:{
    fontSize:14, color: '#605959', fontFamily: 'garam'
  }
});


export default CalendarView;