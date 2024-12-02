import { useState } from "react";
import TodosList from "./TodosList";
import { v4 as uuidv4 } from 'uuid';
import Todo from "./Todo";

export default function Todos() {
    const [ todos, setTodos ] = useState([
        {
            id: uuidv4(),
            title: 'do dishes',
            status: true
        },
        {
            id: uuidv4(),
            title: 'go gym',
            status: false
        }
    ]);
    const [ newTodo, setNewTodo ] = useState('');

    const changeHandler = (e) => {
        setNewTodo(e.target.value);
    }
    const pressEnterHandler = (e) => {
        if (e.key == 'Enter' && newTodo != "") {
            setTodos([
                ...todos,
                {
                    id: uuidv4(),
                    title: newTodo,
                    status: false
                }
            ])

            setNewTodo('');
        }
    }


    return (
        <div className="bg-gray-100">
            <div className="flex items-center justify-center h-screen">
                <div className="w-full px-4 py-8 mx-auto shadow lg:w-1/3  bg-white">
                    <div className="flex items-center mb-6">
                        <h1 className="mr-6 text-4xl font-bold text-purple-600"> TO DO APP</h1>
                    </div>
                    <div className="relative">
                        <input type="text" placeholder="What needs to be done today?"
                            onChange={changeHandler}
                            onKeyUp={pressEnterHandler}
                            value={newTodo}
                        className="w-full px-2 py-3 border rounded outline-none border-grey-600" />
                    </div>
                    <TodosList>
                        {
                            todos.map((item) => <Todo key={item.id} todo={item} />)
                        }
                    </TodosList>
                </div>
            </div>
        </div>
    )
}
