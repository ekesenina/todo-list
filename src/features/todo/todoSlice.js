import { createSlice } from "@reduxjs/toolkit";

const loadFromLocalStorage = () => {
  const savedTodos = localStorage.getItem("todos");
  if (savedTodos) {
    return JSON.parse(savedTodos); 
  }
  return [];
};

const initialState = {
  todos: loadFromLocalStorage(), 
  filter: "all"
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    // добавление задачи
    addTodo: (state, action) => {
      state.todos.push({
        id: Date.now(),
        text: action.payload,
        completed: false,
        date: new Date().toISOString(), 
      });
    },
    // статус задачи
    toggleTodo: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    // удаление задачи
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    // редактирование задачи
    editTodo: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.text = action.payload.text;
      }
    },
    // фильтрация задач
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    // перетаскивание задач
    updateTodosOrder: (state, action) => {
      state.todos = action.payload;
    },
  },
});

export const {
  addTodo,
  toggleTodo,
  deleteTodo,
  editTodo,
  setFilter,
  updateTodosOrder,
} = todoSlice.actions;
export default todoSlice.reducer;
