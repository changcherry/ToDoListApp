import React, { useState, useEffect } from "react";

import TodoApp from "./ToDoApp";
import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const todosCollection = collection(db, "todos");

  
  // 即時監聽 Firestore 資料變化
  useEffect(() => {
    const unsubscribe = onSnapshot(todosCollection, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTodos(data);
    });
    return () => unsubscribe();
  }, []);

  const addTodo = async () => {
    if (input.trim() === "") return;
    await addDoc(todosCollection, {
      text: input,
      createdAt: new Date(),
    });
    setInput("");
  };

  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const confirmEdit = async () => {
    if (editText.trim() === "") return;
    const todoDoc = doc(db, "todos", editingId);
    await updateDoc(todoDoc, { text: editText });
    setEditingId(null);
    setEditText("");
  };

  return (
    <div className="App">
    <TodoApp />
  </div>
);
}

export default App;
