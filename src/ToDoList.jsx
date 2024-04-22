import { useState } from 'react';
import ToDoItem from './components/ToDoItem';
import ToDoForm from "./components/ToDoForm.jsx";
// eslint-disable-next-line react/prop-types

function ToDoList() {
    const initialTodos = [ {
        id: 1,
        text: 'Learn React',
        checked: false
    }];
    const [todos, setTodos] = useState(initialTodos);

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

    const handleEdit = index => {
        const todoIndex = todos.findIndex(todo => todo.id === index);
        const newTodos = [...todos];
        const newText = prompt("Edit Todo", newTodos[todoIndex].text); // /!\ edit check id list not id todo
        if (newText !== null && newText.trim() !== ''){
            newTodos[index].text = newText;
            setTodos(newTodos);
        }
    };

    const handleAdd = (newTodo) => {
        setTodos([...todos, {
            id: new
            Date().getTime(),
            text: newTodo,
            checked: false
        }]);
    }

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
                    />
                ))}
            </ul>
        </>
    );
}

export default ToDoList;