import React, { useState, useEffect } from "react";
import Footer from "./Footer.js";
import { MdDeleteForever } from "react-icons/md";

export default function Main(props) {
  const [todos, setTodos] = useState([
    { text: "Washing", isDone: false },
    { text: "Cleaning", isDone: false },
    { text: "Shopping", isDone: false },
  ]);
  const [newItem, setNewItem] = useState("");
  function handleCheckbox(index) {
    const newTodos = [...todos];
    newTodos[index].isDone = !newTodos[index].isDone;
    setTodos(newTodos);
  }
  function handleSubmit(chore) {
    setTodos((todos) => [...todos, { text: chore, isDone: false }]);
  }
  function handleDelete(index) {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }
  const itemCompletedStyle = {textDecoration: "line-through"}
  const completedItems = todos.filter((f) => f.isDone === true);
  useEffect(() => {
    setNewItem("");
  }, [todos]);
  return (
    <div className="list">
      {todos.map((chore, index) => (
        <div className="list-row">
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
