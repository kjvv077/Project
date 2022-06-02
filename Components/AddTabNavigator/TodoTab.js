import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text, StyleSheet, View, Dimensions, Platform ,Image} from 'react-native';
import uuid from 'react-uuid';
import PetInsert from '../Components1/TodoInsert';
import PetList from '../Components1/TodoList';


const { height, width } = Dimensions.get("window");

const TodoTab = () => {
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
      <Text style={styles.title} > <Image
              source={require("../../assets/images/foot.png")}
              style={styles.image}
            />오늘의 할일
            <Image
              source={require("../../assets/images/foot.png")}
              style={styles.image}
            /></Text>
      <View style={styles.card}>
        <PetInsert onAddTodo={addTodo} />
        <PetList Todos={Todos} onRemove={onRemove} onToggle={onToggle} />
      </View>
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
    height: 300,
    top:30,
   borderWidth: 3, borderColor: 'skyblue', borderRadius: 10,
},

  iconbutton: {
    margin: 10,
  },
  title: {
    color: "black",
    fontSize: 33,
    marginTop: 50,
    fontWeight: "400",
    marginBottom: 30,
    textAlign: "center",
    fontFamily: 'garam',
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

export default TodoTab;