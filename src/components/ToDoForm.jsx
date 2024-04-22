// eslint-disable-next-line react/prop-types
import {useState} from "react";

export default function ToDoForm({handleAdd}) {

    const [newTodo, setNewTodo] = useState('');

    const handleSubmit = (event) => {

        if (newTodo.trim() === '') return;
        event.preventDefault();
        handleAdd(newTodo);
        setNewTodo('');
    };


    return (
        <form className={"app"} onSubmit={handleSubmit}>
            <input
                className={"newTodo"}
                type="text"
                placeholder="Add a new todo"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
            />
            <button
                className={"add"}
                type="submit">
                Add Todo
            </button>
        </form>
    );
}