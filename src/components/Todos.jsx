/* eslint-disable no-constant-binary-expression */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import TodosList from "./TodosList";
import { v4 as uuidv4 } from 'uuid';
import Todo from "./Todo";
import NewTodoInput from "./NewTodoInput";
import { toast } from "react-toastify";

export default function Todos() {
    const [ todos, setTodos ] = useState([]);
    const URL = 'https://6750711369dc1669ec1b2e99.mockapi.io/todos'

// add todo
    const addTodo = async (todoTitle) => {
        try {
            await fetch( URL, {
                method: 'POST',
                headers: { 'content-type' : 'application/json' },
                body: JSON.stringify(
                    {
                        id: uuidv4(),
                        title: todoTitle,
                        status: false
                    }
                )
            })
            .then(async res => {
                if (res.ok) {
                    const data = await res.json();
                    setTodos([...todos, data]);
                }

                // toast('Todo Added :)')
            })
        } catch (e) {
            toast('something went wrong :(')
            console.log(e)
        }
    }

// delete todo
    const deleteTodoHandler = async (id) => {
        try {
            const res = await fetch( `${URL}/${id}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                const deletedTodo = await res.json();

                setTodos(todos.filter(todo => todo.id != deletedTodo.id));
            }

            // toast('todo deleted :)')
        } catch (e) {
            toast('sth wrong :(')
            console.log(e)
        }
    }

// check uncheck
    const changeStatusHandler = async (toggledTodo) => {
        try {
            const res = await fetch( `${URL}/${toggledTodo.id}`, {
                method: 'PUT',
                headers: { 'content-type' : 'application/json' },
                body: JSON.stringify(
                    {
                        status: ! toggledTodo.status
                    }
                )
            });

            if (res.ok) {
                const newToggledTodo = await res.json();

                let newTodos = todos.map(todo => {
                    if (todo.id == newToggledTodo.id) {
                        todo.status = newToggledTodo.status
                    }

                    return todo;
                });

                setTodos(newTodos);

                newTodos.map( todo =>
                    (todo.id == newToggledTodo.id)
                    &&
                    (toast(`status ${todo.status ? 'done' : 'undone'}!`))
                );
            }
        } catch (e) {
            toast('sth wrong :(')
            console.log(e)
        }
    }

// edit todo
    const pressEnterToEditHandler = (todo, editedTodo) => {
        let newTodo = todos.map(item => {
            if (todo.id == item.id) {
                item.title = editedTodo;
            }

            return item;
        });

        setTodos(newTodo);
    }

// fetch from api
    useEffect(() => {
        try {
            fetch( URL, {
                method: 'GET',
                headers: { 'content-type' : 'application/json' },
            })
            .then(async res => {
                if (res.ok) {
                    const data = res.json();
                    data.then(todo => setTodos(todo ?? []))
                }

                // toast('Todos Fetched :)')
            })
        } catch (e) {
            toast('something went wrong :(')
            console.log(e)
        }
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
                <TodosList>
                    {
                        todos.map((item) =>
                            <Todo
                                key={item.id}
                                todo={item}
                                deleteTodoHandler={deleteTodoHandler}
                                changeStatus={changeStatusHandler}
                                pressEnterToEditHandler={pressEnterToEditHandler}
                            />)
                    }
                </TodosList>
            </div>
        </div>
    )
}
