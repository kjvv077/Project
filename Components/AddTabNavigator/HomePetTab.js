import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text, StyleSheet, View, Dimensions, Platform } from 'react-native';
import uuid from 'react-uuid';
import PetInsert from '../Components1/PetInsert';
import PetList from '../Components1/PetList';

const { height, width } = Dimensions.get("window");

const HomePetTab = () => {
  const [Todos, setTodos] = useState([]);

  const addTodo = text => {
    setTodos([...Todos,
      {id: uuid(), textValue: text, checked: false}, // check true면 완료
    ]);
  };

  const onRemove = id => e => {
    setTodos(Todos.filter(Todo => Todo.id !== id));
  };

  const onToggle = id => e => {
    setTodos(
      Todos.map(Todo =>
        Todo.id === id ? {...Todo, checked: !Todo.checked} : Todo,
      ),
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>Pet😎</Text>
      <View style={styles.card}>
        <PetInsert onAddTodo={addTodo} />
        <PetList Todos={Todos} onRemove={onRemove} onToggle={onToggle} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4b7bec",
    padding: 50,
    alignItems: "center",
    marginTop:-35
  },
  title: {
    color: "white",
    fontSize: 30,
    marginTop: 50,
    fontWeight: "400",
    marginBottom: 30,
    textAlign: "center",
  },
  card: {
    backgroundColor: "white",
    flex: 1,
    width: width - 35,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 0,
    ...Platform.select({
      ios: {
        shadowColor: "rgb(50, 50, 50)",
        shadowOpacity: 0.5,
        shadowRadius: 10,
        shadowOffset: {
          height: 30,
          width:0
        }
      },
      android: {
        elevation: 3
      }
    }),
  },
});

export default HomePetTab;