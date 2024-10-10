import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../features/todo/todoSlice";

const Filter = () => {
  const dispatch = useDispatch();
  const currentFilter = useSelector((state) => state.todos.filter);

  return (
    <div className="filter">
      <button
        onClick={() => dispatch(setFilter("all"))}
        className={`filter__btn-all ${currentFilter === "all" ? "active" : ""}`}
      >
        Все
      </button>
      <button
        onClick={() => dispatch(setFilter("completed"))}
        className={`filter__btn-completed  ${
          currentFilter === "completed" ? "active" : ""
        }`}
      >
        Выполнено
      </button>
      <button
        onClick={() => dispatch(setFilter("active"))}
        className={`filter__btn-not-completed ${
          currentFilter === "active" ? "active" : ""
        }`}
      >
        Не выполнено
      </button>
    </div>
  );
};

export default Filter;
