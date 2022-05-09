import React, {useState} from 'react';
import {Button, StyleSheet, TextInput, View} from 'react-native';

const PetInsert = ({onAddTodo}) => {
    const [NewTodoItem, setNewTodoItem] = useState('');
    const todoInputHandler = newTodo => {
        setNewTodoItem(newTodo);
    };
    const addTodoHandler = () => {
        onAddTodo(NewTodoItem);
        setNewTodoItem('');
    };

    return (
        <View style={styles.inputContainer}>
            <TextInput 
                style={styles.input}
                placeholder="✏️ 동물이름을 여기에 입력해주세요."
                placeholderTextColor={'#999'}
                onChangeText={todoInputHandler}
                value={NewTodoItem}
                autoCorrect={false}
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
        fontSize: 24,
        marginLeft: 20,
    },
    button: {
        marginRight: 10,
    },
});

export default PetInsert;