import React, { useState, useEffect } from "react";
import Footer from "./Footer.js";
import { MdDeleteForever } from "react-icons/md";

export default function Main(props) {
  const [todos, setTodos] = useState([ //setting initial state, array of initial items for sake of project
    { text: "Washing", isDone: false },
    { text: "Cleaning", isDone: false },
    { text: "Shopping", isDone: false },
  ]);
  const [newItem, setNewItem] = useState(""); //setting initial state
  function handleCheckbox(index) {  //function handling checkbox, passing through index (item being changed)
    const newTodos = [...todos]; //copying current todos
    newTodos[index].isDone = !newTodos[index].isDone;  //changing index item to either completed or not completed
    setTodos(newTodos);  //updating todos after amendment
  }
  function handleSubmit(chore) {  //function handling submit button, passing through input box value
    setTodos((todos) => [...todos, { text: chore, isDone: false }]);  //get current value of todos, retains all todos, adds to end
  }
  function handleDelete(index) { //function handling delete button, passing through index (item being changed)
    const newTodos = [...todos]; //copying current todos
    newTodos.splice(index, 1);  //remove (start deleting from, number of items)
    setTodos(newTodos);  //updating todos after amendment
  }
  const itemCompletedStyle = {textDecoration: "line-through"}  //style to be applied for chores completed
  const completedItems = todos.filter((chore) => chore.isDone === true);  //returns array of todos where filtered criteria is matched (isDone === true)
  useEffect(() => {  
    setNewItem("");  //fired after new todo is added & clears input box
  }, [todos]);  //fired when [todos] changes
  return (
    <div className="list">
      {todos.map((chore, index) => (  //Maps through todos, returns delete button, checkbox and text for each chore
        <div className="list-row" key={index}>
          <div className="row-left">
            <MdDeleteForever color="red" size={30} onClick={() => handleDelete(index)} />
            <input
              type="checkbox"
              onChange={() => handleCheckbox(index)}
              checked={chore.isDone}
              className="checkbox"
            ></input>{" "}
            <h1 style={chore.isDone ? itemCompletedStyle : null}>{chore.text}</h1>
          </div>
        </div>
      ))}
      <h2>
        <input
          type="input"
          placeholder="Add New Item"
          className="newItemInput"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        ></input>
        &nbsp;
        <button className="newItemInput" onClick={() => handleSubmit(newItem)}>
          Submit
        </button>
      </h2>
      <Footer completedItems={completedItems} todos={todos} />
    </div>
  );
}
