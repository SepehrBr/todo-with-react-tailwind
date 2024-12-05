/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import DeleteIcon from "./icons/DeleteIcon";
import EditIcon from "./icons/EditIcon";
import CancelIcon from "./icons/CancelIcon";
import { TodoContext } from "../context/todoContext";
import { toast } from "react-toastify";

export default function Todo({ todo }) {
    const [ toggleEdit, setToggleEdit ] = useState(false);
    const { todosDispatcher } = useContext(TodoContext);

    const URL = 'https://6750711369dc1669ec1b2e99.mockapi.io/todos'

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

            toast.error('todo deleted :)')
        } catch (e) {
            toast.warning('sth wrong :(')
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
    const editHandler = (e) => {
        if (e.key == 'Enter' && todo.title != '') {
            pressEnterToEditHandler(todo, e.target.value);
            setToggleEdit(false);
        }
    }
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

    return (
        <li className="relative flex items-center justify-between px-2 py-6 border-b">
            {
                    toggleEdit
                ?
                    <>
                        <input type="text" className="w-10/12 px-2 py-3 border rounded outline-none border-grey-600" onChange={()=>{}} onKeyUp={editHandler} defaultValue={todo.title} />
                        <button type="button" className="absolute right-0 flex items-center space-x-1">
                            <CancelIcon clickToggleEdit={() => setToggleEdit(false)} />
                        </button>
                    </>
                :
                    <>
                        <div>
                            <input type="checkbox" className="" onChange={() => changeStatusHandler(todo)} checked={ todo.status ? 'checked' : '' } />
                            <p  className={`inline-block mt-1 ml-2 text-gray-600 ${todo.status && 'line-through'}`}>{todo?.title}</p>
                        </div>
                        <button type="button" className="absolute right-0 flex items-center space-x-1">
                            <EditIcon clickToggleEdit={() => setToggleEdit(true)} />
                            <DeleteIcon deleteTodo={deleteTodoHandler} todo={todo} />
                        </button>
                    </>
            }
        </li>
    )
}

/*
<li className="relative flex items-center justify-between px-2 py-6 border-b">
    <div>
        <input type="checkbox" checked className="" />
        <p  className="inline-block mt-1 ml-2 text-gray-600 line-through">Tailwind CSS To DO App List 2</p>
    </div>
    <button type="button" className="absolute right-0 flex items-center  space-x-1">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-red-700" fill="none" viewBox="0 0 24 24"
        stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
    </button>
</li>
*/
