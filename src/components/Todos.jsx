import { useState } from "react";
import TodosList from "./TodosList";
import { v4 as uuidv4 } from 'uuid';
import Todo from "./Todo";
import NewTodoInput from "./NewTodoInput";

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

// add todo
    const addTodo = (todoTitle) => {
        setTodos([
            ...todos,
            {
                id: uuidv4(),
                title: todoTitle,
                status: false
            }
        ]);
    }


// delete todo
    const deleteTodoHandler = (id) => {
        setTodos(todos.filter(todo => todo.id != id));
    }

// check uncheck
    const changeStatusHandler = (id) => {
        let toggleStatus = todos.map(todo => {
            if (todo.id == id) {
                todo.status = !todo.status;
            }

            return todo;
        });

        setTodos(toggleStatus);
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

    return (
        <div className="bg-gray-100">
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
        </div>
    )
}
