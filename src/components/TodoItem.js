import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { toggleTodo, deleteTodo, editTodo } from "../features/todo/todoSlice";
import { format, isToday, isYesterday, isValid } from "date-fns";

const TodoItem = ({
  todo,
  index,
  handleDragStart,
  handleDragEnter,
  handleDragEnd,
  isDragging,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);
  const dispatch = useDispatch();
  const textareaRef = useRef(null);

  // изменение размеров textarea в зависимости от содержимого
  // сбрасываем высоту до высоты строки, затем ставим высоту по содержимому
  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.style.height = "22px";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [newText, isEditing]);

  // после нажатия на кнопку редактирования, сразу ставится фокус на textarea
  useEffect(() => {
    if (isEditing) {
      textareaRef.current.focus();
    }
  }, [isEditing]);

  //редактирование задачи
  const handleEdit = () => {
    dispatch(editTodo({ id: todo.id, text: newText }));
    setIsEditing(false);
  };

  // отображение даты задачи (сегодня, вчера, далее: число)
  const getTaskDate = (date) => {
    const taskDate = new Date(date);
    if (!isValid(taskDate)) {
      return "Некорректная дата";
    }
    if (isToday(taskDate)) {
      return "Сегодня";
    } else if (isYesterday(taskDate)) {
      return "Вчера";
    } else {
      return format(taskDate, "dd.MM");
    }
  };

  // делаем кнопку редактирования неактивной, если задача выполнена или текст не был изменен
  const isDisabled = todo.completed || (isEditing && newText === todo.text);

  return (
    <div
      className={`item ${isDragging ? "dragging" : ""}`}
      draggable
      onDragStart={(e) => handleDragStart(e, index)}
      onDragEnter={(e) => handleDragEnter(e, index)}
      onDragEnd={handleDragEnd}
      onDragOver={(e) => e.preventDefault()}
    >
      <div className="item__date">{getTaskDate(todo.date)}</div>
      <div className="task">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => dispatch(toggleTodo(todo.id))}
          className="custom-checkbox"
        />
        {isEditing ? (
          <textarea
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            ref={textareaRef}
            className="task__editing"
          />
        ) : (
          <span
            style={{ textDecoration: todo.completed ? "line-through" : "none" }}
            className="task__text"
          >
            {todo.text}
          </span>
        )}
      </div>
      <div className="btns">
        <button
          onClick={() => {
            if (isEditing) {
              handleEdit();
            } else {
              setIsEditing(true);
            }
          }}
          className={`btns__edit ${isEditing ? "active" : ""} ${
            isDisabled ? "disabled" : ""
          }`}
          disabled={isDisabled}
        >
          {isEditing && (
            <span
              className={`btns__edit__save-label ${
                isDisabled ? "disabled" : ""
              }`}
            >
              Сохранить
            </span>
          )}
          <div
            className={`btns__edit__icon ${isEditing ? "active" : ""} ${
              isDisabled ? "disabled" : ""
            }`}
          ></div>
        </button>
        <button
          onClick={() => dispatch(deleteTodo(todo.id))}
          className="btns__delete"
        >
          <div className="btns__delete__icon"></div>
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
