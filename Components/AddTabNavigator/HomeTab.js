import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, SafeAreaView, Alert } from 'react-native';
//import { Icon } from 'native-base';
import { Ionicons} from '@expo/vector-icons';


export default class HomeTab extends Component {
    render() {
        return (
            <View style={style.container}>
                <Text>HomeTab</Text>
                {/* <Button
                    onPress={onPressLearnMore}
                    title="Learn More"
                    color="#841584"  
                    accessibilityLabel="Learn more about this purple button"
                /> */}
            </View>
        );
    }
}
 
const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:"skyblue",
    }
});