/* eslint-disable react/prop-types */
import { useState } from "react";

export default function NewTodoInput({ addTodo }) {
    const [ newTodo, setNewTodo ] = useState('');

// add new todo
    const changeHandler = (e) => {
        setNewTodo(e.target.value);
    }
    const pressEnterHandler = (e) => {
        if (e.key == 'Enter' && newTodo != "") {
            addTodo(newTodo);
            setNewTodo('');
        }
    }

    return (
        <>
            <input
                type="text" placeholder="What needs to be done today?"
                onChange={changeHandler}
                onKeyUp={pressEnterHandler}
                value={newTodo}
                className="w-full px-2 py-3 border rounded outline-none border-grey-600"
            />
        </>
    )
}
