import React, { useReducer } from "react";
import { Todo } from "../model";
type Actions =
  | { type: "add"; payload: string } //payload will be the todo string text
  | { type: "remove"; payload: number } //payload will be the todo id
  | { type: "done"; payload: number }; //payload will be the todo id

const TodoReducer = (state: Todo[], action: Actions) => {
  switch (action.type) {
    case "add":
      return [
        ...state,
        { id: Date.now(), todo: action.payload, isDone: false },
      ];
    case "remove":
      return state.filter((todo) => todo.id !== action.payload);
    case "done":
      return state.map((todo) =>
        todo.id === action.payload ? { ...todo, isDone: !todo.isDone } : todo
      );
    default:
      return state;
  }
};
const ReducerExample = () => {
  const [state, dispatch] = useReducer(TodoReducer, []); //initial value is empty array.
  return <div>Reducer</div>;
};
