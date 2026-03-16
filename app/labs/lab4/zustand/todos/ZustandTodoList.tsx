"use client";

import { ListGroup, Button, FormControl } from "react-bootstrap";
import useTodoStore from "./useTodoStore";

export default function ZustandTodoList() {
  const { todos, todo, setTodo, addTodo, updateTodo, deleteTodo } =
    useTodoStore();

  return (
    <div>
      <h2>Zustand Todo List</h2>

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
