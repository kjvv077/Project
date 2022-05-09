import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons} from '@expo/vector-icons';
export default class CalendarTab extends Component {
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Ionicons name='chevron-down-circle-outline' style={{ color: tintColor }} />
        )
    }
    
    render() {
        return (
            <View style={style.container}>
                <Text>CalendarTab</Text>
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