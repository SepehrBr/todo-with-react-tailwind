/* eslint-disable no-case-declarations */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-unreachable */
/* eslint-disable no-constant-binary-expression */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useReducer } from "react";
import TodosList from "./TodosList";
import { v4 as uuidv4 } from 'uuid';
import Todo from "./Todo";
import NewTodoInput from "./NewTodoInput";
import { toast } from "react-toastify";

export default function Todos() {
    const [ todos, todosDispatcher ] = useReducer((todos, action) => {
        switch (action?.type) {
            case 'fetch_all':
                return [
                    ...todos,
                    ...action?.todos
                ]

            case 'add':
                return [
                    ...todos,
                    {
                        id: action?.id,
                        title: action?.title,
                        status: false
                    }
                ]

            case 'delete':
                let fliteredTodos = todos.filter(todo => todo.id != action?.todo.id);

                return [
                    ...fliteredTodos,
                ]

            case 'toggle':
                let toggledTodos = todos.map(todo => {
                        if (todo.id == action?.todo.id) {
                            todo.status = action?.todo.status
                        }

                        return todo;
                    });
                return [
                    ...toggledTodos,
                ]

            case 'edit':
                let editedTodos = todos.map(todo => {
                        if (todo.id == action?.todo.id) {
                            todo.title = action?.todo.title
                        }

                        return todo
                    });

                return [
                    ...editedTodos
                ];


            default:
                return todos;
        }
    }, []);
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

            toast('Todo Added :)')
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
                todosDispatcher(
                    {
                        type: 'delete',
                        todo: deletedTodo
                    }
                );
            }

            toast('todo deleted :)')
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

                todosDispatcher(
                    {
                        type: 'toggle',
                        todo: newToggledTodo
                    }
                );

                toast(`status ${newToggledTodo.status ? 'done' : 'undone'}!`);
            }
        } catch (e) {
            toast('sth wrong :(')
            console.log(e)
        }
    }

// edit todo
    const pressEnterToEditHandler = async (todo, editedTodoTitle) => {
        try {
            const res = await fetch( `${URL}/${todo.id}`, {
                method: 'PUT',
                headers: { 'content-type' : 'application/json' },
                body: JSON.stringify(
                    {
                        title: editedTodoTitle
                    }
                )
            });

            if (res.ok) {
                const newEditedTodo = await res.json();
                todosDispatcher(
                    {
                        type: 'edit',
                        todo: newEditedTodo
                    }
                )
            }

            toast('todo edited!');
        } catch (e) {
            toast('sth wrong :(')
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
