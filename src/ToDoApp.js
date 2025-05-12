import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "./firebase";
import "./ToDoApp.css";

function ToDoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const todosCollection = collection(db, "todos");

  // 監聽 Firestore 的變動
  useEffect(() => {
    const unsubscribe = onSnapshot(todosCollection, (snapshot) => {
      const todoData = snapshot.docs.map((doc) => ({
        id: doc.id,
        text: doc.data().text,
      }));
      setTodos(todoData);
    });

    return () => unsubscribe();
  }, []);

  // 新增 todo
  const addTodo = async () => {
    if (!input.trim()) return;

    await addDoc(todosCollection, {
      text: input.trim(),
      createdAt: Date.now(),
    });

    setInput("");
  };

  // 刪除 todo
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  // 啟動編輯模式
  const startEditing = (todo) => {
    setEditingId(todo.id);
    setEditingText(todo.text);
  };

  // 儲存編輯
  const saveEdit = async (id) => {
    if (!editingText.trim()) return;

    const todoRef = doc(db, "todos", id);
    await updateDoc(todoRef, {
      text: editingText.trim(),
    });

    setEditingId(null);
    setEditingText("");
  };

  return (
    <div className="todo-container">
      <h1 className="title">ToDoList</h1>

      <div className="input-group">
        <input
          type="text"
          placeholder="Enter a new task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id}>
            {editingId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
                <button onClick={() => saveEdit(todo.id)}>Save</button>
              </>
            ) : (
              <>
                <span>{todo.text}</span>
                <div className="btn-group">
                  <button onClick={() => startEditing(todo)}>✏️ Edit</button>
                  <button onClick={() => deleteTodo(todo.id)}>🗑️ Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoApp;
