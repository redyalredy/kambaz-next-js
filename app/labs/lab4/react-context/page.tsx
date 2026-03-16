"use client";
import { CounterProvider } from "./counter/context";
import CounterContext from "./counter";

import { TodosProvider } from "../context/todosContext";
import ReactContextTodoList from "../context/ReactContextTodoList";

export default function ReactContextExamples() {
 return (
   <div>
     <h1>React Context Examples</h1>

     <CounterProvider>
       <CounterContext />
     </CounterProvider>

     <TodosProvider>
       <ReactContextTodoList />
     </TodosProvider>

   </div>
 );
}
