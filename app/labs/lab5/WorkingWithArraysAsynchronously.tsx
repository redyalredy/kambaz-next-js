"use client";
import React, { useState, useEffect } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { FaPencil } from "react-icons/fa6";
import * as client from "./client";
import { FormControl, ListGroup, ListGroupItem } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";

export default function WorkingWithArraysAsynchronously() {
  const [todos, setTodos] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const editTodo = (todo: any) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === todo.id ? { ...t, editing: true } : t
      )
    );
  };

  const updateTodo = async (todo: any) => {
    try {
      await client.updateTodo(todo);

      setTodos((prev) =>
        prev.map((t) => (t.id === todo.id ? todo : t))
      );

      setErrorMessage(null);
    } catch (error: any) {
      console.log(error);
      setErrorMessage(
        error?.response?.data?.message || "Failed to update todo"
      );
    }
  };

  const fetchTodos = async () => {
    try {
      const todos = await client.fetchTodos();
      setTodos(todos);
      setErrorMessage(null);
    } catch (error: any) {
      setErrorMessage(
        error?.response?.data?.message || "Failed to fetch todos"
      );
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const removeTodo = async (todo: any) => {
    try {
      const updatedTodos = await client.removeTodo(todo);
      setTodos(updatedTodos);
      setErrorMessage(null);
    } catch (error: any) {
      setErrorMessage(
        error?.response?.data?.message || "Failed to remove todo"
      );
    }
  };

  const createNewTodo = async () => {
    try {
      const todos = await client.createNewTodo();
      setTodos(todos);
      setErrorMessage(null);
    } catch (error: any) {
      setErrorMessage(
        error?.response?.data?.message || "Failed to create todo"
      );
    }
  };

  const postNewTodo = async () => {
    try {
      const newTodo = await client.postNewTodo({
        title: "New Posted Todo",
        completed: false,
      });

      setTodos((prev) => [...prev, newTodo]);
      setErrorMessage(null);
    } catch (error: any) {
      setErrorMessage(
        error?.response?.data?.message || "Failed to post todo"
      );
    }
  };

  const deleteTodo = async (todo: any) => {
    try {
      await client.deleteTodo(todo);

      setTodos((prev) =>
        prev.filter((t) => t.id !== todo.id)
      );

      setErrorMessage(null);
    } catch (error: any) {
      setErrorMessage(
        error?.response?.data?.message || "Failed to delete todo"
      );
    }
  };

  return (
    <div id="wd-asynchronous-arrays">
      <h3>Working with Arrays Asynchronously</h3>

      {errorMessage && (
        <div className="alert alert-danger mb-2 mt-2">
          {errorMessage}
        </div>
      )}

      <h4>
        Todos
        <FaPlusCircle
          onClick={createNewTodo}
          className="text-success float-end fs-3"
        />
        <FaPlusCircle
          onClick={postNewTodo}
          className="text-primary float-end fs-3 me-3"
          id="wd-post-todo"
        />
      </h4>

      <ListGroup>
        {todos.map((todo) => (
          <ListGroupItem
            key={todo.id}
            className="d-flex align-items-center justify-content-between"
          >
            <div className="d-flex align-items-center gap-2">
              <input
                type="checkbox"
                className="form-check-input"
                checked={todo.completed}
                onChange={(e) =>
                  updateTodo({
                    ...todo,
                    completed: e.target.checked,
                  })
                }
              />

              {!todo.editing ? (
                <span
                  style={{
                    textDecoration: todo.completed
                      ? "line-through"
                      : "none",
                  }}
                >
                  {todo.title}
                </span>
              ) : (
                <FormControl
                  className="w-100"
                  defaultValue={todo.title}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      updateTodo({
                        ...todo,
                        editing: false,
                      });
                    }
                  }}
                  onChange={(e) =>
                    updateTodo({
                      ...todo,
                      title: e.target.value,
                    })
                  }
                />
              )}
            </div>

            <div className="d-flex align-items-center gap-3">
              <FaPencil
                onClick={() => editTodo(todo)}
                className="text-primary"
                style={{ cursor: "pointer" }}
              />

              <TiDelete
                onClick={() => deleteTodo(todo)}
                className="text-danger fs-5"
                style={{ cursor: "pointer" }}
              />

              <FaTrash
                onClick={() => removeTodo(todo)}
                className="text-danger"
                style={{ cursor: "pointer" }}
              />
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>

      <hr />
    </div>
  );
}