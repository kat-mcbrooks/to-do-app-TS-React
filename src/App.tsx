import React, { useState } from "react";
import "./App.css";
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";
import { Todo } from "./model";
import { DragDropContext } from "react-beautiful-dnd";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]); // this is how you create an array of a type or an interface
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      setTodo("");
    }
    console.log(todos);
  };

  return (
    <DragDropContext onDragEnd={() => {}}>
      <div className="App">
        <span className="heading">Task Manager</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList
          todos={todos}
          setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
