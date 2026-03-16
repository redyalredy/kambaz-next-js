import React, { createContext, useState } from "react";

type Todo = {
  id: string;
  title: string;
};

type TodosContextType = {
  todos: Todo[];
  todo: Todo;
  setTodo: (todo: Todo) => void;
  addTodo: () => void;
  updateTodo: () => void;
  deleteTodo: (id: string) => void;
};

export const TodosContext = createContext<TodosContextType | null>(null);

export const TodosProvider = ({ children }: any) => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: "1", title: "Learn React" },
    { id: "2", title: "Learn Node" }
  ]);

  const [todo, setTodo] = useState<Todo>({
    id: "-1",
    title: "Learn Mongo"
  });

  const addTodo = () => {
    const newTodo = {
      ...todo,
      id: new Date().getTime().toString()
    };
    setTodos([...todos, newTodo]);
    setTodo({ id: "-1", title: "" });
  };

  const updateTodo = () => {
    const newTodos = todos.map((item) =>
      item.id === todo.id ? todo : item
    );
    setTodos(newTodos);
    setTodo({ id: "-1", title: "" });
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  return React.createElement(
    TodosContext.Provider,
    {
      value: { todos, todo, setTodo, addTodo, updateTodo, deleteTodo }
    },
    children
  );
};
