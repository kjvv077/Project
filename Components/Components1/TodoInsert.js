
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useRef, useState} from 'react';
import {Button, StyleSheet, TextInput, View} from 'react-native';

const PetInsert = ({onAddTodo}) => {
    const [NewTodoItem, setNewTodoItem] = useState({});
    

    const todoInputHandler = newTodo => {
        setNewTodoItem(newTodo);
    };
    const addTodoHandler = () => {
        
        onAddTodo(NewTodoItem);
        AsyncStorage.setItem("todoList", JSON.stringify(NewTodoItem))
        setNewTodoItem('');
    };
   

    return (
        <View style={styles.inputContainer}>
            <TextInput 
                style={styles.input}
                placeholder="✏️ 오늘 할일을 적으세요!"
                placeholderTextColor={'#999'}
                returnKeyType="next"
                blurOnSubmit={true}
                onChangeText={todoInputHandler}
                value={NewTodoItem.name}
                
                //autoCorrect={false}
            />
            
            
            <View style={styles.button}>
                <Button title={'ADD'} onPress={addTodoHandler} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        padding: 20,
        borderBottomColor: '#bbb',
        borderBottomWidth: 1,
        fontSize: 28,
        marginLeft: 20,
        fontFamily: 'garam',
    },
    button: {
        marginRight: 10,
    },
});

export default PetInsert;