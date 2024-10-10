import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TodoItem from "./TodoItem";
import { updateTodosOrder } from "../features/todo/todoSlice";

const TodoList = () => {
  const { todos, filter } = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // перетаскивание задач. запоминаем задачу, обновляем массив при перетаскивании, обновляем порядок задач
  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
  };

  const handleDragEnter = (e, index) => {
    setHoveredIndex(index);
    if (draggedIndex !== index) {
      const newTodos = [...todos];
      const draggedTodo = newTodos[draggedIndex];

      newTodos.splice(draggedIndex, 1);
      newTodos.splice(index, 0, draggedTodo);
      setDraggedIndex(index);
      dispatch(updateTodosOrder(newTodos));
    }
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setHoveredIndex(null);
  };

  // отображение задач по фильтру
  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "active") return !todo.completed;
    return true;
  });

  return (
    <div className="list">
      {filteredTodos.map((todo, index) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          index={index}
          handleDragStart={handleDragStart}
          handleDragEnter={handleDragEnter}
          handleDragEnd={handleDragEnd}
          isDragging={draggedIndex === index}
        />
      ))}
    </div>
  );
};

export default TodoList;
