import { useState, useEffect} from 'react';
import ToDoItem from './components/ToDoItem';
import ToDoForm from "./components/ToDoForm.jsx";
// eslint-disable-next-line react/prop-types

const LSKEY = "MyTodoApp";

function ToDoList() {


    const storedTodos = window.localStorage.getItem(LSKEY + ".todos");

    const [todos, setTodos] = useState(storedTodos  ? JSON.parse(storedTodos) : [])
    const [editingId, setEditingId] = useState(null);

    const handleCheck = index => {
        setTodos(todos.map(todo => {
            if (todo.id === index) {
                return {
                    ...todo,
                    checked: !todo.checked
                };
            }
            return todo;
        }));
    };

    const handleDelete = index => {
        const todoIndex = todos.findIndex(todo => todo.id === index);
        const newTodos = [...todos];
        newTodos.splice(todoIndex, 1);
        setTodos(newTodos);
        //setTodos(todos.filter((todo) => todoIndex !== index));

    };

    const handleEdit = (id) => {
        setEditingId(id);
    };

    const handleUpdate = (id, newText) => {
        setTodos(todos.map(todo => todo.id === id ? {...todo, text: newText} : todo));
        setEditingId(null);
    };

    const handleAdd = newTodo => {
        setTodos([...todos, {
            id: new
            Date().getTime(),
            text: newTodo,
            checked: false
        }]);
    }

    useEffect(() => {
        window.localStorage.setItem(LSKEY + ".todos", JSON.stringify(todos));
    }, [todos]);

    return (
        <>
            <ToDoForm handleAdd = {handleAdd} />
            <ul className={"allTodo"}>
                <h2>ToDos</h2>
                {todos.map((todo) => (
                    <ToDoItem
                        key={todo.id}
                        todo={todo}
                        onCheck={() => handleCheck(todo.id)}
                        onDelete={() => handleDelete(todo.id)}
                        onEdit={()=> handleEdit(todo.id)}
                        onUpdate={handleUpdate}
                        editing={todo.id === editingId}
                    />
                ))}
            </ul>
        </>
    );
}

export default ToDoList;