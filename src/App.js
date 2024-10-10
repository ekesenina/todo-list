import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import Filter from "./components/Filter";

function App() {
  const todos = useSelector((state) => state.todos.todos);

  // сохранение в LocalStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="app">
      <h1 className="title">Список дел</h1>
      <AddTodo />
      <Filter />
      <TodoList />
    </div>
  );
}

export default App;
