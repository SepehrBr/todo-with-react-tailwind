import { createBrowserRouter } from "react-router-dom";
import About from "./About";
import Root from "./Root";
import Home from "./Home";
import SingleTodo from "./Todos/SingleTodo";
import TodosPage from "./Todos/Index";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/todos',
                element: <TodosPage />
            },
            {
                path: '/todos/:todoId',
                element: <SingleTodo />
            },
            {
                path: '/about',
                element: <About />
            }
        ]
    },
]);

export default router;
