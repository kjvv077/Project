import React, { useState, useEffect,useLayoutEffect } from 'react';
import { Platform, Text, View, StyleSheet,Dimensions,Image, Alert } from 'react-native';
import * as Location from 'expo-location';
import { AntDesign } from '@expo/vector-icons'; 
//import json
import MapView, {
  Marker,
  AnimatedRegion,
  Polyline,
  PROVIDER_GOOGLE
} from "react-native-maps";
import { Ionicons } from '@expo/vector-icons'; 
import { TouchableOpacity } from 'react-native-gesture-handler';
import { googleGeocodeAsync } from 'expo-location/build/LocationGoogleGeocoding';
import { map } from '@firebase/util';
import { signInWithEmailAndPassword } from 'firebase/auth';
//import hospital from '../../hospital.json'
// Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY)
// Geocode.setLanguage('en')
// Geocode.setRegion('es')
// Geocode.enableDebug()

// with open('../../hospital_seoul.json',encoding='utf-8')as json_file:
//   hospitals = json.load(json_file)[][][][]
function SearchMapTab() {
  
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });



  async function jmlee(){
    //console.log("DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD")
    let xlocation = await Location.getCurrentPositionAsync({});
    console.log(xlocation.coords.latitude,xlocation.coords.longitude)
  
    // map = new google.maps.Map(
    //   document.getElementById('map'),
    //   {center: new google.maps.LatLng(xlocation.coords.latitude,xlocation.coords.longitude), zoom: 16});

      //  new google.maps.Marker({
      //          position: new google.maps.LatLng(xlocation.coords.latitude, xlocation.coords.longitude),
      //         map,
      //          title: "현재위치",
      //       });

      setLocation({latitude:xlocation.coords.latitude,longitude:xlocation.coords.longitude,
        latitudeDelta: 0.0005,
        longitudeDelta: 0.0005,})
        
          //  new google.maps.Marker({
          //     position: new google.maps.LatLng(xlocation.coords.latitude, xlocation.coords.longitude),
          //    map,
          //     title: "현재위치",
          //  });
    
          // Geolocation.getCurrentPosition(
          //     (xlocation) => {
          //         console.log(xlocation);
          //     },
             
          // );
          //navigator.geolocation.clearWatch(this.watchID);
      
          
        }
  
   
    // componentWillUnmount(){
    //   navigator.geolocation.clearWatch(this.watchID);
    // }

  useLayoutEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      setLocation({latitude:location.coords.latitude,longitude:location.coords.longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,})
    console.log(location);
    })();

  }, []);

  //계속 떠서 일단은 주석처리해놨습니다.
 // x = setInterval(jmlee, 10000);

  const { height: windowHeight } = Dimensions.get('window');
  const varTop =10;
  bbStyle = function(vheight) {
    return {
      position: 'absolute',
      top: vheight,
      left: -60,
      right: 10,
      backgroundColor: 'transparent',
      alignItems: 'center',
    }
  }
  const hitSlop = {
    top: 50,
    bottom: 50,
    left: 50,
    right: 50,
  }

  
  return (
  
    
    <View style={styles.container}>
 <View style={bbStyle(varTop)}>
          
          <TouchableOpacity  hitSlop = {hitSlop}
            activeOpacity={2}
            style={styles.mapButton}
            onPress={ () => jmlee().onclick}
          >
            <Text style={styles.buttonText}>
               내 위치
             </Text>

          </TouchableOpacity>

  


    </View>
  <MapView
        initialRegion={{
            latitude: 37.78825,
            longitude: 127,
            latitudeDelta: 2.0 ,
            longitudeDelta: 2.0,
          }}
  style={styles.map}
  provider={PROVIDER_GOOGLE}
  showUserLocation
  followUserLocation
  loadingEnabled
  region={location}
>
  <Marker
 coordinate={location}
 pinColor={'red'}
 title={'현재 위치'}
  />



<Marker
   coordinate={{latitude : 37.8244544, longitude : 127.5147113}}   pinColor={'gray'}   title={'가평축산농협 동물병원'}/>

<Marker
   coordinate={{latitude : 37.8331234, longitude : 127.5089209}}   pinColor={'gray'}   title={'우랑동물병원(산업동물출장진료전문병원)'}  />
<Marker   coordinate={{latitude : 37.7357751, longitude : 127.4158685}}   pinColor={'gray'}   title={'경기동물병원'}  />
<Marker   coordinate={{latitude : 37.6777754, longitude : 127.4903847}}   pinColor={'gray'}   title={'설악동물병원'}  />
<Marker   coordinate={{latitude : 37.82042565, longitude : 127.3464233}}   pinColor={'gray'}   title={'현리동물병원'}  />
<Marker   coordinate={{latitude : 37.8249884, longitude : 127.5141585}}   pinColor={'gray'}   title={'가평가축병원'}  />
<Marker   coordinate={{latitude : 37.73843997, longitude : 127.4204502}}   pinColor={'gray'}   title={'청평동물병원'}  />
<Marker   coordinate={{latitude : 37.829569, longitude : 127.5111914}}   pinColor={'gray'}  title={'현대가축병원'}  />
<Marker   coordinate={{latitude : 37.8293745, longitude : 127.5103268}}   pinColor={'gray'}   title={'선진가축병원'}  />
<Marker   coordinate={{latitude : 37.6672997, longitude : 126.7990716}}   pinColor={'gray'}   title={'풍동 라파엘 동물병원'}  />
<Marker   coordinate={{latitude : 37.6245795, longitude : 126.8358671}}   pinColor={'gray'}   title={'아마존'}  />
<Marker   coordinate={{latitude : 37.6274435, longitude : 126.8288713}}   pinColor={'gray'}   title={'서울프라임 동물병원'}  />
<Marker   coordinate={{latitude : 37.6820201, longitude : 126.7784898}}   pinColor={'gray'}   title={'산들동물병원'}  />
<Marker   coordinate={{latitude : 37.6617165, longitude : 126.887781}}   pinColor={'gray'}   title={'앞선동물병원'}  />
<Marker   coordinate={{latitude : 37.69854872, longitude : 126.7655303}}   pinColor={'gray'}   title={'탄현 동물병원'}  />  
<Marker   coordinate={{latitude : 37.68365654, longitude : 126.7724138}}   pinColor={'gray'}   title={'이용철동물병원'}  />
<Marker   coordinate={{latitude : 37.66189449, longitude : 126.7659256}}   pinColor={'gray'}   title={'거부기 동물병원'}  />
<Marker   coordinate={{latitude : 37.66951126, longitude : 126.7674721}}   pinColor={'gray'}   title={'로하스 동물병원'}  />
<Marker   coordinate={{latitude : 37.6616277, longitude : 126.7862125}}   pinColor={'gray'}   title={'이솝동물병원'}  />
<Marker   coordinate={{latitude : 37.6501845, longitude : 126.7761267}}   pinColor={'gray'}   title={'진스 종합 동물병원'}  />
<Marker   coordinate={{latitude : 37.65289638, longitude : 126.8992288}}   pinColor={'gray'}   title={'피그만클리닉'}  />
<Marker   coordinate={{latitude : 37.6764934, longitude : 126.8121843}}   pinColor={'gray'}   title={'소망 동물병원'}  />
<Marker   coordinate={{latitude : 37.6543794, longitude : 126.7789583}}   pinColor={'gray'}   title={'가람동물병원'}  />
<Marker   coordinate={{latitude : 37.6399409, longitude : 126.7859583}}   pinColor={'gray'}   title={'메리알 동물병원'}  />
<Marker   coordinate={{latitude : 37.62349979, longitude : 126.8362215}}   pinColor={'gray'}   title={'디엔씨'}  />  
<Marker   coordinate={{latitude : 37.6476034, longitude : 126.7882929}}   pinColor={'gray'}   title={'봄빛동물병원'}  />
<Marker   coordinate={{latitude : 37.6857927, longitude : 126.7772087}}   pinColor={'gray'}   title={'중산종합동물병원'}  />
<Marker   coordinate={{latitude : 37.66014927, longitude : 126.7664643}}   pinColor={'gray'} title={'일산시티 동물의료센터'}/>
<Marker   coordinate={{latitude :37.4525535,longitude : 126.9057724}}    pinColor={'gray'}    title={ ' 조정연동물병원 ' }  />
<Marker   coordinate={{latitude :37.4613602,longitude : 127.026464}}    pinColor={'gray'}    title={ ' 서초힐스동물병원 ' }  />
<Marker   coordinate={{latitude :37.4684354,longitude : 126.9515927}}    pinColor={'gray'}    title={ ' 서울대학교 수의과대학 동물병원 ' }  />
<Marker   coordinate={{latitude :37.4692712,longitude : 127.1073203}}    pinColor={'gray'}    title={ ' 자곡퍼스트동물의료센터 ' }  />
<Marker   coordinate={{latitude :37.4716054,longitude : 126.9829542}}    pinColor={'gray'}    title={ ' 아이러브펫동물병원 ' }  />
<Marker   coordinate={{latitude :37.4718514,longitude : 127.045938}}    pinColor={'gray'}    title={ ' 한 동물병원 ' }  />
<Marker   coordinate={{latitude :37.4740258,longitude : 126.966361}}    pinColor={'gray'}    title={ ' 비타민동물병원 ' }  />
<Marker   coordinate={{latitude :37.474789,longitude : 127.0421619}}    pinColor={'gray'}    title={ ' 사랑의동물병원 ' }  />
<Marker   coordinate={{latitude :37.4754745,longitude : 126.9668543}}    pinColor={'gray'}    title={ ' 재활한방 나눔동물병원 ' }  />
<Marker   coordinate={{latitude :37.4763984,longitude : 127.0463008}}    pinColor={'gray'}    title={ ' 개포별빛동물병원 ' }  />
<Marker   coordinate={{latitude :37.4766848,longitude : 126.984527}}    pinColor={'gray'}    title={ ' 반려동물 의료센터 다울 ' }  />
<Marker   coordinate={{latitude :37.4767842,longitude : 126.9766408}}    pinColor={'gray'}    title={ ' 사당동물병원 ' }  />
<Marker   coordinate={{latitude :37.4770721999999,longitude : 126.9767002}}    pinColor={'gray'}    title={ ' 세인트필립 동물병원 ' }  />
<Marker   coordinate={{latitude :37.4796999,longitude : 126.8229685}}    pinColor={'gray'}    title={ ' 클로버 동물병원 ' }  />
<Marker   coordinate={{latitude :37.4800986,longitude : 126.9564871}}    pinColor={'gray'}    title={ ' 관악동물종합병원 ' }  />
<Marker   coordinate={{latitude :37.4808712,longitude : 126.8245952}}    pinColor={'gray'}    title={ ' 항동푸른숲동물병원 ' }  />
<Marker   coordinate={{latitude :37.4811381,longitude : 126.9095617}}    pinColor={'gray'}    title={ ' 러브펫종합동물병원 ' }  />
<Marker   coordinate={{latitude :37.4817136,longitude : 127.0822397}}    pinColor={'gray'}    title={ ' 나리울동물병원 ' }  />
<Marker   coordinate={{latitude :37.4822343,longitude : 126.9014422}}    pinColor={'gray'}    title={ ' 고려동물병원 ' }  />
<Marker   coordinate={{latitude :37.4825131,longitude : 126.9170053}}    pinColor={'gray'}    title={ ' 세계로동물의료센터 ' }  />
<Marker   coordinate={{latitude :37.4827115,longitude : 127.0622097}}    pinColor={'gray'}    title={ ' 디아동물병원 ' }  />
<Marker   coordinate={{latitude :37.4831011,longitude : 127.0076912}}    pinColor={'gray'}    title={ ' 다니엘동물병원 ' }  />
<Marker   coordinate={{latitude :37.4831032,longitude : 126.9757948}}    pinColor={'gray'}    title={ ' 동물은내친구 ' }  />
<Marker   coordinate={{latitude :37.4840951,longitude : 127.1239001}}    pinColor={'gray'}    title={ ' 송파스마일동물병원 ' }  />
<Marker   coordinate={{latitude :37.4845001,longitude : 127.0108302}}    pinColor={'gray'}    title={ ' 아델 동물병원 ' }  />
<Marker   coordinate={{latitude :37.4846035,longitude : 126.9952147}}    pinColor={'gray'}    title={ ' 디아나동물병원 ' }  />
<Marker   coordinate={{latitude :37.4848079,longitude : 126.9796443}}    pinColor={'gray'}    title={ ' 굿파파 24시 반려동물건강검진센터 ' }  />
<Marker   coordinate={{latitude :37.4848855,longitude : 126.9698976}}    pinColor={'gray'}    title={ ' 나을동물병원 ' }  />
<Marker   coordinate={{latitude :37.4849292,longitude : 126.9941045}}    pinColor={'gray'}    title={ ' 서울종합동물병원방배 ' }  />
<Marker   coordinate={{latitude :37.4853746,longitude : 127.0170523}}    pinColor={'gray'}    title={ ' 서초동물병원 ' }  />
<Marker   coordinate={{latitude :37.4856837,longitude : 126.9873598}}    pinColor={'gray'}    title={ ' 프렌즈동물병원 ' }  />
<Marker   coordinate={{latitude :37.485878,longitude : 127.0363734}}    pinColor={'gray'}    title={ ' 대성동물약품병원 ' }  />
<Marker   coordinate={{latitude :37.485978,longitude : 127.122489}}    pinColor={'gray'}    title={ ' 문정힐스 동물병원 ' }  />
<Marker   coordinate={{latitude :37.4868231,longitude : 127.0219953}}    pinColor={'gray'}    title={ ' 서초이음동물병원 ' }  />
<Marker   coordinate={{latitude :37.4871003,longitude : 126.9906928}}    pinColor={'gray'}    title={ ' HELP 유기동물 의료센터 ' }  />
<Marker   coordinate={{latitude :37.4875474,longitude : 127.0259037}}    pinColor={'gray'}    title={ ' 메디펫 동물병원 ' }  />
<Marker   coordinate={{latitude :37.487662,longitude : 126.9755302}}    pinColor={'gray'}    title={ ' 이수동물병원 ' }  />
<Marker   coordinate={{latitude :37.4879314,longitude : 127.0091261}}    pinColor={'gray'}    title={ ' 에이원동물병원 ' }  />
<Marker   coordinate={{latitude :37.4881003,longitude : 126.9960533}}    pinColor={'gray'}    title={ ' 동물제중원금손이 동물병원 ' }  />
<Marker   coordinate={{latitude :37.4885431,longitude : 126.8843047}}    pinColor={'gray'}    title={ ' 푸른동물병원 ' }  />
<Marker   coordinate={{latitude :37.4886459,longitude : 127.0279549}}    pinColor={'gray'}    title={ ' 에이비씨(ABC)동물병원 ' }  />
<Marker   coordinate={{latitude :37.4902059,longitude : 127.0329695}}    pinColor={'gray'}    title={ ' 아이힐 동물병원 ' }  />
<Marker   coordinate={{latitude :37.4902236,longitude : 127.0203507}}    pinColor={'gray'}    title={ ' 강남서초 동물병원 ' }  />
<Marker   coordinate={{latitude :37.4908965,longitude : 127.0875101}}    pinColor={'gray'}    title={ ' 임재성동물의료센터 ' }  />
<Marker   coordinate={{latitude :37.4909882,longitude : 126.984555}}    pinColor={'gray'}    title={ ' 헤이븐동물병원 ' }  />
<Marker   coordinate={{latitude :37.4916646,longitude : 126.9914732}}    pinColor={'gray'}    title={ ' 방배한강동물병원 ' }  />
<Marker   coordinate={{latitude :37.4923809,longitude : 127.0400194}}    pinColor={'gray'}    title={ ' 예은동물병원 ' }  />
<Marker   coordinate={{latitude :37.4924237,longitude : 126.9916281}}    pinColor={'gray'}    title={ ' 남서울동물병원 ' }  />
<Marker   coordinate={{latitude :37.4929061,longitude : 127.0413543}}    pinColor={'gray'}    title={ ' 하나카동물병원 ' }  />
<Marker   coordinate={{latitude :37.4931219,longitude : 127.0354221}}    pinColor={'gray'}    title={ ' 츄츄 동물병원 ' }  />
<Marker   coordinate={{latitude :37.4931801,longitude : 126.8564319}}    pinColor={'gray'}    title={ ' 모두동물병원 ' }  />
<Marker   coordinate={{latitude :37.4934170999999,longitude : 126.9098039}}    pinColor={'gray'}    title={ ' 유석동물병원 ' }  />
<Marker   coordinate={{latitude :37.4958355,longitude : 127.0322874}}    pinColor={'gray'}    title={ ' 동물치과병원메이 ' }  />
<Marker   coordinate={{latitude :37.4966163,longitude : 126.9877312}}    pinColor={'gray'}    title={ ' 한나동물병원 ' }  />
<Marker   coordinate={{latitude :37.4966167,longitude : 126.8561624}}    pinColor={'gray'}    title={ ' 굿모닝 동물병원 ' }  />
<Marker   coordinate={{latitude :37.4968212,longitude : 126.9856096}}    pinColor={'gray'}    title={ ' 몽마르뜨 동물병원 ' }  />
<Marker   coordinate={{latitude :37.4972477,longitude : 126.9531759}}    pinColor={'gray'}    title={ ' 상도힐링동물병원 ' }  />
<Marker   coordinate={{latitude :37.4976866,longitude : 127.1066825}}    pinColor={'gray'}    title={ ' 헬리오동물병원 ' }  />
<Marker   coordinate={{latitude :37.4979136,longitude : 126.8709902}}    pinColor={'gray'}    title={ ' 서울동물복지지원센터 동물병원(구로) ' }  />
<Marker   coordinate={{latitude :37.4983183,longitude : 126.9984973}}    pinColor={'gray'}    title={ ' 서래동물병원 ' }  />
<Marker   coordinate={{latitude :37.4983516,longitude : 126.8954939}}    pinColor={'gray'}    title={ ' 왈츠동물병원 ' }  />
<Marker   coordinate={{latitude :37.4990875,longitude : 126.9971977}}    pinColor={'gray'}    title={ ' 이을반려동물케어센터 ' }  />
<Marker   coordinate={{latitude :37.499343,longitude : 127.0634426}}    pinColor={'gray'}    title={ ' 대치동물메디컬센터 ' }  />
<Marker   coordinate={{latitude :37.4996858,longitude : 126.9222933}}    pinColor={'gray'}    title={ ' 보라매웰종합동물병원 ' }  />
<Marker   coordinate={{latitude :37.4999832,longitude : 126.9507265}}    pinColor={'gray'}    title={ ' 정겨운동물병원 ' }  />
<Marker   coordinate={{latitude :37.4999946,longitude : 127.0393429}}    pinColor={'gray'}    title={ ' 백산동물병원 ' }  />
<Marker   coordinate={{latitude :37.5015534,longitude : 126.9140986}}    pinColor={'gray'}    title={ ' 신길 온동물병원 ' }  />
<Marker   coordinate={{latitude :37.5016802,longitude : 127.0505632}}    pinColor={'gray'}    title={ ' 주주동물종합병원 ' }  />
<Marker   coordinate={{latitude :37.5031933,longitude : 127.1134346}}    pinColor={'gray'}    title={ ' 한양동물병원 ' }  />
<Marker   coordinate={{latitude :37.503666,longitude : 126.9100392}}    pinColor={'gray'}    title={ ' 시그널동물병원 ' }  />
<Marker   coordinate={{latitude :37.5038002,longitude : 126.9468978}}    pinColor={'gray'}    title={ ' 우리아이동물병원 ' }  />
<Marker   coordinate={{latitude :37.5040174,longitude : 127.1138682}}    pinColor={'gray'}    title={ ' 라온펫동물병원 ' }  />
<Marker   coordinate={{latitude :37.5040174,longitude : 127.1138682}}    pinColor={'gray'}    title={ ' 서울송파 동물병원 ' }  />
<Marker   coordinate={{latitude :37.5043512,longitude : 126.9493828}}    pinColor={'gray'}    title={ ' 품 동물의료센터 ' }  />
<Marker   coordinate={{latitude :37.5044646,longitude : 126.9379818}}    pinColor={'gray'}    title={ ' 하나사랑동물병원 ' }  />
<Marker   coordinate={{latitude :37.5044951,longitude : 127.0007548}}    pinColor={'gray'}    title={ ' 신세계 동물병원 ' }  />
<Marker   coordinate={{latitude :37.5044951,longitude : 127.0007548}}    pinColor={'gray'}    title={ ' 두리종합동물병원 ' }  />
<Marker   coordinate={{latitude :37.5049039,longitude : 127.0022467}}    pinColor={'gray'}    title={ ' 헬릭스동물메디컬센터 ' }  />
<Marker   coordinate={{latitude :37.5049334,longitude : 127.0973763}}    pinColor={'gray'}    title={ ' 잠실베스트동물병원 수술재활센터 ' }  />
<Marker   coordinate={{latitude :37.5049362,longitude : 126.9219995}}    pinColor={'gray'}    title={ ' 한국동물병원 ' }  />
<Marker   coordinate={{latitude :37.5049692,longitude : 126.9423935}}    pinColor={'gray'}    title={ ' 유케어종합동물병원 ' }  />
<Marker   coordinate={{latitude :37.5051305,longitude : 126.9461259}}    pinColor={'gray'}    title={ ' 지엔동물병원 ' }  />
<Marker   coordinate={{latitude :37.505654,longitude : 126.907013}}    pinColor={'gray'}    title={ ' 라이프 동물병원 ' }  />
<Marker   coordinate={{latitude :37.5061403,longitude : 126.8771617}}    pinColor={'gray'}    title={ ' 구로다나은동물병원 ' }  />
<Marker   coordinate={{latitude :37.5064266,longitude : 127.1292244}}    pinColor={'gray'}    title={ ' 이재풍동물병원 ' }  />
<Marker   coordinate={{latitude :37.5068182,longitude : 126.8840082}}    pinColor={'gray'}    title={ ' 24시 신도림S동물의료센터 ' }  />
<Marker   coordinate={{latitude :37.5071693,longitude : 126.9112269}}    pinColor={'gray'}    title={ ' 우신종합동물병원 ' }  />
<Marker   coordinate={{latitude :37.5080213,longitude : 126.9639877}}    pinColor={'gray'}    title={ ' 흑석24시동물병원 ' }  />
<Marker   coordinate={{latitude :37.5081559,longitude : 126.8650868}}    pinColor={'gray'}    title={ ' 참사랑동물병원 ' }  />
<Marker   coordinate={{latitude :37.5085147,longitude : 127.0116623}}    pinColor={'gray'}    title={ ' 해뜨는 동물병원 해질녘책방 ' }  />
<Marker   coordinate={{latitude :37.5087505,longitude : 127.0219251}}    pinColor={'gray'}    title={ ' 라파엘동물병원 ' }  />
<Marker   coordinate={{latitude :37.5087645,longitude : 127.0035242}}    pinColor={'gray'}    title={ ' 파파동물병원 ' }  />
<Marker   coordinate={{latitude :37.5089303,longitude : 127.0266801}}    pinColor={'gray'}    title={ ' 커비동물병원 ' }  />
<Marker   coordinate={{latitude :37.5089312,longitude : 126.896606}}    pinColor={'gray'}    title={ ' 도림하나동물병원 ' }  />
<Marker   coordinate={{latitude :37.5090388,longitude : 127.114923}}    pinColor={'gray'}    title={ ' 송파 마리동물병원 ' }  />
<Marker   coordinate={{latitude :37.5092061,longitude : 127.1118818}}    pinColor={'gray'}    title={ ' 송파원동물병원 ' }  />
<Marker   coordinate={{latitude :37.5094857,longitude : 126.9605285}}    pinColor={'gray'}    title={ ' 나무동물병원 ' }  />
<Marker   coordinate={{latitude :37.5107907,longitude : 126.9120272}}    pinColor={'gray'}    title={ ' 온누리 종합동물병원 ' }  />
<Marker   coordinate={{latitude :37.5108775,longitude : 127.1189018}}    pinColor={'gray'}    title={ ' 라임동물병원 ' }  />
<Marker   coordinate={{latitude :37.5109603999999,longitude : 127.0980427}}    pinColor={'gray'}    title={ ' 웰니스동물병원(롯데월드점) ' }  />
<Marker   coordinate={{latitude :37.5112192,longitude : 127.0238712}}    pinColor={'gray'}    title={ ' 와이즈24시 동물병원 ' }  />
<Marker   coordinate={{latitude :37.5115209,longitude : 127.0791737}}    pinColor={'gray'}    title={ ' 24시잠실ON동물의료센터 ' }  />
<Marker   coordinate={{latitude :37.5116454,longitude : 126.9390259}}    pinColor={'gray'}    title={ ' 디아크동물종합병원 ' }  />
<Marker   coordinate={{latitude :37.5120683,longitude : 126.9159382}}    pinColor={'gray'}    title={ ' 아람동물병원 ' }  />
<Marker   coordinate={{latitude :37.5125118,longitude : 127.0531532}}    pinColor={'gray'}    title={ ' 마이펫동물의료센터 ' }  />
<Marker   coordinate={{latitude :37.5134014,longitude : 126.9185602}}    pinColor={'gray'}    title={ ' 한가람동물의료센터 ' }  />
<Marker   coordinate={{latitude :37.5136006,longitude : 126.9198343}}    pinColor={'gray'}    title={ ' 참 동물병원 ' }  />
<Marker   coordinate={{latitude :37.5151269,longitude : 127.1155687}}    pinColor={'gray'}    title={ ' 베를린 동물치과센터 ' }  />
<Marker   coordinate={{latitude :37.515181,longitude : 127.0324379}}    pinColor={'gray'}    title={ ' 최영민 동물의료센터 ' }  />
<Marker   coordinate={{latitude :37.515271,longitude : 126.8408412}}    pinColor={'gray'}    title={ ' 정말로동물병원 ' }  />
<Marker   coordinate={{latitude :37.5153195,longitude : 127.014023}}    pinColor={'gray'}    title={ ' 이상록동물병원 ' }  />
<Marker   coordinate={{latitude :37.5154556,longitude : 126.8597603}}    pinColor={'gray'}    title={ ' 산책동물병원 ' }  />
<Marker   coordinate={{latitude :37.5155253,longitude : 127.0493901}}    pinColor={'gray'}    title={ ' 중앙동물메디컬센터 ' }  />
<Marker   coordinate={{latitude :37.5156074,longitude : 126.9053636}}    pinColor={'gray'}    title={ ' 경인동물의료센터 ' }  />
<Marker   coordinate={{latitude :37.5162002,longitude : 126.8377477}}    pinColor={'gray'}    title={ ' 신월동물병원 ' }  />
<Marker   coordinate={{latitude :37.517007,longitude : 126.9041419}}    pinColor={'gray'}    title={ ' 러브펫 동물병원 ' }  />
<Marker   coordinate={{latitude :37.5173925,longitude : 126.8377666}}    pinColor={'gray'}    title={ ' 해맞이 동물병원 ' }  />
<Marker   coordinate={{latitude :37.5180409,longitude : 126.9779431}}    pinColor={'gray'}    title={ ' 금강동물병원 ' }  />
<Marker   coordinate={{latitude :37.5181231,longitude : 126.9260315}}    pinColor={'gray'}    title={ ' I-pet 동물병원 ' }  />
<Marker   coordinate={{latitude :37.5181712,longitude : 126.8959156}}    pinColor={'gray'}    title={ ' 도그플러스동물병원 ' }  />
<Marker   coordinate={{latitude :37.5184063,longitude : 126.8706612}}    pinColor={'gray'}    title={ ' 노아동물병원 ' }  />
<Marker   coordinate={{latitude :37.5186998,longitude : 126.9335346}}    pinColor={'gray'}    title={ ' 여의도 동물병원 ' }  />
<Marker   coordinate={{latitude :37.5191205,longitude : 126.8429762}}    pinColor={'gray'}    title={ ' 신월라온동물의료센터 ' }  />
<Marker   coordinate={{latitude :37.5193472,longitude : 126.9750134}}    pinColor={'gray'}    title={ ' 베이동물병원 ' }  />
<Marker   coordinate={{latitude :37.5193738,longitude : 126.9749156}}    pinColor={'gray'}    title={ ' (주)이상윤동물병원 ' }  />
<Marker   coordinate={{latitude :37.5197051,longitude : 127.0504898}}    pinColor={'gray'}    title={ ' 우리동생 동물병원 ' }  />
<Marker   coordinate={{latitude :37.5199656,longitude : 126.9698589}}    pinColor={'gray'}    title={ ' 24시 시유동물메디컬센터 ' }  />
<Marker   coordinate={{latitude :37.5202494,longitude : 126.9017607}}    pinColor={'gray'}    title={ ' 뉴욕동물병원 ' }  />
<Marker   coordinate={{latitude :37.5204694,longitude : 126.9333306}}    pinColor={'gray'}    title={ ' Dr.수동물병원 ' }  />
<Marker   coordinate={{latitude :37.5206222,longitude : 126.8899239}}    pinColor={'gray'}    title={ ' 캣앤캣 고양이 병원 ' }  />
<Marker   coordinate={{latitude :37.5206602,longitude : 127.0299781}}    pinColor={'gray'}    title={ ' 24시 스마트동물병원(신사본원) ' }  />
<Marker   coordinate={{latitude :37.5206602,longitude : 127.0299781}}    pinColor={'gray'}    title={ ' 스마트 정형외과 신경외과 동물병원 ' }  />
<Marker   coordinate={{latitude :37.521167,longitude : 127.0277237}}    pinColor={'gray'}    title={ ' 에이드 동물병원 ' }  />
<Marker   coordinate={{latitude :37.521223,longitude : 127.0151286}}    pinColor={'gray'}    title={ ' 리즈동물병원 ' }  />
<Marker   coordinate={{latitude :37.5214692,longitude : 126.8963286}}    pinColor={'gray'}    title={ ' 영등포동물병원 ' }  />
<Marker   coordinate={{latitude :37.5216074,longitude : 126.8742126}}    pinColor={'gray'}    title={ ' 리더스 동물병원 ' }  />
<Marker   coordinate={{latitude :37.5218997,longitude : 126.8846466}}    pinColor={'gray'}    title={ ' 애드펫동물병원 ' }  />
<Marker   coordinate={{latitude :37.5222264,longitude : 126.8426171}}    pinColor={'gray'}    title={ ' 양천종합동물병원 ' }  />
<Marker   coordinate={{latitude :37.5222741,longitude : 126.8911626}}    pinColor={'gray'}    title={ ' 24시 수 동물메디컬센터 ' }  />
<Marker   coordinate={{latitude :37.5224484,longitude : 127.1336562}}    pinColor={'gray'}    title={ ' 방주동물의료센터 ' }  />
<Marker   coordinate={{latitude :37.5225724,longitude : 126.8513814}}    pinColor={'gray'}    title={ ' 우신동물병원 ' }  />
<Marker   coordinate={{latitude :37.5228713,longitude : 126.8648753}}    pinColor={'gray'}    title={ ' 우리들동물메디컬센터 ' }  />
<Marker   coordinate={{latitude :37.5233486,longitude : 126.9077563}}    pinColor={'gray'}    title={ ' 영등포아크로 동물병원 ' }  />
<Marker   coordinate={{latitude :37.5236295,longitude : 126.8647292}}    pinColor={'gray'}    title={ ' 우리들 노령동물 암센터 ' }  />
<Marker   coordinate={{latitude :37.523752,longitude : 126.8422677}}    pinColor={'gray'}    title={ ' 햇살동물병원 ' }  />
<Marker   coordinate={{latitude :37.5242567,longitude : 126.970731}}    pinColor={'gray'}    title={ ' 바다동물병원(Bada Animal Hospital) ' }  />
<Marker   coordinate={{latitude :37.5242855,longitude : 126.9042255}}    pinColor={'gray'}    title={ ' 서울동물병원 ' }  />
<Marker   coordinate={{latitude :37.5245086,longitude : 127.0527312}}    pinColor={'gray'}    title={ ' 청담리덴동물치과병원 ' }  />
<Marker   coordinate={{latitude :37.5249286,longitude : 126.9688327}}    pinColor={'gray'}    title={ ' 워너비동물병원 용산점 ' }  />
<Marker   coordinate={{latitude :37.525117,longitude : 127.0525368}}    pinColor={'gray'}    title={ ' 청담눈초롱안과동물병원 ' }  />
<Marker   coordinate={{latitude :37.5257763,longitude : 126.8703272}}    pinColor={'gray'}    title={ ' 쿨펫이마트 목동점 동물병원 ' }  />
<Marker   coordinate={{latitude :37.5260254,longitude : 127.0246603}}    pinColor={'gray'}    title={ ' 튼튼동물병원 ' }  />
<Marker   coordinate={{latitude :37.5276966,longitude : 126.8984916}}    pinColor={'gray'}    title={ ' 그림책 읽어주는 동물병원 ' }  />
<Marker   coordinate={{latitude :37.5282487,longitude : 126.9991845}}    pinColor={'gray'}    title={ ' 21세기동물병원 ' }  />
<Marker   coordinate={{latitude :37.5285937,longitude : 126.9042}}    pinColor={'gray'}    title={ ' 미소로동물병원 ' }  />
<Marker   coordinate={{latitude :37.5286515,longitude : 127.0325486}}    pinColor={'gray'}    title={ ' 압구정동물병원 ' }  />
<Marker   coordinate={{latitude :37.5289813,longitude : 126.847665}}    pinColor={'gray'}    title={ ' 우장동물병원 ' }  />
<Marker   coordinate={{latitude :37.5291722,longitude : 126.8759793}}    pinColor={'gray'}    title={ ' 행복한세상동물병원 ' }  />
<Marker   coordinate={{latitude :37.5298053,longitude : 127.1365795}}    pinColor={'gray'}    title={ ' 둔촌동물병원 ' }  />
<Marker   coordinate={{latitude :37.5304815,longitude : 126.8411342}}    pinColor={'gray'}    title={ ' 미래동물병원 ' }  />
<Marker   coordinate={{latitude :37.5313856,longitude : 126.8550252}}    pinColor={'gray'}    title={ ' 고득영동물병원 ' }  />
<Marker   coordinate={{latitude :37.5317518,longitude : 127.0793493}}    pinColor={'gray'}    title={ ' 자양동물병원 ' }  />
<Marker   coordinate={{latitude :37.5320641,longitude : 126.9049998}}    pinColor={'gray'}    title={ ' 이든동물의료센터 ' }  />
<Marker   coordinate={{latitude :37.5321839,longitude : 126.8395125}}    pinColor={'gray'}    title={ ' 강서동물병원 ' }  />
<Marker   coordinate={{latitude :37.5323375,longitude : 127.0857348}}    pinColor={'gray'}    title={ ' 아이본 동물병원 ' }  />
<Marker   coordinate={{latitude :37.5323764,longitude : 127.0052674}}    pinColor={'gray'}    title={ ' 한남동물병원 ' }  />
<Marker   coordinate={{latitude :37.5330255999999,longitude : 126.8445875}}    pinColor={'gray'}    title={ ' 용봉동물병원 ' }  />
<Marker   coordinate={{latitude :37.5332974,longitude : 126.9022397}}    pinColor={'gray'}    title={ ' 디오빌 동물병원 ' }  />
<Marker   coordinate={{latitude :37.5339307,longitude : 127.1431488}}    pinColor={'gray'}    title={ ' 김태화동물병원 ' }  />
<Marker   coordinate={{latitude :37.5339827,longitude : 126.9503898}}    pinColor={'gray'}    title={ ' 민트동물병원 ' }  />
<Marker   coordinate={{latitude :37.5342324,longitude : 126.9510943}}    pinColor={'gray'}    title={ ' 차오름동물병원 ' }  />
<Marker   coordinate={{latitude :37.5342987999999,longitude : 127.1359586}}    pinColor={'gray'}    title={ ' 강동24시 SKY 동물의료센터 ' }  />
<Marker   coordinate={{latitude :37.5346226,longitude : 127.0095785}}    pinColor={'gray'}    title={ ' 더힐동물의료센터 ' }  />
<Marker   coordinate={{latitude :37.5347866,longitude : 126.8632594}}    pinColor={'gray'}    title={ ' 서울플러스종합동물병원 ' }  />
<Marker   coordinate={{latitude :37.5348747,longitude : 127.0703598}}    pinColor={'gray'}    title={ ' 준동물병원 ' }  />
<Marker   coordinate={{latitude :37.5350396,longitude : 127.1441442}}    pinColor={'gray'}    title={ ' 길종합동물병원 ' }  />
<Marker   coordinate={{latitude :37.5350938,longitude : 126.8637498}}    pinColor={'gray'}    title={ ' 하니동물병원 ' }  />
<Marker   coordinate={{latitude :37.5354864,longitude : 127.0065643}}    pinColor={'gray'}    title={ ' 달래동물의료센터 ' }  />
<Marker   coordinate={{latitude :37.5355974,longitude : 126.9988408}}    pinColor={'gray'}    title={ ' 더벳한남동물병원 ' }  />
<Marker   coordinate={{latitude :37.5356344,longitude : 127.0818961}}    pinColor={'gray'}    title={ ' 우주동물병원 ' }  />
<Marker   coordinate={{latitude :37.5356552999999,longitude : 127.1388554}}    pinColor={'gray'}    title={ ' 펫트리동물의료센터 ' }  />
<Marker   coordinate={{latitude :37.5357608,longitude : 127.0660729}}    pinColor={'gray'}    title={ ' 이다종합동물병원 ' }  />
<Marker   coordinate={{latitude :37.536167,longitude : 126.8284415}}    pinColor={'gray'}    title={ ' 민병철동물병원 ' }  />
<Marker   coordinate={{latitude :37.5365053,longitude : 126.9607288}}    pinColor={'gray'}    title={ ' 원효종합동물병원 ' }  />
<Marker   coordinate={{latitude :37.5367037,longitude : 126.8995891}}    pinColor={'gray'}    title={ ' 플러스동물메디컬센터 ' }  />
<Marker   coordinate={{latitude :37.5368792,longitude : 127.0617852}}    pinColor={'gray'}    title={ ' 노룬산동물병원 ' }  />
<Marker   coordinate={{latitude :37.5369219,longitude : 126.8379048}}    pinColor={'gray'}    title={ ' 올스타동물의료센터 ' }  />
<Marker   coordinate={{latitude :37.5372755,longitude : 126.8719574}}    pinColor={'gray'}    title={ ' 봄날동물병원 ' }  />
<Marker   coordinate={{latitude :37.5377789,longitude : 126.9472518}}    pinColor={'gray'}    title={ ' 도화동물병원 ' }  />
<Marker   coordinate={{latitude :37.5382047,longitude : 126.9672214}}    pinColor={'gray'}    title={ ' 좋아서하는 동물병원 ' }  />
<Marker   coordinate={{latitude :37.5388458,longitude : 127.0908482}}    pinColor={'gray'}    title={ ' 프라임동물병원 ' }  />
<Marker   coordinate={{latitude :37.5392832,longitude : 126.9618569}}    pinColor={'gray'}    title={ ' 효창동물병원 ' }  />
<Marker   coordinate={{latitude :37.5395573,longitude : 126.9610667}}    pinColor={'gray'}    title={ ' 펫동물병원 ' }  />
<Marker   coordinate={{latitude :37.5396116,longitude : 126.9895367}}    pinColor={'gray'}    title={ ' 라온동물병원 ' }  />
<Marker   coordinate={{latitude :37.5397341,longitude : 126.8344371}}    pinColor={'gray'}    title={ ' 파스텔동물병원 ' }  />
<Marker   coordinate={{latitude :37.5416691,longitude : 126.9873793}}    pinColor={'gray'}    title={ ' 한사랑동물병원 ' }  />
<Marker   coordinate={{latitude :37.5416953,longitude : 127.1304042}}    pinColor={'gray'}    title={ ' 세종동물병원 ' }  />
<Marker   coordinate={{latitude :37.541743,longitude : 127.096198}}    pinColor={'gray'}    title={ ' 동서울동물병원 ' }  />
<Marker   coordinate={{latitude :37.5423301,longitude : 127.1419222}}    pinColor={'gray'}    title={ ' 강동동물병원 ' }  />
<Marker   coordinate={{latitude :37.5429776,longitude : 126.9378623}}    pinColor={'gray'}    title={ ' 닥터 호오 동물병원 ' }  />
<Marker   coordinate={{latitude :37.5438546,longitude : 126.8431508}}    pinColor={'gray'}    title={ ' 대한동물병원 ' }  />
<Marker   coordinate={{latitude :37.5439796,longitude : 126.8624166}}    pinColor={'gray'}    title={ ' 강현림 종합동물병원 ' }  />
<Marker   coordinate={{latitude :37.5446204,longitude : 126.9526393}}    pinColor={'gray'}    title={ ' 공덕 건강한 동물병원 ' }  />
<Marker   coordinate={{latitude :37.5447282,longitude : 126.9459953}}    pinColor={'gray'}    title={ ' 굿모닝 동물병원 ' }  />
<Marker   coordinate={{latitude :37.544793,longitude : 126.9394491}}    pinColor={'gray'}    title={ ' 용강동물병원 ' }  />
<Marker   coordinate={{latitude :37.5451924,longitude : 127.0859286}}    pinColor={'gray'}    title={ ' 광진동물의료센터 ' }  />
<Marker   coordinate={{latitude :37.5461188,longitude : 126.9452243}}    pinColor={'gray'}    title={ ' 아이웰 동물의료센터 ' }  />
<Marker   coordinate={{latitude :37.5463089,longitude : 126.9101219}}    pinColor={'gray'}    title={ ' 캣&덴탈 하이디 동물병원 ' }  />
<Marker   coordinate={{latitude :37.5464743,longitude : 126.9581687}}    pinColor={'gray'}    title={ ' C.T.종합동물병원 ' }  />
<Marker   coordinate={{latitude :37.5467885,longitude : 127.0448729}}    pinColor={'gray'}    title={ ' 오늘동물병원 ' }  />
<Marker   coordinate={{latitude :37.5472582,longitude : 127.0732808}}    pinColor={'gray'}    title={ ' 피카소동물병원 ' }  />
<Marker   coordinate={{latitude :37.5478086,longitude : 127.1052825}}    pinColor={'gray'}    title={ ' 나루동물병원 ' }  />
<Marker   coordinate={{latitude :37.5478828,longitude : 126.922737}}    pinColor={'gray'}    title={ ' 셀레네동물병원 ' }  />
<Marker   coordinate={{latitude :37.5479925,longitude : 127.0210255}}    pinColor={'gray'}    title={ ' 아지동물병원 ' }  />
<Marker   coordinate={{latitude :37.5480145999999,longitude : 127.1355966}}    pinColor={'gray'}    title={ ' CH동물병원 ' }  />
<Marker   coordinate={{latitude :37.5480366,longitude : 126.8345704}}    pinColor={'gray'}    title={ ' 오즈동물병원 ' }  />
<Marker   coordinate={{latitude :37.5480536,longitude : 126.9183675}}    pinColor={'gray'}    title={ ' 홍익동물종합병원 ' }  />
<Marker   coordinate={{latitude :37.5482102,longitude : 127.1730939}}    pinColor={'gray'}    title={ ' GD동물병원 ' }  />
<Marker   coordinate={{latitude :37.548461,longitude : 127.0672136}}    pinColor={'gray'}    title={ ' 수동물병원 ' }  />
<Marker   coordinate={{latitude :37.5485366,longitude : 127.143303}}    pinColor={'gray'}    title={ ' 안단테 동물병원 ' }  />
<Marker   coordinate={{latitude :37.5492368,longitude : 127.1434387}}    pinColor={'gray'}    title={ ' 동물병원 공감 ' }  />
<Marker   coordinate={{latitude :37.549363,longitude : 127.0818126}}    pinColor={'gray'}    title={ ' 서울어린이대공원동물병원 ' }  />
<Marker   coordinate={{latitude :37.5502138,longitude : 127.1467061}}    pinColor={'gray'}    title={ ' 피카소동물병원 ' }  />
<Marker   coordinate={{latitude :37.5502209,longitude : 127.1500409}}    pinColor={'gray'}    title={ ' 사랑이있는동물병원 ' }  />
<Marker   coordinate={{latitude :37.5507158,longitude : 126.9160622}}    pinColor={'gray'}    title={ ' 뉴욕종합동물병원 ' }  />
<Marker   coordinate={{latitude :37.5507552,longitude : 127.1717462}}    pinColor={'gray'}    title={ ' Dr.베토벤동물병원 ' }  />
<Marker   coordinate={{latitude :37.5508666,longitude : 126.8365747}}    pinColor={'gray'}    title={ ' 우장산동물의료센터 ' }  />
<Marker   coordinate={{latitude :37.550953,longitude : 126.9565276}}    pinColor={'gray'}    title={ ' 24시 산들산들 동물병원 ' }  />
<Marker   coordinate={{latitude :37.5512282,longitude : 126.8711315}}    pinColor={'gray'}    title={ ' 서서울동물병원 ' }  />
<Marker   coordinate={{latitude :37.5515076999999,longitude : 127.1277099}}    pinColor={'gray'}    title={ ' 올바른동물병원 ' }  />
<Marker   coordinate={{latitude :37.55177,longitude : 127.0902383}}    pinColor={'gray'}    title={ ' 아차산동물병원 ' }  />
<Marker   coordinate={{latitude :37.5519837,longitude : 127.1279275}}    pinColor={'gray'}    title={ ' 암사동물병원 ' }  />
<Marker   coordinate={{latitude :37.5520315,longitude : 127.0080279}}    pinColor={'gray'}    title={ ' 애니컴 메디컬센터 ' }  />
<Marker   coordinate={{latitude :37.5521584,longitude : 126.8707881}}    pinColor={'gray'}    title={ ' 푸른들동물병원 ' }  />
<Marker   coordinate={{latitude :37.5528533,longitude : 126.9065133}}    pinColor={'gray'}    title={ ' 박효리군 동물병원 ' }  />
<Marker   coordinate={{latitude :37.5530746,longitude : 126.8697331}}    pinColor={'gray'}    title={ ' 염창제일동물병원 ' }  />
<Marker   coordinate={{latitude :37.5530909999999,longitude : 126.9220032}}    pinColor={'gray'}    title={ ' 웰케어동물병원 ' }  />
<Marker   coordinate={{latitude :37.5534014,longitude : 126.9122987}}    pinColor={'gray'}    title={ ' 이층애 고양이동물병원 ' }  />
<Marker   coordinate={{latitude :37.5534014,longitude : 126.9122987}}    pinColor={'gray'}    title={ ' 로얄동물메디컬센터w ' }  />
<Marker   coordinate={{latitude :37.5534781,longitude : 126.8264569}}    pinColor={'gray'}    title={ ' 마음사랑 동물병원 ' }  />
<Marker   coordinate={{latitude :37.5534897,longitude : 126.9177304}}    pinColor={'gray'}    title={ ' 아이엠 동물병원 ' }  />
<Marker   coordinate={{latitude :37.5540272,longitude : 127.1292084}}    pinColor={'gray'}    title={ ' 마리스동물의료센터 ' }  />
<Marker   coordinate={{latitude :37.554202,longitude : 126.9341866}}    pinColor={'gray'}    title={ ' 서진동물병원 ' }  />
<Marker   coordinate={{latitude :37.5544972,longitude : 127.0870554}}    pinColor={'gray'}    title={ ' 서울동물병원 ' }  />
<Marker   coordinate={{latitude :37.5546422,longitude : 126.834636}}    pinColor={'gray'}    title={ ' 스마일동물병원 ' }  />
<Marker   coordinate={{latitude :37.5547643,longitude : 126.964253}}    pinColor={'gray'}    title={ ' 백슬동물병원 ' }  />
<Marker   coordinate={{latitude :37.554905,longitude : 127.1367144}}    pinColor={'gray'}    title={ ' 가나동물병원 ' }  />
<Marker   coordinate={{latitude :37.5551902,longitude : 126.9380557}}    pinColor={'gray'}    title={ ' 웨스턴 동물의료센터 ' }  />
<Marker   coordinate={{latitude :37.5552152,longitude : 127.1403292}}    pinColor={'gray'}    title={ ' 돌봄동물병원 ' }  />
<Marker   coordinate={{latitude :37.5554572,longitude : 126.836835}}    pinColor={'gray'}    title={ ' 박동물병원 ' }  />
<Marker   coordinate={{latitude :37.5559126,longitude : 127.0290958}}    pinColor={'gray'}    title={ ' 평생피부과동물병원 ' }  />
<Marker   coordinate={{latitude :37.556307,longitude : 126.9426292}}    pinColor={'gray'}    title={ ' 디엔씨동물병원 ' }  />
<Marker   coordinate={{latitude :37.5565274,longitude : 126.9045401}}    pinColor={'gray'}    title={ ' 서교동물병원 ' }  />
<Marker   coordinate={{latitude :37.5567165,longitude : 127.0403003}}    pinColor={'gray'}    title={ ' 바우라움동물병원 ' }  />
<Marker   coordinate={{latitude :37.5569117,longitude : 126.8522274}}    pinColor={'gray'}    title={ ' 강서YD동물의료센터 ' }  />
<Marker   coordinate={{latitude :37.556996,longitude : 126.9533139}}    pinColor={'gray'}    title={ ' 월드펫동물병원 ' }  />
<Marker   coordinate={{latitude :37.5571583,longitude : 126.9492609}}    pinColor={'gray'}    title={ ' 링크동물의료센터 ' }  />
<Marker   coordinate={{latitude :37.5573504,longitude : 126.9092511}}    pinColor={'gray'}    title={ ' 푸른숲 동물병원 ' }  />
<Marker   coordinate={{latitude :37.5574629,longitude : 127.0347413}}    pinColor={'gray'}    title={ ' 바우라움동물병원 ' }  />
<Marker   coordinate={{latitude :37.5576578,longitude : 126.9225126}}    pinColor={'gray'}    title={ ' 워너비 동물병원 ' }  />
<Marker   coordinate={{latitude :37.5579504,longitude : 126.9281289}}    pinColor={'gray'}    title={ ' 마리동물병원 ' }  />
<Marker   coordinate={{latitude :37.5582928,longitude : 126.8455602}}    pinColor={'gray'}    title={ ' 로운동물의료센터 ' }  />
<Marker   coordinate={{latitude :37.5584231,longitude : 126.9546193}}    pinColor={'gray'}    title={ ' 마음을 나누는 동물병원 ' }  />
<Marker   coordinate={{latitude :37.5589522,longitude : 126.8288434}}    pinColor={'gray'}    title={ ' 땅콩 동물병원 ' }  />
<Marker   coordinate={{latitude :37.5592936,longitude : 127.0809155}}    pinColor={'gray'}    title={ ' 방주종합동물병원 ' }  />
<Marker   coordinate={{latitude :37.5596166,longitude : 127.0369899}}    pinColor={'gray'}    title={ ' 한양동물메디컬센터 ' }  />
<Marker   coordinate={{latitude :37.5600646,longitude : 126.8563419}}    pinColor={'gray'}    title={ ' 24시 안박동물병원 ' }  />
<Marker   coordinate={{latitude :37.5604784,longitude : 127.0190886}}    pinColor={'gray'}    title={ ' 좋아요 동물병원 ' }  />
<Marker   coordinate={{latitude :37.560789,longitude : 127.0812197}}    pinColor={'gray'}    title={ ' 스마트동물병원군자점 ' }  />
<Marker   coordinate={{latitude :37.5615738,longitude : 127.0194523}}    pinColor={'gray'}    title={ ' 24시SD동물영상의료센터 ' }  />
<Marker   coordinate={{latitude :37.5615738,longitude : 127.0194523}}    pinColor={'gray'}    title={ ' 24시SD동물의료센터성동 ' }  />
<Marker   coordinate={{latitude :37.5625886,longitude : 126.8529818}}    pinColor={'gray'}    title={ ' 해맑은동물병원 ' }  />
<Marker   coordinate={{latitude :37.5627064,longitude : 127.0815561}}    pinColor={'gray'}    title={ ' 중곡동물병원 ' }  />
<Marker   coordinate={{latitude :37.5628661,longitude : 126.8403997}}    pinColor={'gray'}    title={ ' 차지우동물병원 ' }  />
<Marker   coordinate={{latitude :37.5632319,longitude : 126.8511615}}    pinColor={'gray'}    title={ ' 가양쿨펫동물병원 ' }  />
<Marker   coordinate={{latitude :37.5632814,longitude : 127.1570594}}    pinColor={'gray'}    title={ ' 고덕 고래힐동물병원 ' }  />
<Marker   coordinate={{latitude :37.5634635,longitude : 127.015948}}    pinColor={'gray'}    title={ ' 메종동물병원 ' }  />
<Marker   coordinate={{latitude :37.5653961,longitude : 127.0837734}}    pinColor={'gray'}    title={ ' 드림펫 동물병원 ' }  />
<Marker   coordinate={{latitude :37.5654682,longitude : 127.0303086}}    pinColor={'gray'}    title={ ' 라임동물병원 ' }  />
<Marker   coordinate={{latitude :37.5659043,longitude : 127.0033344}}    pinColor={'gray'}    title={ ' 헬릭스동물심장수술센터 ' }  />
<Marker   coordinate={{latitude :37.5659043,longitude : 127.0033344}}    pinColor={'gray'}    title={ ' 헬릭스동물암센터 ' }  />
<Marker   coordinate={{latitude :37.5659043,longitude : 127.0033344}}    pinColor={'gray'}    title={ ' 서울동물영상종양센터 ' }  />
<Marker   coordinate={{latitude :37.5659239,longitude : 127.0814283}}    pinColor={'gray'}    title={ ' 다온동물병원 ' }  />
<Marker   coordinate={{latitude :37.5659781,longitude : 126.9108372}}    pinColor={'gray'}    title={ ' 라온동물병원 ' }  />
<Marker   coordinate={{latitude :37.5661564,longitude : 127.0256975}}    pinColor={'gray'}    title={ ' 베이지동물병원 ' }  />
<Marker   coordinate={{latitude :37.5669648999999,longitude : 126.9097901}}    pinColor={'gray'}    title={ ' 와우 동물병원 ' }  />
<Marker   coordinate={{latitude :37.5689958,longitude : 126.9320662}}    pinColor={'gray'}    title={ ' 연희동물병원 ' }  />
<Marker   coordinate={{latitude :37.5691731,longitude : 126.9330394}}    pinColor={'gray'}    title={ ' 라파엘종합동물병원 ' }  />
<Marker   coordinate={{latitude :37.5700851,longitude : 127.0568793}}    pinColor={'gray'}    title={ ' 동대문 루시드 동물메디컬센터 ' }  />
<Marker   coordinate={{latitude :37.5705113,longitude : 126.9639734}}    pinColor={'gray'}    title={ ' 경희궁 바른 동물병원 ' }  />
<Marker   coordinate={{latitude :37.5708604,longitude : 126.9612919}}    pinColor={'gray'}    title={ ' 우리동물병원 ' }  />
<Marker   coordinate={{latitude :37.5708733,longitude : 127.0213284}}    pinColor={'gray'}    title={ ' 웰니스클리닉(청계천점) ' }  />
<Marker   coordinate={{latitude :37.5711794,longitude : 126.8171765}}    pinColor={'gray'}    title={ ' SKY동물병원 ' }  />
<Marker   coordinate={{latitude :37.5717601,longitude : 127.0571027}}    pinColor={'gray'}    title={ ' 그랜드동물병원 ' }  />
<Marker   coordinate={{latitude :37.5727411,longitude : 126.9357258}}    pinColor={'gray'}    title={ ' 헬로우 동물병원 ' }  />
<Marker   coordinate={{latitude :37.5748642,longitude : 127.0155003}}    pinColor={'gray'}    title={ ' 해동물병원 ' }  />
<Marker   coordinate={{latitude :37.5754989,longitude : 126.8901044}}    pinColor={'gray'}    title={ ' 서울동물복지지원센터 동물병원 ' }  />
<Marker   coordinate={{latitude :37.5757437,longitude : 126.915567}}    pinColor={'gray'}    title={ ' 프란다스동물병원 ' }  />
<Marker   coordinate={{latitude :37.5757539,longitude : 126.9710573}}    pinColor={'gray'}    title={ ' 누리봄동물병원 ' }  />
<Marker   coordinate={{latitude :37.5760165,longitude : 126.8946625}}    pinColor={'gray'}    title={ ' 상암동물병원 ' }  />
<Marker   coordinate={{latitude :37.5762868,longitude : 126.8932139}}    pinColor={'gray'}    title={ ' 동물병원 닥터K ' }  />
<Marker   coordinate={{latitude :37.5764563,longitude : 126.813873}}    pinColor={'gray'}    title={ ' 굿모닝동물병원 ' }  />
<Marker   coordinate={{latitude :37.5764888,longitude : 126.8307466}}    pinColor={'gray'}    title={ ' 마곡나무 동물병원 ' }  />
<Marker   coordinate={{latitude :37.5764888,longitude : 126.8307466}}    pinColor={'gray'}    title={ ' 공감동물병원 ' }  />
<Marker   coordinate={{latitude :37.5764888,longitude : 126.8307466}}    pinColor={'gray'}    title={ ' 참동물병원 ' }  />
<Marker   coordinate={{latitude :37.5764888,longitude : 126.8307466}}    pinColor={'gray'}    title={ ' 모모동물병원 ' }  />
<Marker   coordinate={{latitude :37.5769195,longitude : 127.0857526}}    pinColor={'gray'}    title={ ' 보람동물병원 ' }  />
<Marker   coordinate={{latitude :37.5772578,longitude : 127.0856896}}    pinColor={'gray'}    title={ ' 주연동물병원 ' }  />
<Marker   coordinate={{latitude :37.5776394,longitude : 126.8886338}}    pinColor={'gray'}    title={ ' 아프지말게 동물병원 ' }  />
<Marker   coordinate={{latitude :37.5786667,longitude : 127.0156223}}    pinColor={'gray'}    title={ ' 우리동물병원 ' }  />
<Marker   coordinate={{latitude :37.5790029,longitude : 126.9711451}}    pinColor={'gray'}    title={ ' 광화문동물병원 ' }  />
<Marker   coordinate={{latitude :37.5798727,longitude : 127.0877952}}    pinColor={'gray'}    title={ ' 성지동물병원 ' }  />
<Marker   coordinate={{latitude :37.5811577,longitude : 127.0848958}}    pinColor={'gray'}    title={ ' 면목동물병원 ' }  />
<Marker   coordinate={{latitude :37.5822302,longitude : 127.0881876}}    pinColor={'gray'}    title={ ' 혜원동물병원 ' }  />
<Marker   coordinate={{latitude :37.5833103,longitude : 127.0794507}}    pinColor={'gray'}    title={ ' 레미 동물병원 ' }  />
<Marker   coordinate={{latitude :37.583651,longitude : 126.8179495}}    pinColor={'gray'}    title={ ' 하나동물병원 ' }  />
<Marker   coordinate={{latitude :37.5839502,longitude : 127.0198223}}    pinColor={'gray'}    title={ ' 24시 애니동물병원 ' }  />
<Marker   coordinate={{latitude :37.5844214,longitude : 126.9699813}}    pinColor={'gray'}    title={ ' 선동물병원 ' }  />
<Marker   coordinate={{latitude :37.5845012,longitude : 126.9990943}}    pinColor={'gray'}    title={ ' 대학로동물병원 ' }  />
<Marker   coordinate={{latitude :37.5856012,longitude : 126.9156924}}    pinColor={'gray'}    title={ ' 다솜동물병원 ' }  />
<Marker   coordinate={{latitude :37.5869615,longitude : 126.908527}}    pinColor={'gray'}    title={ ' 가든펫동물병원 ' }  />
<Marker   coordinate={{latitude :37.5874369,longitude : 127.0941082}}    pinColor={'gray'}    title={ ' 닥터멍동물병원 ' }  />
<Marker   coordinate={{latitude :37.5881475,longitude : 127.0858848}}    pinColor={'gray'}    title={ ' 한국동물메디컬센터(KAMC) ' }  />
<Marker   coordinate={{latitude :37.5887575,longitude : 127.0883288}}    pinColor={'gray'}    title={ ' 엔젤동물병원 ' }  />
<Marker   coordinate={{latitude :37.5892125,longitude : 127.0905471}}    pinColor={'gray'}    title={ ' 숲속동물병원 ' }  />
<Marker   coordinate={{latitude :37.5899226,longitude : 127.0973606}}    pinColor={'gray'}    title={ ' 보담동물병원 ' }  />
<Marker   coordinate={{latitude :37.5907719,longitude : 126.9159491}}    pinColor={'gray'}    title={ ' 오거리동물병원 ' }  />
<Marker   coordinate={{latitude :37.5915544,longitude : 127.0869415}}    pinColor={'gray'}    title={ ' 하스펫탈동물병원 ' }  />
<Marker   coordinate={{latitude :37.591659,longitude : 126.9409143}}    pinColor={'gray'}    title={ ' 신영동물병원 ' }  />
<Marker   coordinate={{latitude :37.591791,longitude : 127.0725556}}    pinColor={'gray'}    title={ ' 서울우유협동조합유우진료소 ' }  />
<Marker   coordinate={{latitude :37.5920079,longitude : 126.9178935}}    pinColor={'gray'}    title={ ' 한얼동물병원 ' }  />
<Marker   coordinate={{latitude :37.5922073,longitude : 127.0134454}}    pinColor={'gray'}    title={ ' VIP 동물의료센터 ' }  />
<Marker   coordinate={{latitude :37.5924044,longitude : 127.072651}}    pinColor={'gray'}    title={ ' 중랑차 동물병원 ' }  />
<Marker   coordinate={{latitude :37.5949992,longitude : 127.0794098}}    pinColor={'gray'}    title={ ' 한국동물영상의학센터 ' }  />
<Marker   coordinate={{latitude :37.5952348,longitude : 126.9183179}}    pinColor={'gray'}    title={ ' 응암동물병원 ' }  />
<Marker   coordinate={{latitude :37.5952924,longitude : 127.0795806}}    pinColor={'gray'}    title={ ' 24시 동물응급의료센터 ' }  />
<Marker   coordinate={{latitude :37.5952924,longitude : 127.0795806}}    pinColor={'gray'}    title={ ' 로얄동물메디컬센터 ' }  />
<Marker   coordinate={{latitude :37.5969428,longitude : 126.9200495}}    pinColor={'gray'}    title={ ' 야옹동물병원 ' }  />
<Marker   coordinate={{latitude :37.5972274,longitude : 127.0875279}}    pinColor={'gray'}    title={ ' 닥터 아이펫 동물병원 ' }  />
<Marker   coordinate={{latitude :37.5982273,longitude : 126.9109953}}    pinColor={'gray'}    title={ ' 늘푸른동물병원 ' }  />
<Marker   coordinate={{latitude :37.598422,longitude : 127.1005678}}    pinColor={'gray'}    title={ ' 금란동물병원 ' }  />
<Marker   coordinate={{latitude :37.5986441,longitude : 127.0962349}}    pinColor={'gray'}    title={ ' 세진동물병원 ' }  />
<Marker   coordinate={{latitude :37.5988401,longitude : 126.960261}}    pinColor={'gray'}    title={ ' 북악동물병원 ' }  />
<Marker   coordinate={{latitude :37.5997452,longitude : 126.9181133}}    pinColor={'gray'}    title={ ' 24시스마트동물메디컬센터 ' }  />
<Marker   coordinate={{latitude :37.6009061,longitude : 126.9101205}}    pinColor={'gray'}    title={ ' 한마음동물병원 ' }  />
<Marker   coordinate={{latitude :37.6010253,longitude : 126.9307365}}    pinColor={'gray'}    title={ ' LOVE MY PET 동물병원 ' }  />
<Marker   coordinate={{latitude :37.6013963,longitude : 126.9314129}}    pinColor={'gray'}    title={ ' 치유동물의료센터 ' }  />
<Marker   coordinate={{latitude :37.6016925,longitude : 127.0787656}}    pinColor={'gray'}    title={ ' 진정훈동물병원 ' }  />
<Marker   coordinate={{latitude :37.6026635,longitude : 127.0856846}}    pinColor={'gray'}    title={ ' 신내동물병원 ' }  />
<Marker   coordinate={{latitude :37.6046561,longitude : 127.0959119}}    pinColor={'gray'}    title={ ' 진서동물병원 ' }  />
<Marker   coordinate={{latitude :37.6050099,longitude : 127.095637}}    pinColor={'gray'}    title={ ' 아이봄 동물병원 ' }  />
<Marker   coordinate={{latitude :37.6058471,longitude : 126.9336721}}    pinColor={'gray'}    title={ ' 어울동물의료센터 ' }  />
<Marker   coordinate={{latitude :37.6059928,longitude : 126.9608104}}    pinColor={'gray'}    title={ ' 월드펫동물병원 ' }  />
<Marker   coordinate={{latitude :37.6074525,longitude : 126.9221367}}    pinColor={'gray'}    title={ ' 새은평동물의료센터 ' }  />
<Marker   coordinate={{latitude :37.6077895,longitude : 127.0983261}}    pinColor={'gray'}    title={ ' 행복이 있는 동물병원 ' }  />
<Marker   coordinate={{latitude :37.6080074,longitude : 126.931631}}    pinColor={'gray'}    title={ ' 녹번동물병원 ' }  />
<Marker   coordinate={{latitude :37.610629,longitude : 127.0773891}}    pinColor={'gray'}    title={ ' 홍상희동물병원 ' }  />
<Marker   coordinate={{latitude :37.6110627,longitude : 127.0337468}}    pinColor={'gray'}    title={ ' 창문동물병원 ' }  />
<Marker   coordinate={{latitude :37.6111105,longitude : 126.9168115}}    pinColor={'gray'}    title={ ' 로얄동물병원 ' }  />
<Marker   coordinate={{latitude :37.6112467,longitude : 126.9297588}}    pinColor={'gray'}    title={ ' 불광동물병원 ' }  />
<Marker   coordinate={{latitude :37.6119461,longitude : 127.0354377}}    pinColor={'gray'}    title={ ' 호 동물병원 ' }  />
<Marker   coordinate={{latitude :37.6125542,longitude : 127.0775737}}    pinColor={'gray'}    title={ ' 태능동물병원 ' }  />
<Marker   coordinate={{latitude :37.6142301,longitude : 127.0208782}}    pinColor={'gray'}    title={ ' 삼성동물병원 ' }  />
<Marker   coordinate={{latitude :37.6142301,longitude : 127.0208782}}    pinColor={'gray'}    title={ ' 쿠키동물병원 ' }  />
<Marker   coordinate={{latitude :37.6153175,longitude : 126.9178005}}    pinColor={'gray'}    title={ ' 금쪽같은내새끼 동물병원 ' }  />
<Marker   coordinate={{latitude :37.6163947,longitude : 127.0926039}}    pinColor={'gray'}    title={ ' 쥬라기동물병원 ' }  />
<Marker   coordinate={{latitude :37.616864,longitude : 127.0915681}}    pinColor={'gray'}    title={ ' 하니동물병원 ' }  />
<Marker   coordinate={{latitude :37.6169242,longitude : 127.0303657}}    pinColor={'gray'}    title={ ' 중앙동물병원 ' }  />
<Marker   coordinate={{latitude :37.6171833,longitude : 127.0220243}}    pinColor={'gray'}    title={ ' 아이사랑동물병원 ' }  />
<Marker   coordinate={{latitude :37.6199188,longitude : 127.0128244}}    pinColor={'gray'}    title={ ' 사랑의 동물병원 ' }  />
<Marker   coordinate={{latitude :37.6206102,longitude : 127.0749119}}    pinColor={'gray'}    title={ ' 골드퍼피동물병원 공릉점 ' }  />
<Marker   coordinate={{latitude :37.6208595,longitude : 127.0210518}}    pinColor={'gray'}    title={ ' 삼양동물병원 ' }  />
<Marker   coordinate={{latitude :37.6213495,longitude : 126.9195345}}    pinColor={'gray'}    title={ ' 김정복동물병원 ' }  />
<Marker   coordinate={{latitude :37.6216624,longitude : 127.0738521}}    pinColor={'gray'}    title={ ' 메인동물메디컬센터 ' }  />
<Marker   coordinate={{latitude :37.6217888,longitude : 127.0691925}}    pinColor={'gray'}    title={ ' 아란종합동물병원 ' }  />
<Marker   coordinate={{latitude :37.622143,longitude : 127.0863716}}    pinColor={'gray'}    title={ ' 키움 동물병원 ' }  />
<Marker   coordinate={{latitude :37.6237517,longitude : 127.0732642}}    pinColor={'gray'}    title={ ' 스마일플러스동물병원 ' }  />
<Marker   coordinate={{latitude :37.6241853,longitude : 126.837199}}    pinColor={'gray'}    title={ ' 하트온동물병원 ' }  />
<Marker   coordinate={{latitude :37.6247359,longitude : 127.0817031}}    pinColor={'gray'}    title={ ' 화랑동물병원 ' }  />
<Marker   coordinate={{latitude :37.6258099,longitude : 127.0184618}}    pinColor={'gray'}    title={ ' 봉식동물병원 ' }  />
<Marker   coordinate={{latitude :37.6266854,longitude : 127.0262534}}    pinColor={'gray'}    title={ ' 위즈동물병원 ' }  />
<Marker   coordinate={{latitude :37.6277451,longitude : 127.0568215}}    pinColor={'gray'}    title={ ' 유림동물병원 ' }  />
<Marker   coordinate={{latitude :37.6284576,longitude : 127.0718555}}    pinColor={'gray'}    title={ ' 엔젤동물병원 ' }  />
<Marker   coordinate={{latitude :37.6288338,longitude : 127.0398506}}    pinColor={'gray'}    title={ ' 강북동물병원 ' }  />
<Marker   coordinate={{latitude :37.6324421,longitude : 127.0456595}}    pinColor={'gray'}    title={ ' 로얄벳 동물병원 ' }  />
<Marker   coordinate={{latitude :37.6334284,longitude : 127.0177384}}    pinColor={'gray'}    title={ ' 보노보노동물병원 ' }  />
<Marker   coordinate={{latitude :37.6342946,longitude : 126.927747}}    pinColor={'gray'}    title={ ' 우리덕구동물병원 ' }  />
<Marker   coordinate={{latitude :37.634608,longitude : 126.9263421}}    pinColor={'gray'}    title={ ' 서울햇빛동물병원 ' }  />
<Marker   coordinate={{latitude :37.6346285,longitude : 127.0239971}}    pinColor={'gray'}    title={ ' 스마트 동물병원 ' }  />
<Marker   coordinate={{latitude :37.6347643,longitude : 127.0225859}}    pinColor={'gray'}    title={ ' 동물병원 위드 ' }  />
<Marker   coordinate={{latitude :37.6381894,longitude : 126.9192159}}    pinColor={'gray'}    title={ ' 피움동물병원 ' }  />
<Marker   coordinate={{latitude :37.6391558,longitude : 126.9191713}}    pinColor={'gray'}    title={ ' 아이러브펫동물병원 은평점 ' }  />
<Marker   coordinate={{latitude :37.6408619,longitude : 127.0326834}}    pinColor={'gray'}    title={ ' 동물을사랑하는사람들 ' }  />
<Marker   coordinate={{latitude :37.6414183,longitude : 127.0222438}}    pinColor={'gray'}    title={ ' 24시 수유 바른펫 동물의료센터 ' }  />
<Marker   coordinate={{latitude :37.6420655,longitude : 127.0640457}}    pinColor={'gray'}    title={ ' 롯데동물병원 ' }  />
<Marker   coordinate={{latitude :37.6421168,longitude : 127.0511763}}    pinColor={'gray'}    title={ ' 우솔동물병원 ' }  />
<Marker   coordinate={{latitude :37.6433804,longitude : 127.0157037}}    pinColor={'gray'}    title={ ' 초이스동물병원 ' }  />
<Marker   coordinate={{latitude :37.643632,longitude : 127.0307472}}    pinColor={'gray'}    title={ ' 보듬동물병원 ' }  />
<Marker   coordinate={{latitude :37.6437387,longitude : 127.023036}}    pinColor={'gray'}    title={ ' 현대종합동물병원 ' }  />
<Marker   coordinate={{latitude :37.6453311,longitude : 127.0336792}}    pinColor={'gray'}    title={ ' 트윈스동물병원 ' }  />
<Marker   coordinate={{latitude :37.6453396,longitude : 127.0153187}}    pinColor={'gray'}    title={ ' 사랑동물병원 ' }  />
<Marker   coordinate={{latitude :37.6458611,longitude : 127.0182059}}    pinColor={'gray'}    title={ ' 대형동물병원 ' }  />
<Marker   coordinate={{latitude :37.6466623,longitude : 127.0709672}}    pinColor={'gray'}    title={ ' 펫가든 ' }  />
<Marker   coordinate={{latitude :37.6474434,longitude : 127.0779019}}    pinColor={'gray'}    title={ ' 25시동물병원 ' }  />
<Marker   coordinate={{latitude :37.6477461,longitude : 126.9290494}}    pinColor={'gray'}    title={ ' 한빛동물병원 ' }  />
<Marker   coordinate={{latitude :37.6477914,longitude : 127.0623239}}    pinColor={'gray'}    title={ ' 브이아이피 동물의료센터 ' }  />
<Marker   coordinate={{latitude :37.649542,longitude : 127.0763583}}    pinColor={'gray'}    title={ ' 중계이오동물병원 ' }  />
<Marker   coordinate={{latitude :37.6503343,longitude : 127.0360792}}    pinColor={'gray'}    title={ ' 둘리동물병원 ' }  />
<Marker   coordinate={{latitude :37.6503872,longitude : 127.0613201}}    pinColor={'gray'}    title={ ' 더싼 동물병원 ' }  />
<Marker   coordinate={{latitude :37.6508762,longitude : 127.0618329}}    pinColor={'gray'}    title={ ' (주)한빛종합동물병원 ' }  />
<Marker   coordinate={{latitude :37.6514398,longitude : 127.0831273}}    pinColor={'gray'}    title={ ' 웰리스 동물병원 ' }  />
<Marker   coordinate={{latitude :37.6530517,longitude : 127.0681315}}    pinColor={'gray'}    title={ ' 주식회사 노원24시동물의료센터 ' }  />
<Marker   coordinate={{latitude :37.6530517,longitude : 127.0681315}}    pinColor={'gray'}    title={ ' 한국동물암센터 ' }  />
<Marker   coordinate={{latitude :37.6561457,longitude : 127.0277048}}    pinColor={'gray'}    title={ ' 사랑해요동물병원 ' }  />
<Marker   coordinate={{latitude :37.6568202,longitude : 127.0399881}}    pinColor={'gray'}    title={ ' 강북우리동물의료센터 ' }  />
<Marker   coordinate={{latitude :37.6578862,longitude : 127.0363476}}    pinColor={'gray'}    title={ ' 태일동물종합병원 ' }  />
<Marker   coordinate={{latitude :37.6578984,longitude : 127.0744335}}    pinColor={'gray'}    title={ ' 은마로동물병원 ' }  />
<Marker   coordinate={{latitude :37.6584113,longitude : 127.0325759}}    pinColor={'gray'}    title={ ' 아이조은동물병원 ' }  />
<Marker   coordinate={{latitude :37.6585679,longitude : 127.0402818}}    pinColor={'gray'}    title={ ' 별난동물병원 ' }  />
<Marker   coordinate={{latitude :37.6593503,longitude : 127.0417621}}    pinColor={'gray'}    title={ ' 행복한동물병원 ' }  />
<Marker   coordinate={{latitude :37.6629348,longitude : 127.0463381}}    pinColor={'gray'}    title={ ' 365동물병원 ' }  />
<Marker   coordinate={{latitude :37.6644821,longitude : 127.0638028}}    pinColor={'gray'}    title={ ' 이앤박동물병원 ' }  />
<Marker   coordinate={{latitude :37.6709957,longitude : 127.0564034}}    pinColor={'gray'}    title={ ' 노원 바른 동물의료센터 ' }  />
<Marker   coordinate={{latitude :37.6735348,longitude : 127.0557891}}    pinColor={'gray'}    title={ ' 서정동물병원 ' }  />
<Marker   coordinate={{latitude :37.6743145,longitude : 127.0556024}}    pinColor={'gray'}    title={ ' 나우동물의료센터 ' }  />
<Marker   coordinate={{latitude :37.6773709,longitude : 127.0531456}}    pinColor={'gray'}    title={ ' 은빛동물병원 ' }  />
<Marker   coordinate={{latitude :37.6826104,longitude : 127.0475778}}    pinColor={'gray'}    title={ ' 해봄동물병원 ' }  />
<Marker   coordinate={{latitude :37.3447671592909 , longitude : 127.932884259174}}    pinColor={'gray'}    title={ ' 원주동물병원 ' }  />
<Marker   coordinate={{latitude :37.3537679906281 , longitude : 127.91821637343}}    pinColor={'gray'}    title={ ' 다솜동물병원 ' }  />
<Marker   coordinate={{latitude :37.8287873591071 , longitude : 127.732893182205}}    pinColor={'gray'}    title={ ' 강동동물병원 ' }  />
<Marker   coordinate={{latitude :37.8966473389954 , longitude : 127.727348295715}}    pinColor={'gray'}    title={ ' 땡큐 ' }  />
<Marker   coordinate={{latitude :37.8782644703487 , longitude : 127.744300938554}}    pinColor={'gray'}    title={ ' 하나동물병원 ' }  />
<Marker   coordinate={{latitude :37.8734128926169 , longitude : 127.734401794933}}    pinColor={'gray'}    title={ ' 광장동물병원 ' }  />
<Marker   coordinate={{latitude :37.9392452485164 , longitude : 127.711725554057}}    pinColor={'gray'}    title={ ' 춘천시 동물보호센터 ' }  />
<Marker   coordinate={{latitude :37.8731782054043 , longitude : 127.720324937696}}    pinColor={'gray'}    title={ ' AK동물병원 ' }  />
<Marker   coordinate={{latitude :37.8661885001981 , longitude : 127.744294479128}}    pinColor={'gray'}    title={ ' 강원대학교부설 야생동물구조센터 ' }  />
<Marker   coordinate={{latitude :37.8601778899962 , longitude : 127.749260189876}}    pinColor={'gray'}    title={ ' 강남종합동물병원 ' }  />
<Marker   coordinate={{latitude :37.8645625912747 , longitude : 127.731310923113}}    pinColor={'gray'}    title={ ' 조 동물병원 ' }  />
<Marker   coordinate={{latitude :37.8627009912207 , longitude : 127.719317322092}}    pinColor={'gray'}    title={ ' 소망동물병원 ' }  />
<Marker   coordinate={{latitude :37.857730197755 , longitude : 127.724186133229}}    pinColor={'gray'}    title={ ' 제일동물병원 ' }  />
<Marker   coordinate={{latitude :37.8773309228963 , longitude : 127.742139130573}}    pinColor={'gray'}    title={ ' 현대동물병원 ' }  />
<Marker   coordinate={{latitude :37.8334752947675 , longitude : 127.759396902415}}    pinColor={'gray'}    title={ ' 동삼동물병원 ' }  />
<Marker   coordinate={{latitude :37.8831031583609 , longitude : 127.745047389058}}    pinColor={'gray'}    title={ ' 한독동물병원 ' }  />
<Marker   coordinate={{latitude :37.8536593673704 , longitude : 127.742391080257}}    pinColor={'gray'}    title={ ' 봄내동물병원 ' }  />
<Marker   coordinate={{latitude :37.857148416458 , longitude : 127.743793365314}}    pinColor={'gray'}    title={ ' 미래종합동물병원 ' }  />
<Marker   coordinate={{latitude :37.848354394841 , longitude : 127.734514057427}}    pinColor={'gray'}    title={ ' 고려동물병원 ' }  />
<Marker   coordinate={{latitude :37.8525565559391 , longitude : 127.750917327254}}    pinColor={'gray'}    title={ ' 우리동물병원 ' }  />
<Marker   coordinate={{latitude :37.8661885001981 , longitude : 127.744294479128}}    pinColor={'gray'}    title={ ' 강원대학교 부속 동물병원 ' }  />
<Marker   coordinate={{latitude :37.8512271611724 , longitude : 127.736804165592}}    pinColor={'gray'}    title={ ' 닥터각 동물병원 ' }  />
<Marker   coordinate={{latitude :37.8857236920475 , longitude : 127.74353511189}}    pinColor={'gray'}    title={ ' 춘천철원화천양구축산업협동조합 ' }  />
<Marker   coordinate={{latitude :37.9050228658483 , longitude : 127.720752063228}}    pinColor={'gray'}    title={ ' 도담가축동물병원 ' }  />
<Marker   coordinate={{latitude :37.3220728475331 , longitude : 127.95755653756}}    pinColor={'gray'}    title={ ' 원주24시스카이동물메디컬센터 ' }  />
<Marker   coordinate={{latitude :37.3192020678092 , longitude : 127.943093499504}}    pinColor={'gray'}    title={ ' 해든동물병원 ' }  />
<Marker   coordinate={{latitude :37.3308693974513 , longitude : 127.921619483557}}    pinColor={'gray'}    title={ ' 두루동물병원 ' }  />
<Marker   coordinate={{latitude :38.1477780388656 , longitude : 127.306029837821}}    pinColor={'gray'}    title={ ' 춘천철원화천양구축산업협동조합 철원지점 동물병원 ' }  />
<Marker   coordinate={{latitude :37.7542620365334 , longitude : 128.867739024167}}    pinColor={'gray'}    title={ ' 위드동물병원 ' }  />
<Marker   coordinate={{latitude :37.8491117573169 , longitude : 127.750876516352}}    pinColor={'gray'}    title={ ' 예방동물병원 ' }  />
<Marker   coordinate={{latitude :38.1881668376561 , longitude : 128.578746100402}}    pinColor={'gray'}    title={ ' 나의 동물메디컬 센터 ' }  />
<Marker   coordinate={{latitude :37.6808396658687 , longitude : 127.873198342417}}    pinColor={'gray'}    title={ ' 봄 동물병원 ' }  />
<Marker   coordinate={{latitude :37.1770075694519 , longitude : 128.308925665118}}    pinColor={'gray'}    title={ ' 류인광동물병원(출장진료전문병원) ' }  />
<Marker   coordinate={{latitude :37.3361874914017 , longitude : 127.967675946393}}    pinColor={'gray'}    title={ ' 반곡동 작은동물병원 ' }  />
<Marker   coordinate={{latitude :37.4637064564882 , longitude : 128.19125963184}}    pinColor={'gray'}    title={ ' 중부동물병원약품 ' }  />
<Marker   coordinate={{latitude :37.6774210481444 , longitude : 127.880646901099}}    pinColor={'gray'}    title={ ' 강산동물병원 ' }  />
<Marker   coordinate={{latitude :38.0748580401082 , longitude : 128.626391533711}}    pinColor={'gray'}    title={ ' 금강동물병원 ' }  />
<Marker   coordinate={{latitude :38.0708796160075 , longitude : 128.619549380241}}    pinColor={'gray'}    title={ ' 대명동물병원 ' }  />
<Marker   coordinate={{latitude :38.3766102073848 , longitude : 128.478428563892}}    pinColor={'gray'}    title={ ' 현대동물병원(출장진료전문병원) ' }  />
<Marker   coordinate={{latitude :38.3758049596554 , longitude : 128.472472000171}}    pinColor={'gray'}    title={ ' 고성동물병원 ' }  />
<Marker   coordinate={{latitude :38.3127288419841 , longitude : 128.530174570363}}    pinColor={'gray'}    title={ ' 수성동물병원(일반동물병원) ' }  />
<Marker   coordinate={{latitude :38.0591889833609 , longitude : 128.16752329354}}    pinColor={'gray'}    title={ ' 인제종합동물병원 ' }  />
<Marker   coordinate={{latitude :38.1974898610684 , longitude : 128.352796833446}}    pinColor={'gray'}    title={ ' 국립공원관리공단 국립공원연구원 북부보전센터 ' }  />
<Marker   coordinate={{latitude :38.0793516553175 , longitude : 128.186288796698}}    pinColor={'gray'}    title={ ' 인제축산업협동조합 동물병원 ' }  />
<Marker   coordinate={{latitude :38.1191910926219 , longitude : 128.202152884476}}    pinColor={'gray'}    title={ ' 원통가축병원 ' }  />
<Marker   coordinate={{latitude :38.1029587725246 , longitude : 127.986871808964}}    pinColor={'gray'}    title={ ' 양구동물병원 ' }  />
<Marker   coordinate={{latitude :38.1031708738007 , longitude : 127.988822307611}}    pinColor={'gray'}    title={ ' 춘천철원축협 양구동물병원 ' }  />
<Marker   coordinate={{latitude :38.097294239954 , longitude : 127.725397310506}}    pinColor={'gray'}    title={ ' 아리 동물병원 ' }  />
<Marker   coordinate={{latitude :38.1020689843743 , longitude : 127.703194064812}}    pinColor={'gray'}    title={ ' 춘천철원축협 화천지점 동물병원 ' }  />
<Marker   coordinate={{latitude :38.0701951500109 , longitude : 127.522847634895}}    pinColor={'gray'}    title={ ' 김남수동물병원 ' }  />
<Marker   coordinate={{latitude :38.2435035949455 , longitude : 127.405624765071}}    pinColor={'gray'}    title={ ' 서울우유철원동물병원 ' }  />
<Marker   coordinate={{latitude :38.1758839692432 , longitude : 127.327900009892}}    pinColor={'gray'}    title={ ' 튼튼동물병원 ' }  />
<Marker   coordinate={{latitude :38.2040766693298 , longitude : 127.220403461232}}    pinColor={'gray'}    title={ ' 동주동물병원 ' }  />
<Marker   coordinate={{latitude :38.1535396647619 , longitude : 127.30822049942}}    pinColor={'gray'}    title={ ' 문혜동물병원 ' }  />
<Marker   coordinate={{latitude :38.2071971448374 , longitude : 127.216543178713}}    pinColor={'gray'}    title={ ' 성일동물병원 ' }  />
<Marker   coordinate={{latitude :37.3765874504961 , longitude : 128.660041206208}}    pinColor={'gray'}    title={ ' (주)정선가축병원 ' }  />
<Marker   coordinate={{latitude :37.378162382206 , longitude : 128.66244956452}}    pinColor={'gray'}    title={ ' 다나동물병원 ' }  />
<Marker   coordinate={{latitude :37.3764475171586 , longitude : 128.662009838203}}    pinColor={'gray'}    title={ ' 평창영월정선축협 정선지점 동물병원 ' }  />
<Marker   coordinate={{latitude :37.3764780637278 , longitude : 128.661022025846}}    pinColor={'gray'}    title={ ' 현대가축병원 ' }  />
<Marker   coordinate={{latitude :37.5536206158696 , longitude : 128.437856660765}}    pinColor={'gray'}    title={ ' 서울대학교 대동물병원 ' }  />
<Marker   coordinate={{latitude :37.6877392703784 , longitude : 128.736380118811}}    pinColor={'gray'}    title={ ' 국립축산과학원 가금연구소 동물병원 ' }  />
<Marker   coordinate={{latitude :37.68788659829 , longitude : 128.672773513585}}    pinColor={'gray'}    title={ ' 국립축산과학원 한우연구소 동물병원 ' }  />
<Marker   coordinate={{latitude :37.5548253994087 , longitude : 128.438100177683}}    pinColor={'gray'}    title={ ' 서울대학교 대동물병원 ' }  />
<Marker   coordinate={{latitude :37.372096835856 , longitude : 128.398778613481}}    pinColor={'gray'}    title={ ' 평창축협동물병원 ' }  />
<Marker   coordinate={{latitude :37.3716156182549 , longitude : 128.398486839275}}    pinColor={'gray'}    title={ ' 동성가축병원 ' }  />
<Marker   coordinate={{latitude :37.6861487683009 , longitude : 128.676199202975}}    pinColor={'gray'}    title={ ' 국립축산과학원 한우연구소 ' }  />
<Marker   coordinate={{latitude :37.3655931969327 , longitude : 128.390207001448}}    pinColor={'gray'}    title={ ' 동성가축병원 ' }  />
<Marker   coordinate={{latitude :37.3655931969327 , longitude : 128.390207001448}}    pinColor={'gray'}    title={ ' 동성가축병원 ' }  />
<Marker   coordinate={{latitude :37.3655931969327 , longitude : 128.390207001448}}    pinColor={'gray'}    title={ ' 동성가축병원 ' }  />
<Marker   coordinate={{latitude :37.3655931969327 , longitude : 128.390207001448}}    pinColor={'gray'}    title={ ' 동성가축병원 ' }  />
<Marker   coordinate={{latitude :37.3655931969327 , longitude : 128.390207001448}}    pinColor={'gray'}    title={ ' 동성가축병원 ' }  />
<Marker   coordinate={{latitude :37.3655931969327 , longitude : 128.390207001448}}    pinColor={'gray'}    title={ ' 동성가축병원 ' }  />
<Marker   coordinate={{latitude :37.1786738366346 , longitude : 128.464321543011}}    pinColor={'gray'}    title={ ' 수호동물병원 ' }  />
<Marker   coordinate={{latitude :37.1811524491253 , longitude : 128.467386952769}}    pinColor={'gray'}    title={ ' 축협동물병원 ' }  />
<Marker   coordinate={{latitude :37.4919742684024 , longitude : 127.989273638901}}    pinColor={'gray'}    title={ ' 하나로가축병원 ' }  />
<Marker   coordinate={{latitude :37.4847160456285 , longitude : 127.98493630693}}    pinColor={'gray'}    title={ ' 횡성동물병원 ' }  />
<Marker   coordinate={{latitude :37.4811167583596 , longitude : 127.980781508449}}    pinColor={'gray'}    title={ ' 횡성축협동물병원 ' }  />
<Marker   coordinate={{latitude :37.4869711650769 , longitude : 127.984814318196}}    pinColor={'gray'}    title={ ' 횡성바엘가축병원 ' }  />
<Marker   coordinate={{latitude :37.4861773548591 , longitude : 127.983930492222}}    pinColor={'gray'}    title={ ' 대한동물병원 ' }  />
<Marker   coordinate={{latitude :37.4831326534535 , longitude : 127.990362282313}}    pinColor={'gray'}    title={ ' 하늘가축병원 ' }  />
<Marker   coordinate={{latitude :37.4873721515418 , longitude : 127.983895662615}}    pinColor={'gray'}    title={ ' 김재문동물병원 ' }  />
<Marker   coordinate={{latitude :37.4918514254144 , longitude : 127.982156493161}}    pinColor={'gray'}    title={ ' 예임양계병원 ' }  />
<Marker   coordinate={{latitude :37.4910796493849 , longitude : 127.986338070561}}    pinColor={'gray'}    title={ ' 삼양가축병원 ' }  />
<Marker   coordinate={{latitude :37.4880788768668 , longitude : 127.983326634624}}    pinColor={'gray'}    title={ ' 이명렬가축병원 ' }  />
<Marker   coordinate={{latitude :37.4865688144635 , longitude : 127.984744729423}}    pinColor={'gray'}    title={ ' 선진동물병원 ' }  />
<Marker   coordinate={{latitude :37.6828306578997 , longitude : 127.877626129934}}    pinColor={'gray'}    title={ ' 강원동물병원 ' }  />
<Marker   coordinate={{latitude :37.6774210481444 , longitude : 127.880646901099}}    pinColor={'gray'}    title={ ' 건국동물병원 ' }  />
<Marker   coordinate={{latitude :37.6871516756267 , longitude : 127.886876032998}}    pinColor={'gray'}    title={ ' 윤성철동물병원 ' }  />
<Marker   coordinate={{latitude :37.6881463086483 , longitude : 127.881879026467}}    pinColor={'gray'}    title={ ' 홍천축협동물병원 ' }  />
<Marker   coordinate={{latitude :37.6876727862903 , longitude : 127.886494668184}}    pinColor={'gray'}    title={ ' 신흥동물병원 ' }  />
<Marker   coordinate={{latitude :37.6862065645559 , longitude : 127.884663811428}}    pinColor={'gray'}    title={ ' 현대가축병원 ' }  />
<Marker   coordinate={{latitude :37.6891213130667 , longitude : 127.890257108123}}    pinColor={'gray'}    title={ ' 우리 동물병원 ' }  />
<Marker   coordinate={{latitude :37.678073393281 , longitude : 127.864471839234}}    pinColor={'gray'}    title={ ' 다나아 동물병원 ' }  />
<Marker   coordinate={{latitude :37.442443217375 , longitude : 129.167104015286}}    pinColor={'gray'}    title={ ' 두타동물병원 ' }  />
<Marker   coordinate={{latitude :37.4397357229769 , longitude : 129.166878636823}}    pinColor={'gray'}    title={ ' 동해삼척태백축산업협동조합 동물병원 ' }  />
<Marker   coordinate={{latitude :37.3583769876652 , longitude : 129.225622890265}}    pinColor={'gray'}    title={ ' 강원동물병원 ' }  />
<Marker   coordinate={{latitude :37.4360801339342 , longitude : 129.169038532757}}    pinColor={'gray'}    title={ ' 삼척동물병원 ' }  />
<Marker   coordinate={{latitude :38.1961945021338 , longitude : 128.576636878804}}    pinColor={'gray'}    title={ ' 속초동물의료센터 ' }  />
<Marker   coordinate={{latitude :38.1975240813366 , longitude : 128.570276489473}}    pinColor={'gray'}    title={ ' 설악동물병원 ' }  />
<Marker   coordinate={{latitude :38.1956109873236 , longitude : 128.576010883994}}    pinColor={'gray'}    title={ ' 조광동물병원 ' }  />
<Marker   coordinate={{latitude :38.2071298800562 , longitude : 128.586715595135}}    pinColor={'gray'}    title={ ' 한국동물혈액은행 동물병원 ' }  />
<Marker   coordinate={{latitude :38.1890893370814 , longitude : 128.594592574131}}    pinColor={'gray'}    title={ ' 호박동물병원 ' }  />
<Marker   coordinate={{latitude :38.2021592650723 , longitude : 128.583500664815}}    pinColor={'gray'}    title={ ' 속초삼성동물병원 ' }  />
<Marker   coordinate={{latitude :37.1595144433939 , longitude : 128.984520021199}}    pinColor={'gray'}    title={ ' 태백동물병원 ' }  />
<Marker   coordinate={{latitude :37.1630763973028 , longitude : 128.991237329127}}    pinColor={'gray'}    title={ ' 홍현관동물병원 ' }  />
<Marker   coordinate={{latitude :37.5177615540772 , longitude : 129.110241512105}}    pinColor={'gray'}    title={ ' 필동물병원 ' }  />
<Marker   coordinate={{latitude :37.4900742718482 , longitude : 129.10948829443}}    pinColor={'gray'}    title={ ' 쥬쥬동물병원 ' }  />
<Marker   coordinate={{latitude :37.5128593988331 , longitude : 129.117908022546}}    pinColor={'gray'}    title={ ' 삼성동물병원 ' }  />
<Marker   coordinate={{latitude :37.5171150281865 , longitude : 129.115188297696}}    pinColor={'gray'}    title={ ' 동해동물병원 ' }  />
<Marker   coordinate={{latitude :37.8771583127116 , longitude : 128.826155187778}}    pinColor={'gray'}    title={ ' 중앙동물병원 ' }  />
<Marker   coordinate={{latitude :37.7593304304786 , longitude : 128.895319011709}}    pinColor={'gray'}    title={ ' 도그빌동물병원 ' }  />
<Marker   coordinate={{latitude :37.7544972499551 , longitude : 128.89969364881}}    pinColor={'gray'}    title={ ' 행복한종합동물병원 ' }  />
<Marker   coordinate={{latitude :37.7605478765832 , longitude : 128.876662401637}}    pinColor={'gray'}    title={ ' 강원양돈축산업협동조합동물병원 ' }  />
<Marker   coordinate={{latitude :37.76020738223 , longitude : 128.91408756268}}    pinColor={'gray'}    title={ ' 주주동물병원 ' }  />
<Marker   coordinate={{latitude :37.7541682455075 , longitude : 128.898548907849}}    pinColor={'gray'}    title={ ' 베스트동물병원 ' }  />
<Marker   coordinate={{latitude :37.7590059388688 , longitude : 128.872694495219}}    pinColor={'gray'}    title={ ' 하슬라동물병원 ' }  />
<Marker   coordinate={{latitude :37.7631565527174 , longitude : 128.905894587294}}    pinColor={'gray'}    title={ ' 강남가축병원 ' }  />
<Marker   coordinate={{latitude :37.7674640564991 , longitude : 128.878253904795}}    pinColor={'gray'}    title={ ' 나은동물병원 ' }  />
<Marker   coordinate={{latitude :37.7511515533281 , longitude : 128.912446329214}}    pinColor={'gray'}    title={ ' 강릉축협동물병원 ' }  />
<Marker   coordinate={{latitude :37.7550829084382 , longitude : 128.898832136086}}    pinColor={'gray'}    title={ ' 강릉동물병원 ' }  />
<Marker   coordinate={{latitude :37.7539297047801 , longitude : 128.898974653028}}    pinColor={'gray'}    title={ ' 애견종합동물병원 ' }  />
<Marker   coordinate={{latitude :37.7554188837809 , longitude : 128.898855039483}}    pinColor={'gray'}    title={ ' 아이즈동물병원 ' }  />
<Marker   coordinate={{latitude :37.7504139105511 , longitude : 128.893421372112}}    pinColor={'gray'}    title={ ' 24시보듬동물병원 ' }  />
<Marker   coordinate={{latitude :37.3271709000772 , longitude : 127.949278584648}}    pinColor={'gray'}    title={ ' (주)누리종합동물병원 ' }  />
<Marker   coordinate={{latitude :37.3469788906647 , longitude : 127.926985501168}}    pinColor={'gray'}    title={ ' 행복드림 동물병원 ' }  />
<Marker   coordinate={{latitude :37.3345354195639 , longitude : 127.931927478011}}    pinColor={'gray'}    title={ ' 다나동물병원 ' }  />
<Marker   coordinate={{latitude :37.3412130778578 , longitude : 127.92649006383}}    pinColor={'gray'}    title={ ' 조은 동물병원 ' }  />
<Marker   coordinate={{latitude :37.300920143036 , longitude : 127.814240797459}}    pinColor={'gray'}    title={ ' 우사랑 동물병원 ' }  />
<Marker   coordinate={{latitude :37.3462331751407 , longitude : 127.951742064633}}    pinColor={'gray'}    title={ ' 제일동물병원 ' }  />
<Marker   coordinate={{latitude :37.3227128175195 , longitude : 127.980533959012}}    pinColor={'gray'}    title={ ' 패밀리동물병원 ' }  />
<Marker   coordinate={{latitude :37.3720535581682 , longitude : 127.880243730048}}    pinColor={'gray'}    title={ ' 샘마루동물병원 ' }  />
<Marker   coordinate={{latitude :37.3385411258026 , longitude : 127.952698656349}}    pinColor={'gray'}    title={ ' 로얄종합동물병원 ' }  />
<Marker   coordinate={{latitude :37.3154760930333 , longitude : 127.828409903348}}    pinColor={'gray'}    title={ ' 문막동물병원 ' }  />
<Marker   coordinate={{latitude :37.3547816946981 , longitude : 127.935348148396}}    pinColor={'gray'}    title={ ' 닥터윤 산업동물병원 ' }  />
<Marker   coordinate={{latitude :37.3294262938325 , longitude : 127.926204576852}}    pinColor={'gray'}    title={ ' 25시 종합 동물병원 ' }  />
<Marker   coordinate={{latitude :37.370985901931 , longitude : 127.878899257454}}    pinColor={'gray'}    title={ ' 현대종합동물병원 ' }  />
<Marker   coordinate={{latitude :37.3487028617097 , longitude : 127.949412307468}}    pinColor={'gray'}    title={ ' 강원동물병원 ' }  />
<Marker   coordinate={{latitude :37.3343563475917 , longitude : 127.928153827254}}    pinColor={'gray'}    title={ ' 열린동물병원 ' }  />
<Marker   coordinate={{latitude :37.338485690181 , longitude : 127.960042069264}}    pinColor={'gray'}    title={ ' 그린종합동물병원 ' }  />
<Marker   coordinate={{latitude :37.3382728727204 , longitude : 127.938149844229}}    pinColor={'gray'}    title={ ' 마루종합동물병원 ' }  />
<Marker   coordinate={{latitude :37.3754964287602 , longitude : 127.948752616646}}    pinColor={'gray'}    title={ ' 삼성종합동물병원 ' }  />
<Marker   coordinate={{latitude :37.3124593107147 , longitude : 127.822607323933}}    pinColor={'gray'}    title={ ' 원주축협동물병원 ' }  />
<Marker   coordinate={{latitude :37.3388597669202 , longitude : 127.923106091266}}    pinColor={'gray'}    title={ ' 늘푸른종합동물병원 ' }  />
<Marker   coordinate={{latitude :37.3204480813858 , longitude : 127.958044575796}}    pinColor={'gray'}    title={ ' 혜인종합동물병원 ' }  />
<Marker   coordinate={{latitude :36.8443431,longitude : 127.1215375}}    pinColor={'gray'}    title={ ' 레이크동물의료센터 ' }  />
<Marker   coordinate={{latitude :36.8258363,longitude : 127.1418482}}    pinColor={'gray'}    title={ ' 천안24시스카이동물메디컬센터 ' }  />
<Marker   coordinate={{latitude :36.8056274,longitude : 127.1305007}}    pinColor={'gray'}    title={ ' 참좋은동물병원 ' }  />
<Marker   coordinate={{latitude :36.8203415,longitude : 127.1105404}}    pinColor={'gray'}    title={ ' 아리스타동물의료센터 ' }  />
<Marker   coordinate={{latitude :36.9156947,longitude : 127.1133985}}    pinColor={'gray'}    title={ ' 스마트피그클리닉 ' }  />
<Marker   coordinate={{latitude :36.8121571,longitude : 127.1335784}}    pinColor={'gray'}    title={ ' 온누리동물병원(천안점) ' }  />
<Marker   coordinate={{latitude :36.7794561,longitude : 127.1572037}}    pinColor={'gray'}    title={ ' 온누리 동물병원(출장진료전문동물병원) ' }  />
<Marker   coordinate={{latitude :36.9156947,longitude : 127.1133985}}    pinColor={'gray'}    title={ ' 고려동물병원 ' }  />
<Marker   coordinate={{latitude :36.8083197,longitude : 127.106278}}    pinColor={'gray'}    title={ ' 어바웃동물병원 ' }  />
<Marker   coordinate={{latitude :36.832253,longitude : 127.1375569}}    pinColor={'gray'}    title={ ' 더펫동물병원 ' }  />
<Marker   coordinate={{latitude :36.7992348,longitude : 127.1092228}}    pinColor={'gray'}    title={ ' 제이동물병원 ' }  />
<Marker   coordinate={{latitude :36.8083197,longitude : 127.106278}}    pinColor={'gray'}    title={ ' 정다운동물병원 ' }  />
<Marker   coordinate={{latitude :36.8083197,longitude : 127.106278}}    pinColor={'gray'}    title={ ' 천안모아동물병원 ' }  />
<Marker   coordinate={{latitude :36.8241994,longitude : 127.1244898}}    pinColor={'gray'}    title={ ' 나우동물의료센터 ' }  />
<Marker   coordinate={{latitude :36.8101077,longitude : 127.1087976}}    pinColor={'gray'}    title={ ' 불당동물병원 ' }  />
<Marker   coordinate={{latitude :36.8195724,longitude : 127.1150607}}    pinColor={'gray'}    title={ ' 웰니스동물병원 ' }  />
<Marker   coordinate={{latitude :36.9083918,longitude : 127.128244}}    pinColor={'gray'}    title={ ' 한빛동물병원 ' }  />
<Marker   coordinate={{latitude :36.8235635,longitude : 127.1188016}}    pinColor={'gray'}    title={ ' 다함동물병원 ' }  />
<Marker   coordinate={{latitude :36.8036022,longitude : 127.1277523}}    pinColor={'gray'}    title={ ' 엔젤동물병원 ' }  />
<Marker   coordinate={{latitude :36.793929,longitude : 127.1245408}}    pinColor={'gray'}    title={ ' 천안동물의료센터 ' }  />
<Marker   coordinate={{latitude :36.8207939,longitude : 127.1084935}}    pinColor={'gray'}    title={ ' 닥터 전 동물병원 ' }  />
<Marker   coordinate={{latitude :36.8337094,longitude : 127.1294117}}    pinColor={'gray'}    title={ ' 한빛동물병원 ' }  />
<Marker   coordinate={{latitude :36.8278774,longitude : 127.13352}}    pinColor={'gray'}    title={ ' 페트로 동물병원 ' }  />
<Marker   coordinate={{latitude :36.7589736,longitude : 127.2979945}}    pinColor={'gray'}    title={ ' 병천동물병원 ' }  />
<Marker   coordinate={{latitude :36.8013228,longitude : 127.1312688}}    pinColor={'gray'}    title={ ' 굿모닝24시동물병원 ' }  />
<Marker   coordinate={{latitude :36.8221712,longitude : 127.1250173}}    pinColor={'gray'}    title={ ' 백석동물병원 ' }  />
<Marker   coordinate={{latitude :36.8264712,longitude : 127.1406664}}    pinColor={'gray'}    title={ ' 펫가든동물병원 ' }  />
<Marker   coordinate={{latitude :36.8335376,longitude : 127.1330257}}    pinColor={'gray'}    title={ ' 해맑은동물병원 ' }  />
<Marker   coordinate={{latitude :36.7766426,longitude : 127.1348566}}    pinColor={'gray'}    title={ ' 드림동물병원 ' }  />
<Marker   coordinate={{latitude :36.8031138,longitude : 127.1120444}}    pinColor={'gray'}    title={ ' 동물병원닥터스 ' }  />
<Marker   coordinate={{latitude :36.8007507,longitude : 127.1361151}}    pinColor={'gray'}    title={ ' 대전충남 양돈축산업협동조합 부설동물병원 ' }  />
<Marker   coordinate={{latitude :36.9048034,longitude : 127.1295943}}    pinColor={'gray'}    title={ ' 천안공주낙농축산업협동조합부설동물병원 ' }  />
<Marker   coordinate={{latitude :36.7992949,longitude : 127.1519584}}    pinColor={'gray'}    title={ ' 녹십자 ' }  />
<Marker   coordinate={{latitude :36.7989833,longitude : 127.1537648}}    pinColor={'gray'}    title={ ' 중앙동물병원 ' }  />
<Marker   coordinate={{latitude :36.8251975,longitude : 127.137005}}    pinColor={'gray'}    title={ ' 늘푸른동물병원두정의료센터 ' }  />
<Marker   coordinate={{latitude :36.8158164,longitude : 127.1586355}}    pinColor={'gray'}    title={ ' 서울88동물의료원 ' }  />
<Marker   coordinate={{latitude :36.7321547,longitude : 127.2833637}}    pinColor={'gray'}    title={ ' 다나동물병원(산업동물에 대한 출장진료를 전문으로 함.) ' }  />
<Marker   coordinate={{latitude :36.8027493,longitude : 127.1394522}}    pinColor={'gray'}    title={ ' 치유동물병원 ' }  />
<Marker   coordinate={{latitude :36.7889438,longitude : 127.1284719}}    pinColor={'gray'}    title={ ' 다솜동물병원 ' }  />
<Marker   coordinate={{latitude :36.7766852,longitude : 127.1252152}}    pinColor={'gray'}    title={ ' 나음동물병원 ' }  />
<Marker   coordinate={{latitude :36.9192849,longitude : 127.1276374}}    pinColor={'gray'}    title={ ' 태성동물병원 ' }  />
<Marker   coordinate={{latitude :36.7666471,longitude : 127.1316702}}    pinColor={'gray'}    title={ ' 유일동물병원(산업동물에 대한 출장진료를 전문으로 함.) ' }  />
<Marker   coordinate={{latitude :36.9156748,longitude : 127.1278671}}    pinColor={'gray'}    title={ ' 충일 ' }  />
<Marker   coordinate={{latitude :36.7833415,longitude : 127.1568979}}    pinColor={'gray'}    title={ ' 서일동물병원 ' }  />
<Marker   coordinate={{latitude :36.8181846,longitude : 127.1515013}}    pinColor={'gray'}    title={ ' 열린동물병원 ' }  />
<Marker   coordinate={{latitude :36.7664386999999,longitude : 127.1621738}}    pinColor={'gray'}    title={ ' 가온동물병원 ' }  />
<Marker   coordinate={{latitude :36.7794561,longitude : 127.1572037}}    pinColor={'gray'}    title={ ' 서일가축병원 ' }  />
<Marker   coordinate={{latitude :36.7913749,longitude : 127.1574597}}    pinColor={'gray'}    title={ ' 다산동물병원 ' }  />
<Marker   coordinate={{latitude :36.7912853,longitude : 127.1562573}}    pinColor={'gray'}    title={ ' 서현동물병원 ' }  />
<Marker   coordinate={{latitude :36.8234208,longitude : 127.1524645}}    pinColor={'gray'}    title={ ' 고려동물병원 ' }  />
<Marker   coordinate={{latitude :36.7983252999999,longitude : 127.1179218}}    pinColor={'gray'}    title={ ' 김수영 동물병원 ' }  />
<Marker   coordinate={{latitude :36.8339333,longitude : 127.1396143}}    pinColor={'gray'}    title={ ' 펫프렌즈동물병원 ' }  />
<Marker   coordinate={{latitude :36.8195906,longitude : 127.1585281}}    pinColor={'gray'}    title={ ' 에니펫동물병원 ' }  />
<Marker   coordinate={{latitude :36.8162526,longitude : 127.1507727}}    pinColor={'gray'}    title={ ' 그림동물병원 ' }  />
<Marker   coordinate={{latitude :36.9154554,longitude : 127.1294127}}    pinColor={'gray'}    title={ ' 한샘동물병원 ' }  />
<Marker   coordinate={{latitude :36.9118462,longitude : 127.1281598}}    pinColor={'gray'}    title={ ' 하나동물병원 ' }  />
<Marker   coordinate={{latitude :36.7988835,longitude : 127.1579848}}    pinColor={'gray'}    title={ ' 장원동물병원 ' }  />
<Marker   coordinate={{latitude :36.8020194,longitude : 127.1313943}}    pinColor={'gray'}    title={ ' 우리동물병원 ' }  />
<Marker   coordinate={{latitude :36.7715179,longitude : 127.1434812}}    pinColor={'gray'}    title={ ' 천안축산업협동조합 부설동물병원 ' }  />
<Marker   coordinate={{latitude :36.4693627,longitude : 127.0521406}}    pinColor={'gray'}    title={ ' 우성농협 ' }  />
<Marker   coordinate={{latitude :36.4823932,longitude : 127.154945}}    pinColor={'gray'}    title={ ' 한국동물병원 ' }  />
<Marker   coordinate={{latitude :36.5218462,longitude : 127.1769768}}    pinColor={'gray'}    title={ ' 금강동물병원 ' }  />
<Marker   coordinate={{latitude :36.4551097,longitude : 127.1294619}}    pinColor={'gray'}    title={ ' 생생동물병원 ' }  />
<Marker   coordinate={{latitude :36.5524036,longitude : 126.9511788}}    pinColor={'gray'}    title={ ' 뿌리동물병원 ' }  />
<Marker   coordinate={{latitude :36.4610624,longitude : 127.1238236}}    pinColor={'gray'}    title={ ' 중앙가축병원 ' }  />
<Marker   coordinate={{latitude :36.475177,longitude : 127.1208527}}    pinColor={'gray'}    title={ ' 천안공주낙농농협동물병원 ' }  />
<Marker   coordinate={{latitude :36.4465346,longitude : 127.1191534}}    pinColor={'gray'}    title={ ' 유구 ' }  />
<Marker   coordinate={{latitude :36.4713948,longitude : 127.1335702}}    pinColor={'gray'}    title={ ' 세종공주축협동물병원 ' }  />
<Marker   coordinate={{latitude :36.4685671,longitude : 127.1357294}}    pinColor={'gray'}    title={ ' 신동 ' }  />
<Marker   coordinate={{latitude :36.4528566,longitude : 127.1220685}}    pinColor={'gray'}    title={ ' 이기영 ' }  />
<Marker   coordinate={{latitude :36.4591293,longitude : 127.1246821}}    pinColor={'gray'}    title={ ' 대관령 ' }  />
<Marker   coordinate={{latitude :36.4491204,longitude : 127.1238073}}    pinColor={'gray'}    title={ ' 충남 ' }  />
<Marker   coordinate={{latitude :36.4643852,longitude : 127.122598}}    pinColor={'gray'}    title={ ' 공주동물병원 ' }  />
<Marker   coordinate={{latitude :36.4738182,longitude : 127.1354457}}    pinColor={'gray'}    title={ ' 금비동물병원 ' }  />
<Marker   coordinate={{latitude :36.5928083,longitude : 127.1163977}}    pinColor={'gray'}    title={ ' 태성동물병원 ' }  />
<Marker   coordinate={{latitude :36.4773057,longitude : 127.0788023}}    pinColor={'gray'}    title={ ' 한울메디벳 ' }  />
<Marker   coordinate={{latitude :36.4610624,longitude : 127.1238236}}    pinColor={'gray'}    title={ ' 중앙동물병원 ' }  />
<Marker   coordinate={{latitude :36.5024457,longitude : 127.0258256}}    pinColor={'gray'}    title={ ' 한우사랑동물병원 ' }  />
<Marker   coordinate={{latitude :36.4723104,longitude : 127.1343132}}    pinColor={'gray'}    title={ ' 강북종합 ' }  />
<Marker   coordinate={{latitude :36.3511516,longitude : 126.5905166}}    pinColor={'gray'}    title={ ' 차동물병원 ' }  />
<Marker   coordinate={{latitude :36.3515693,longitude : 126.6088542}}    pinColor={'gray'}    title={ ' 훈 동물병원 ' }  />
<Marker   coordinate={{latitude :36.3430054,longitude : 126.5910867}}    pinColor={'gray'}    title={ ' 바른동물병원 ' }  />
<Marker   coordinate={{latitude :36.4811025,longitude : 126.5275192}}    pinColor={'gray'}    title={ ' 홍성낙농협동조합 천북동물병원 ' }  />
<Marker   coordinate={{latitude :36.3475192,longitude : 126.6064387}}    pinColor={'gray'}    title={ ' 보령동물병원 ' }  />
<Marker   coordinate={{latitude :36.3513149,longitude : 126.5928264}}    pinColor={'gray'}    title={ ' 제일동물병원 ' }  />
<Marker   coordinate={{latitude :36.4746115,longitude : 126.5252564}}    pinColor={'gray'}    title={ ' 충남동물병원 ' }  />
<Marker   coordinate={{latitude :36.3514865,longitude : 126.5924713}}    pinColor={'gray'}    title={ ' 김동물병원 ' }  />
<Marker   coordinate={{latitude :36.8542066,longitude : 126.9567439}}    pinColor={'gray'}    title={ ' 수동물병원 ' }  />
<Marker   coordinate={{latitude :36.9205625,longitude : 127.0554375}}    pinColor={'gray'}    title={ ' Dr.K 종합동물병원 ' }  />
<Marker   coordinate={{latitude :36.7918048,longitude : 127.0942438}}    pinColor={'gray'}    title={ ' 언제나동물병원 ' }  />
<Marker   coordinate={{latitude :36.7918048,longitude : 127.0942438}}    pinColor={'gray'}    title={ ' 린동물병원 ' }  />
<Marker   coordinate={{latitude :36.7846945,longitude : 127.0066885}}    pinColor={'gray'}    title={ ' 드림컨설팅동물병원 ' }  />
<Marker   coordinate={{latitude :36.7896864999999,longitude : 126.9969818}}    pinColor={'gray'}    title={ ' 충무가축병원 ' }  />
<Marker   coordinate={{latitude :36.9292493,longitude : 127.0358499}}    pinColor={'gray'}    title={ ' 한원동물병원 ' }  />
<Marker   coordinate={{latitude :36.7758852,longitude : 127.0024322}}    pinColor={'gray'}    title={ ' 주앤동물병원 ' }  />
<Marker   coordinate={{latitude :36.7731862,longitude : 127.0698181}}    pinColor={'gray'}    title={ ' 배방동물병원 ' }  />
<Marker   coordinate={{latitude :36.7862291,longitude : 127.0056066}}    pinColor={'gray'}    title={ ' 온양동물병원 ' }  />
<Marker   coordinate={{latitude :36.7812858,longitude : 127.0134498}}    pinColor={'gray'}    title={ ' 정강동물병원 ' }  />
<Marker   coordinate={{latitude :36.7881566,longitude : 127.008944}}    pinColor={'gray'}    title={ ' 김광수동물병원 ' }  />
<Marker   coordinate={{latitude :36.927744,longitude : 127.0374649}}    pinColor={'gray'}    title={ ' 이동물병원 ' }  />
<Marker   coordinate={{latitude :36.9303821,longitude : 127.0350768}}    pinColor={'gray'}    title={ ' 건국동물병원(출장진료전문) ' }  />
<Marker   coordinate={{latitude :36.9275451,longitude : 127.0386045}}    pinColor={'gray'}    title={ ' 중부벳동물병원 ' }  />
<Marker   coordinate={{latitude :36.8200929,longitude : 127.0071504}}    pinColor={'gray'}    title={ ' 아산축산업협동조합(동물병원) ' }  />
<Marker   coordinate={{latitude :36.7809133,longitude : 127.0073367}}    pinColor={'gray'}    title={ ' 가나동물병원 ' }  />
<Marker   coordinate={{latitude :36.774071,longitude : 127.0565309}}    pinColor={'gray'}    title={ ' 숲속동물병원 ' }  />
<Marker   coordinate={{latitude :36.7812858,longitude : 127.0134498}}    pinColor={'gray'}    title={ ' 안 수의과병원 ' }  />
<Marker   coordinate={{latitude :36.7868594,longitude : 126.9999518}}    pinColor={'gray'}    title={ ' 명동물병원 ' }  />
<Marker   coordinate={{latitude :36.7820088,longitude : 127.0121713}}    pinColor={'gray'}    title={ ' 선동물병원(출장진료전문) ' }  />
<Marker   coordinate={{latitude :36.9303821,longitude : 127.0350768}}    pinColor={'gray'}    title={ ' 수안동물병원(출장진료전문) ' }  />
<Marker   coordinate={{latitude :36.7700947,longitude : 127.0013076}}    pinColor={'gray'}    title={ ' 아산동물의료센터 ' }  />
<Marker   coordinate={{latitude :36.7775937,longitude : 126.4560699}}    pinColor={'gray'}    title={ ' 신화 ' }  />
<Marker   coordinate={{latitude :36.7671493,longitude : 126.5652012}}    pinColor={'gray'}    title={ ' 농협 한우개량사업소 가축병원 ' }  />
<Marker   coordinate={{latitude :36.7137782,longitude : 126.5435606}}    pinColor={'gray'}    title={ ' 해미성 ' }  />
<Marker   coordinate={{latitude :36.7772731,longitude : 126.4544868}}    pinColor={'gray'}    title={ ' 고려동물병원 ' }  />
<Marker   coordinate={{latitude :36.777986,longitude : 126.4578957}}    pinColor={'gray'}    title={ ' 우리 ' }  />
<Marker   coordinate={{latitude :36.7817316,longitude : 126.458781799999}}    pinColor={'gray'}    title={ ' 여한경 ' }  />
<Marker   coordinate={{latitude :36.7800357,longitude : 126.4595406}}    pinColor={'gray'}    title={ ' 김신환동물병원 ' }  />
<Marker   coordinate={{latitude :36.7778902,longitude : 126.457463}}    pinColor={'gray'}    title={ ' 서산동물병원 ' }  />
<Marker   coordinate={{latitude :36.9358451,longitude : 126.4360525}}    pinColor={'gray'}    title={ ' 대산동물병원 ' }  />
<Marker   coordinate={{latitude :36.7774869,longitude : 126.4488973}}    pinColor={'gray'}    title={ ' 성심동물의료센터 ' }  />
<Marker   coordinate={{latitude :36.7790695,longitude : 126.4630056}}    pinColor={'gray'}    title={ ' 한서동물의료센터 ' }  />
<Marker   coordinate={{latitude :36.7459178999999,longitude : 126.4473238}}    pinColor={'gray'}    title={ ' 김도균동물병원 ' }  />
<Marker   coordinate={{latitude :36.7720542,longitude : 126.4478632}}    pinColor={'gray'}    title={ ' 답21동물병원 ' }  />
<Marker   coordinate={{latitude :36.777768,longitude : 126.4551277}}    pinColor={'gray'}    title={ ' 로얄동물병원 ' }  />
<Marker   coordinate={{latitude :36.7864638,longitude : 126.4708984}}    pinColor={'gray'}    title={ ' 정 동물병원 ' }  />
<Marker   coordinate={{latitude :36.7858412,longitude : 126.4453277}}    pinColor={'gray'}    title={ ' 홍성낙협서산지점 ' }  />
<Marker   coordinate={{latitude :36.1395103,longitude : 127.0697272}}    pinColor={'gray'}    title={ ' NS대흥동물병원 ' }  />
<Marker   coordinate={{latitude :36.2104059,longitude : 127.0545104}}    pinColor={'gray'}    title={ ' 우리생명과학동물병원 ' }  />
<Marker   coordinate={{latitude :36.2044293,longitude : 127.0907453}}    pinColor={'gray'}    title={ ' 유명동물병원 ' }  />
<Marker   coordinate={{latitude :36.1849707999999,longitude : 127.0990159}}    pinColor={'gray'}    title={ ' 논산계룡축협 동물병원 ' }  />
<Marker   coordinate={{latitude :36.1311306,longitude : 127.0892129}}    pinColor={'gray'}    title={ ' 금강축산가축병원 ' }  />
<Marker   coordinate={{latitude :36.2147733,longitude : 127.1440733}}    pinColor={'gray'}    title={ ' 충남동물병원 ' }  />
<Marker   coordinate={{latitude :36.2077873,longitude : 127.2667376}}    pinColor={'gray'}    title={ ' 연산동물병원 ' }  />
<Marker   coordinate={{latitude :36.1306709,longitude : 127.0991026}}    pinColor={'gray'}    title={ ' 가나동물병원 ' }  />
<Marker   coordinate={{latitude :36.158817,longitude : 127.0147539}}    pinColor={'gray'}    title={ ' 서동물병원 ' }  />
<Marker   coordinate={{latitude :36.206168,longitude : 127.0880407}}    pinColor={'gray'}    title={ ' 중앙동물병원 ' }  />
<Marker   coordinate={{latitude :36.2075579,longitude : 127.0826443}}    pinColor={'gray'}    title={ ' 논산동물병원 ' }  />
<Marker   coordinate={{latitude :36.1736861,longitude : 127.2684749}}    pinColor={'gray'}    title={ ' 비글구조네트워크 동물메디컬센터 ' }  />
<Marker   coordinate={{latitude :36.1849707999999,longitude : 127.0990159}}    pinColor={'gray'}    title={ ' 논산계룡축협 동물병원 ' }  />
<Marker   coordinate={{latitude :36.2015394,longitude : 127.0862941}}    pinColor={'gray'}    title={ ' 데일리동물병원 ' }  />
<Marker   coordinate={{latitude :36.2150414,longitude : 127.1269217}}    pinColor={'gray'}    title={ ' 봉 동물병원 ' }  />
<Marker   coordinate={{latitude :36.1249631,longitude : 127.1289445}}    pinColor={'gray'}    title={ ' 피그헬스동물병원 ' }  />
<Marker   coordinate={{latitude :36.1997685,longitude : 127.0895037}}    pinColor={'gray'}    title={ ' 호크종합동물병원 ' }  />
<Marker   coordinate={{latitude :36.2033792,longitude : 127.088827}}    pinColor={'gray'}    title={ ' 캐비어동물병원 ' }  />
<Marker   coordinate={{latitude :36.1083596,longitude : 127.484262}}    pinColor={'gray'}    title={ ' 월드동물병원 ' }  />
<Marker   coordinate={{latitude :36.1026217,longitude : 127.4885965}}    pinColor={'gray'}    title={ ' 가믄장 동물병원 ' }  />
<Marker   coordinate={{latitude :36.1028786,longitude : 127.4915769}}    pinColor={'gray'}    title={ ' 노아동물병원 ' }  />
<Marker   coordinate={{latitude :36.1049276,longitude : 127.488064}}    pinColor={'gray'}    title={ ' 우신동물병원 ' }  />
<Marker   coordinate={{latitude :36.2741597,longitude : 126.8814887}}    pinColor={'gray'}    title={ ' 초원동물병원 ' }  />
<Marker   coordinate={{latitude :36.2824146,longitude : 126.9100502}}    pinColor={'gray'}    title={ ' 녹십자동물병원 ' }  />
<Marker   coordinate={{latitude :36.2825493,longitude : 126.9072355}}    pinColor={'gray'}    title={ ' 권동물병원 ' }  />
<Marker   coordinate={{latitude :36.2756539,longitude : 126.8882478}}    pinColor={'gray'}    title={ ' 심동물병원 ' }  />
<Marker   coordinate={{latitude :36.1893194,longitude : 126.8927425}}    pinColor={'gray'}    title={ ' 임천동물병원 ' }  />
<Marker   coordinate={{latitude :36.281619,longitude : 126.909281}}    pinColor={'gray'}    title={ ' 세종동물병원 ' }  />
<Marker   coordinate={{latitude :36.2762755,longitude : 126.90561}}    pinColor={'gray'}    title={ ' 한라동물병원 ' }  />
<Marker   coordinate={{latitude :36.2824146,longitude : 126.9100502}}    pinColor={'gray'}    title={ ' 녹십자동물병원 ' }  />
<Marker   coordinate={{latitude :36.2810005,longitude : 126.9086584}}    pinColor={'gray'}    title={ ' 백동물병원 ' }  />
<Marker   coordinate={{latitude :36.2840385,longitude : 126.9091505}}    pinColor={'gray'}    title={ ' 부여동물병원 ' }  />
<Marker   coordinate={{latitude :36.3083135,longitude : 126.8529916}}    pinColor={'gray'}    title={ ' 서울동물병원 ' }  />
<Marker   coordinate={{latitude :36.282527,longitude : 126.9101188}}    pinColor={'gray'}    title={ ' 금강동물병원 ' }  />
<Marker   coordinate={{latitude :36.0762384,longitude : 126.68901}}    pinColor={'gray'}    title={ ' 서해동물병원 ' }  />
<Marker   coordinate={{latitude :36.0860973,longitude : 126.8030739}}    pinColor={'gray'}    title={ ' 최가축병원 ' }  />
<Marker   coordinate={{latitude :36.0343685,longitude : 126.7109921}}    pinColor={'gray'}    title={ ' 국립생태원동물병원 ' }  />
<Marker   coordinate={{latitude :36.0820629,longitude : 126.6870263}}    pinColor={'gray'}    title={ ' 장동호동물병원 ' }  />
<Marker   coordinate={{latitude :36.0761469,longitude : 126.6972305}}    pinColor={'gray'}    title={ ' 서천가축병원 ' }  />
<Marker   coordinate={{latitude :36.4507571,longitude : 126.8026011}}    pinColor={'gray'}    title={ ' 중앙동물병원 ' }  />
<Marker   coordinate={{latitude :36.4505211,longitude : 126.8047654}}    pinColor={'gray'}    title={ ' 종합동물병원 ' }  />
<Marker   coordinate={{latitude :36.4046621,longitude : 126.9429403}}    pinColor={'gray'}    title={ ' 지팡이 동물병원 ' }  />
<Marker   coordinate={{latitude :36.449075,longitude : 126.7980646}}    pinColor={'gray'}    title={ ' 미래동물병원 ' }  />
<Marker   coordinate={{latitude :36.4117544,longitude : 126.950068}}    pinColor={'gray'}    title={ ' 정산가축병원 ' }  />
<Marker   coordinate={{latitude :36.6011842,longitude : 126.6702992}}    pinColor={'gray'}    title={ ' 홍성종합동물병원 ' }  />
<Marker   coordinate={{latitude :36.5024975,longitude : 126.6251466}}    pinColor={'gray'}    title={ ' 김수의과동물병원 ' }  />
<Marker   coordinate={{latitude :36.5941554,longitude : 126.6582587}}    pinColor={'gray'}    title={ ' (주)돼지와건강 ' }  />
<Marker   coordinate={{latitude :36.5985059,longitude : 126.6472331}}    pinColor={'gray'}    title={ ' 내포동물병원 ' }  />
<Marker   coordinate={{latitude :36.6528728,longitude : 126.671258}}    pinColor={'gray'}    title={ ' 닥터차 동물병원 ' }  />
<Marker   coordinate={{latitude :36.600403,longitude : 126.6723333}}    pinColor={'gray'}    title={ ' 대산 동물병원 ' }  />
<Marker   coordinate={{latitude :36.5851831,longitude : 126.6568575}}    pinColor={'gray'}    title={ ' 임만수 동물병원 ' }  />
<Marker   coordinate={{latitude :36.5957754,longitude : 126.6555205}}    pinColor={'gray'}    title={ ' 우사랑동물병원 ' }  />
<Marker   coordinate={{latitude :36.6480494,longitude : 126.6670973}}    pinColor={'gray'}    title={ ' 동안동물병원 ' }  />
<Marker   coordinate={{latitude :36.6528728,longitude : 126.671258}}    pinColor={'gray'}    title={ ' 내포동물의료센터 ' }  />
<Marker   coordinate={{latitude :36.59336,longitude : 126.6541275}}    pinColor={'gray'}    title={ ' 성수동물병원 ' }  />
<Marker   coordinate={{latitude :36.6025929,longitude : 126.6669332}}    pinColor={'gray'}    title={ ' 강영석동물병원 ' }  />
<Marker   coordinate={{latitude :36.5887644,longitude : 126.6389204}}    pinColor={'gray'}    title={ ' 홍성축협 동물병원 ' }  />
<Marker   coordinate={{latitude :36.6003423,longitude : 126.670602}}    pinColor={'gray'}    title={ ' 강남동물병원 ' }  />
<Marker   coordinate={{latitude :36.6528728,longitude : 126.671258}}    pinColor={'gray'}    title={ ' 피그월드 동물병원 ' }  />
<Marker   coordinate={{latitude :36.6001071,longitude : 126.651679}}    pinColor={'gray'}    title={ ' 신베트 ' }  />
<Marker   coordinate={{latitude :36.6022892,longitude : 126.6763067}}    pinColor={'gray'}    title={ ' 한길동물병원 ' }  />
<Marker   coordinate={{latitude :36.6018361,longitude : 126.6656587}}    pinColor={'gray'}    title={ ' 충남동물병원 ' }  />
<Marker   coordinate={{latitude :36.5004759,longitude : 126.6257438}}    pinColor={'gray'}    title={ ' 임창일동물병원 ' }  />
<Marker   coordinate={{latitude :36.503082,longitude : 126.6245614}}    pinColor={'gray'}    title={ ' 신흥동물병원 ' }  />
<Marker   coordinate={{latitude :36.6011241,longitude : 126.6716995}}    pinColor={'gray'}    title={ ' 홍성낙협동물병원 ' }  />
<Marker   coordinate={{latitude :36.6002109,longitude : 126.6712692}}    pinColor={'gray'}    title={ ' 세종동물병원 ' }  />
<Marker   coordinate={{latitude :36.7046557,longitude : 126.6694621}}    pinColor={'gray'}    title={ ' 김태오 동물병원 ' }  />
<Marker   coordinate={{latitude :36.6907814,longitude : 126.8357924}}    pinColor={'gray'}    title={ ' KU건국동물병원 ' }  />
<Marker   coordinate={{latitude :36.7466576,longitude : 126.7024078}}    pinColor={'gray'}    title={ ' 중앙 동물병원 ' }  />
<Marker   coordinate={{latitude :36.6836772,longitude : 126.8291098}}    pinColor={'gray'}    title={ ' 예산 동물병원 ' }  />
<Marker   coordinate={{latitude :36.6948438,longitude : 126.686959}}    pinColor={'gray'}    title={ ' 한솔가축병원 ' }  />
<Marker   coordinate={{latitude :36.6817624,longitude : 126.8468772}}    pinColor={'gray'}    title={ ' 협동동물병원 ' }  />
<Marker   coordinate={{latitude :36.5514352,longitude : 126.7760056}}    pinColor={'gray'}    title={ ' 강이동물병원 ' }  />
<Marker   coordinate={{latitude :36.6696866,longitude : 126.8599317}}    pinColor={'gray'}    title={ ' 충남야생동물구조센터 ' }  />
<Marker   coordinate={{latitude :36.6856271,longitude : 126.8299183}}    pinColor={'gray'}    title={ ' 새마을동물병원 ' }  />
<Marker   coordinate={{latitude :36.6900296,longitude : 126.8297688}}    pinColor={'gray'}    title={ ' 닥터차동물병원 ' }  />
<Marker   coordinate={{latitude :36.6854624,longitude : 126.8295728}}    pinColor={'gray'}    title={ ' 한일동물병원 ' }  />
<Marker   coordinate={{latitude :36.6898515,longitude : 126.6710432}}    pinColor={'gray'}    title={ ' 마일스톤피그클리닉(출장진료전문) ' }  />
<Marker   coordinate={{latitude :36.7463949,longitude : 126.7043813}}    pinColor={'gray'}    title={ ' 윤동물병원•약품(출장진료전문) ' }  />
<Marker   coordinate={{latitude :36.6807836,longitude : 126.8523468}}    pinColor={'gray'}    title={ ' 흙 동물병원 ' }  />
<Marker   coordinate={{latitude :36.7550773,longitude : 126.2959482}}    pinColor={'gray'}    title={ ' 명 동물 병원 ' }  />
<Marker   coordinate={{latitude :36.5144302,longitude : 126.3529178}}    pinColor={'gray'}    title={ ' 현대 동물 병원 ' }  />
<Marker   coordinate={{latitude :36.7533834,longitude : 126.29439}}    pinColor={'gray'}    title={ ' 선 동물 병원 ' }  />
<Marker   coordinate={{latitude :36.7465175,longitude : 126.3034895}}    pinColor={'gray'}    title={ ' 태안 동물병원 ' }  />
<Marker   coordinate={{latitude :36.7557386,longitude : 126.2934263}}    pinColor={'gray'}    title={ ' 최기중 동물병원 ' }  />
<Marker   coordinate={{latitude :36.7520572,longitude : 126.2937732}}    pinColor={'gray'}    title={ ' 이창석 동물병원 ' }  />
<Marker   coordinate={{latitude :36.7503343,longitude : 126.3039799}}    pinColor={'gray'}    title={ ' 라온 반려 동물병원 ' }  />
<Marker   coordinate={{latitude :36.290387,longitude : 127.2418623}}    pinColor={'gray'}    title={ ' 신도안동물병원 ' }  />
<Marker   coordinate={{latitude :36.2890411,longitude : 127.2416705}}    pinColor={'gray'}    title={ ' 충남동물병원 ' }  />
<Marker   coordinate={{latitude :36.2890537,longitude : 127.2391122}}    pinColor={'gray'}    title={ ' 노아동물병원 ' }  />
<Marker   coordinate={{latitude :36.8267029999999,longitude : 126.7331982}}    pinColor={'gray'}    title={ ' 우리동물병원 ' }  />
<Marker   coordinate={{latitude :36.8737717,longitude : 126.6487676}}    pinColor={'gray'}    title={ ' 제일팜산업동물병원 ' }  />
<Marker   coordinate={{latitude :36.9006944,longitude : 126.6470279}}    pinColor={'gray'}    title={ ' 센트럴동물병원 ' }  />
<Marker   coordinate={{latitude :36.9134965999999,longitude : 126.6305572}}    pinColor={'gray'}    title={ ' 현대동물병원 ' }  />
<Marker   coordinate={{latitude :36.8890821,longitude : 126.6416765}}    pinColor={'gray'}    title={ ' 당진축협동물병원 ' }  />
<Marker   coordinate={{latitude :36.8431966,longitude : 126.7052131}}    pinColor={'gray'}    title={ ' 한울 AHC동물병원 ' }  />
<Marker   coordinate={{latitude :36.8982026,longitude : 126.63527}}    pinColor={'gray'}    title={ ' 행담 동물병원 ' }  />
<Marker   coordinate={{latitude :36.8869608,longitude : 126.6373413}}    pinColor={'gray'}    title={ ' 당진종합 동물병원 ' }  />
<Marker   coordinate={{latitude :36.8174265,longitude : 126.6689136}}    pinColor={'gray'}    title={ ' 참 좋은 동물병원 ' }  />
<Marker   coordinate={{latitude :36.8785568,longitude : 126.7527737}}    pinColor={'gray'}    title={ ' 거산동물병원 ' }  />
<Marker   coordinate={{latitude :36.8050682999999,longitude : 126.7675943}}    pinColor={'gray'}    title={ ' 충청동물병원 ' }  />
<Marker   coordinate={{latitude :36.8935663,longitude : 126.6240114}}    pinColor={'gray'}    title={ ' 충남 동물병원 ' }  />
<Marker   coordinate={{latitude :36.888879,longitude : 126.6368473}}    pinColor={'gray'}    title={ ' 백 동물병원 ' }  />
<Marker   coordinate={{latitude :36.8086664,longitude : 126.7745085}}    pinColor={'gray'}    title={ ' 백제 가축병원 ' }  />
<Marker   coordinate={{latitude :36.8918956,longitude : 126.6264208}}    pinColor={'gray'}    title={ ' 정가축병원 ' }  />
<Marker   coordinate={{latitude :36.8930261,longitude : 126.6299727}}    pinColor={'gray'}    title={ ' 건국동물병원 ' }  />
<Marker   coordinate={{latitude :36.8301979,longitude : 126.7320543}}    pinColor={'gray'}    title={ ' 당진낙협동물병원 ' }  />
<Marker   coordinate={{latitude :36.8689846,longitude : 126.7545219}}    pinColor={'gray'}    title={ ' 종합동물병원 ' }  />
<Marker   coordinate={{latitude :36.8903065,longitude : 126.6368634}}    pinColor={'gray'}    title={ ' 푸른가축병원 ' }  />
<Marker   coordinate={{latitude :36.807469,longitude : 126.7722549}}    pinColor={'gray'}    title={ ' 강한 우리동물병원 ' }  />
<Marker   coordinate={{latitude :36.8108268,longitude : 126.7681768}}    pinColor={'gray'}    title={ ' 당찬우리동물병원 ' }  />
<Marker   coordinate={{latitude :36.8943428,longitude : 126.6336588}}    pinColor={'gray'}    title={ ' 킴스동물의료센터 ' }  />
<Marker   coordinate={{latitude :36.9026305,longitude : 126.6884595}}    pinColor={'gray'}    title={ ' 송악 동물병원 ' }  />
<Marker   coordinate={{latitude :36.8713037,longitude : 126.7529443}}    pinColor={'gray'}    title={ ' 성신동물병원 ' }  />
<Marker   coordinate={{latitude :36.7678284,longitude : 126.452592}}    pinColor={'gray'}    title={ ' 구피동물병원 ' }  />
<Marker   coordinate={{latitude :36.4740122,longitude : 127.1389708}}    pinColor={'gray'}    title={ ' 비나인동물병원 ' }  />
<Marker   coordinate={{latitude :36.8485484,longitude : 127.1104931}}    pinColor={'gray'}    title={ ' 차암동물병원 ' }  />

    </MapView>
    </View>
  );
}


const styles = StyleSheet.create({

  container:{
    backgroundColor: 'white', 
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10, 
    height: 600,
    top:30,
    borderWidth: 3, borderColor: 'skyblue', borderRadius: 10,
},
  iconbutton: {
    margin: 10,
  },
  marker:{

  },

  mapButton: {
    top:30,
    width: 75,
    height: 75,
    borderRadius: 85/2,
    backgroundColor: 'rgba(204, 229, 255, 1)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    shadowColor: 'black',
    shadowRadius: 8,
    shadowOpacity: 0.12,
    opacity: .6,
    zIndex: 10,
 },buttonText: { fontSize: 28, fontFamily: 'garam', fontWeight: 'bold', color: 'black' },
  map: {
    top:50,
    width: 370,
    height: 650,
  },
});


export default SearchMapTab;