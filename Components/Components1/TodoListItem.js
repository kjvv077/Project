import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const { width, height } = Dimensions.get("window");

const PetListItem = ({textValue, id, checked, onRemove, onToggle}) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onToggle(id)}>
                {checked ? (
                    <View style={styles.completeCircle}>
                        <Icon name="circledowno" size={30} color="#3867d6" />
                    </View>
                ) : (
                    <View style={styles.circle} />
                )}
            </TouchableOpacity>
            <Text style={[styles.text, 
                checked? styles.strikeText : styles.unstrikeText,]}>
                {textValue}
            </Text>
            <TouchableOpacity style={styles.buttonContainer}>
                <Text onPress={onRemove(id)}>
                ❌
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: width - 70,
        flex: 1,
        borderBottomColor: '#bbb',
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    text: {
        flex: 5,
        fontWeight: '500',
        fontSize: 26,
        marginVertical: 20,
        width: 100,
        fontFamily: 'garam',
    },
    circle: {
        width: 28,
        height: 28,
        borderRadius: 15,
        borderColor: '#3867d6',
        borderWidth: 2,
        marginRight: 20,
        marginLeft: 20,
    },
    completeCircle: {
        marginRight: 20,
        marginLeft: 20,
    },
    strikeText: {
        color: '#bbb',
        textDecorationLine: 'line-through',
    },
    unstrikeText: {
        color: '#29323c',
    },
    buttonContainer: {
        marginVertical: 10,
        marginHorizontal: 10,
    },
});

export default PetListItem;