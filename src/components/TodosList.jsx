import { useContext } from "react"
import { TodoContext } from "../context/todoContext"
import Todo from "./Todo";

export default function TodosList() {
const { todos } = useContext(TodoContext);

    return (
        <ul className="list-reset">
            {
                todos.map(todo => <Todo key={todo.id} todo={todo} />)
            }
        </ul>
    )
}
