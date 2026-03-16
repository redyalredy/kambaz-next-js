"use client";

import { useContext } from "react";
import { ListGroup, Button, FormControl } from "react-bootstrap";
import { TodosContext } from "./todosContext";

export default function ReactContextTodoList() {
  const context = useContext(TodosContext);
  if (!context) return null;

  const { todos, todo, setTodo, addTodo, updateTodo, deleteTodo } = context;

  return (
    <div>
      <h2>React Context Todo List</h2>

      <ListGroup>

        <ListGroup.Item className="d-flex align-items-center">
          <FormControl
            className="me-2"
            value={todo.title}
            onChange={(e) =>
              setTodo({ ...todo, title: e.target.value })
            }
          />

          <Button className="me-2" onClick={updateTodo}>
            Update
          </Button>

          <Button onClick={addTodo}>
            Add
          </Button>
        </ListGroup.Item>

        {todos.map((todo) => (
          <ListGroup.Item
            key={todo.id}
            className="d-flex justify-content-between"
          >
            {todo.title}

            <div>
              <Button
                className="me-2"
                onClick={() => setTodo(todo)}
              >
                Edit
              </Button>

              <Button
                variant="danger"
                onClick={() => deleteTodo(todo.id)}
              >
                Delete
              </Button>
            </div>
          </ListGroup.Item>
        ))}

      </ListGroup>
    </div>
  );
}
