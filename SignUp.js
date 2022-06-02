import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
    StyleSheet, ScrollView, View, Text, Image,
    Alert, TouchableOpacity,
    TextInput
} from "react-native";
import * as Font from "expo-font";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
    doc,
    setDoc,
  } from "firebase/firestore";
import { db,auth } from './config';
import { Ionicons } from '@expo/vector-icons'; 

function InsertView({ navigation }) {

    const [registerEmail, setEmail] = useState("");
    const [registerPassword, setPassword] = useState("")

    const Create = () => {
        const myDoc = doc(db,"사용자", registerEmail);
        const docData = {
            email: registerEmail,
            password: registerPassword
        };
    
        setDoc(myDoc, docData)
          .then(() => {
            console.log("사용자가 등록되었습니다");
          })
          .catch((error) => {
            console.log(error.message);
          });
      };
        

    const register = async () => {
        try {
            const user = await createUserWithEmailAndPassword(
                auth,
                registerEmail,
                registerPassword
            );
            Create();
            Alert.alert("가입되었습니다")
        } catch (error) {
            if (error.message=='Firebase: Error (auth/email-already-in-use).')  Alert.alert("이미 가입된 이메일입니다.");
            else if (error.message=='Firebase: Error (auth/missing-email).') Alert.alert("이메일을 입력헤주세요.");
            else if (error.message=='Firebase: Error (auth/invalid-email).') Alert.alert("이메일을 확인해주세요");
            else if (error.message=='Firebase: Password should be at least 6 characters (auth/weak-password).') Alert.alert("비밀번호는 6자 이상이어야 합니다.");
            else Alert.alert("다시 시도해주세요");

            console.log(error.message);
        }
    };


    //폰트
    const [fontLoaded, setFontLoaded] = useState(false);

    useEffect(() => {
        Font.loadAsync({
            'name': require('./assets/fonts/SingleDay-Regular.ttf'),
            'garam': require('./assets/fonts/GARAM.ttf')
        })
            .then(() => {
                setFontLoaded(true);
            })
    }, [])

    if (!fontLoaded) return null;
    else {
        return (
            <View style={styles.container}>
                <StatusBar style="dark"></StatusBar>
                <ScrollView>
                <TouchableOpacity style={{marginTop:15, marginLeft:7}} onPress={()=>navigation.pop()}
                ><Ionicons name="chevron-back" size={30} color="#6E6E6E" /></TouchableOpacity>
                    <View style={{ flexDirection: 'row', justifyContent: 'center',marginTop:-5}}>
                        <Image
                            source={require("./assets/images/foot.png")}
                            style={styles.image}
                        />
                        <Text style={styles.text}>가입</Text>
                        <Image
                            source={require("./assets/images/foot.png")}
                            style={styles.image}
                        />
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 30}}>
                        <Text style={styles.inputs} >이메일 :</Text>
                        <TextInput style={styles.inputBox} placeholder='이메일을 입력해주세요'
                        onChangeText={(value) => setEmail(value)}></TextInput>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.inputs}>비밀번호 :</Text>
                        <TextInput style={[styles.inputBox, { marginLeft: 10 }]} secureTextEntry
                        placeholder='6자 이상 입력해주세요'
                        onChangeText={(value) => setPassword(value)}></TextInput>
                    </View>
                    <View style={{alignItems:'flex-end', marginTop:30,marginRight:15}}>
                    <TouchableOpacity style={styles.button}
                        onPress={register}
                    ><Text style={styles.buttonText}>가입하기</Text></TouchableOpacity></View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        margin: 10, marginTop: 55,
        height: 755, borderWidth: 3, borderColor: 'skyblue', borderRadius: 10,
    },
    image: {
        marginLeft: 5,
        width: 70,
        height: 50,
    },
    text: {
        fontSize: 35,
        fontFamily: 'name',
    },
    inputs:
    {
        fontSize: 32, fontFamily: 'garam', marginLeft: 25, marginTop: 20,
        color: '#045FB4'
    },
    inputBox:
    {
        borderWidth: 2, borderColor: 'skyblue', borderRadius: 10, height: 40, width: 200,
        marginLeft: 33, marginTop: 23, padding: 10, 
    },
    button:{
        backgroundColor:'lightgray', borderRadius:6,
        paddingHorizontal:10, paddingVertical:5, justifyContent:'center'
    }, buttonText:{fontSize:30,fontFamily:'garam'}
});

export default InsertView;