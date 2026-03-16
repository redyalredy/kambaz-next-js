"use client";
import ClickEvent from "./ClientEvent";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunctions";
import Counter from "./Counter";
import BooleanStateVariables from "./BooleanStateVariables";
import StringStateVariables from "./StringStateVariables";
import DateStateVariable from "./DataStateVariable";
import ObjectStateVariable from "./ObjectStateVariable";
import ParentStateComponent from "./ParentStateComponent";
import ArrayStateVariable from "./ArrayStateVariable";
import store from "./store";
import { Provider } from "react-redux";
import Link from "next/link";

export default function Lab4() {
    function sayHello() {
        alert("Hello");
      }    
    
    return (
        <Provider store={store}>
        <div id="wd-lab4">
            <h3>Lab 4</h3>
            <ClickEvent/>
            <PassingDataOnEvent/>
            <PassingFunctions theFunction={sayHello} />
            <Counter/>
            <BooleanStateVariables/>
            <StringStateVariables/>
            <DateStateVariable/>
            <ObjectStateVariable/>
            <ArrayStateVariable/>
            <ParentStateComponent/>
            <Link href="/labs/lab4/redux">Redux Examples</Link>
            <hr/>
            <Link href="./lab4/react-context">React Context Examples</Link>
            <hr/> 
            <Link href="./lab4/zustand">Zustand Examples</Link>

        </div>
        </Provider>
    );
}