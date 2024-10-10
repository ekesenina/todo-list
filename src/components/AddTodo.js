import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/todo/todoSlice";

import addBtn from "../img/add.svg";

const AddTodo = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  // отправка формы (проверка на пустое поле, отправка, очистка поля после отправки)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(addTodo(text));
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        className="todo-input"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Создать задачу"
      />
      <button type="submit" className="button-add">
        <img src={addBtn} alt="Add task" className="button-add__icon" />
      </button>{" "}
    </form>
  );
};

export default AddTodo;
