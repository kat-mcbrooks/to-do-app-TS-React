import React, { useState } from "react";
import "./App.css";
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";
import { Todo } from "./model";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

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

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return; //if it's moved somewhere invalid, destination will be null, so do nothing.
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    let add,
      active = todos,
      complete = completedTodos;
    //first assign the relevant todo to add and update the source array
    if (source.droppableId === "TodosList") {
      add = active[source.index]; //assign the relevant todo element from todos array to add
      active.splice(source.index, 1); //remove the relevant todo element from the todos array
    } else {
      add = complete[source.index]; //assign the relevant todo element from completedTodos array to add
      complete.splice(source.index, 1); //remove the relevant todo element from the completedTodos array
    }
    //then add the todo assigned to add to its intended destination
    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add); //add the todo assigned to add to the active array at the relevant index
    } else {
      complete.splice(destination.index, 0, add); //add the todo assigned to add to the complete array at the relevant index
    }
    setCompletedTodos(complete); //set completedtodos array with the complete array which has been modified above
    setTodos(active); //set completedtodos array with the active array which has been modified above
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
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
