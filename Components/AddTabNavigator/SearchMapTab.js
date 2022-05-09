import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import { Dimensions } from 'react-native';
import { Ionicons} from '@expo/vector-icons';
export default class SearchMapTab extends Component {
  
    
    render() {
        return (
            <View style={styles.container}>
               <MapView style={styles.map}/>
            </View>
        );
    }
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      },
});