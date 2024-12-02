/* eslint-disable react/prop-types */
// import Todo from "./Todo";

export default function TodosList({ children }) {

    return (
        <ul className="list-reset">
            {children}
        </ul>
    )
}
