"use client";

import { useState } from "react";
import { ListGroup, Button, FormControl } from "react-bootstrap";
import { useSelector } from "react-redux";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import { todo } from "node:test";
import { RootState } from "../../store";
import { setTodo, addTodo, updateTodo, deleteTodo } from "./todosReducer";

export default function TodoList() {
  const { todos } = useSelector((state: RootState) => state.todosReducer);
  return (
    <div>
      <h2>Todo List</h2>

      <ListGroup className="mb-3">

      <TodoForm/>
        {todos.map((todo) => (
          <TodoItem todo={todo}/>
        ))}


      </ListGroup>

      <hr />
    </div>
  );
}
