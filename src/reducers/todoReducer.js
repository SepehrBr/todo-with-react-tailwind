/* eslint-disable no-case-declarations */
/* eslint-disable no-unsafe-optional-chaining */
export default function todoReducer(todos, action) {
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
}
