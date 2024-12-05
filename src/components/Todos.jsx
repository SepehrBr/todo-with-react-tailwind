 import { useEffect, useReducer } from "react";
import TodosList from "./TodosList";
import { v4 as uuidv4 } from 'uuid';
import NewTodoInput from "./NewTodoInput";
import { toast } from "react-toastify";
import todoReducer from "../reducers/todoReducer";
import { TodoContext } from "../context/todoContext";

export default function Todos() {
    const [ todos, todosDispatcher ] = useReducer( todoReducer, []);
    const URL = 'https://6750711369dc1669ec1b2e99.mockapi.io/todos'

// add todo
    const addTodo = async (todoTitle) => {
        try {
            const res = await fetch( URL, {
                method: 'POST',
                headers: { 'content-type' : 'application/json' },
                body: JSON.stringify(
                    {
                        id: uuidv4(),
                        title: todoTitle,
                        status: false
                    }
                )
            });

            if (res.ok) {
                const data = await res.json();
                todosDispatcher(
                    {
                        type: 'add',
                        id: data.id,
                        title: data.title,
                    }
                );
            }

            toast.success('Todo Added :)')
        } catch (e) {
            toast('something went wrong :(')
            console.log(e)
        }
    }

// fetch from api
    const fetchAllTodos = async () => {
        try {
            const res = await fetch( URL, {
                    method: 'GET',
                    headers: { 'content-type' : 'application/json' },
                });

            if (res.ok) {
                const data = await res.json();

                todosDispatcher(
                    {
                        type: 'fetch_all',
                        todos: data
                    }
                );
            }

            // toast('Todos Fetched :)')
        } catch (e) {
            toast('something went wrong :(')
            console.log(e)
        }
    }

    useEffect(() => {
        fetchAllTodos();
    }, []);


    return (
        <div className="flex items-center justify-center h-screen">
            <div className="w-full px-4 py-8 mx-auto shadow lg:w-1/3  bg-white">
                <div className="flex items-center mb-6">
                    <h1 className="mr-6 text-4xl font-bold text-purple-600"> TO DO APP</h1>
                </div>
                <div className="relative">
                    <NewTodoInput
                        addTodo={addTodo}
                    />
                </div>
                <TodoContext.Provider value={
                    {
                        todos,
                        todosDispatcher
                    }
                } >
                    <TodosList />
                </TodoContext.Provider>
            </div>
        </div>
    )
}
