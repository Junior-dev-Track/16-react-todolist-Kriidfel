import { useState, useEffect} from 'react';
import ToDoItem from './components/ToDoItem';
import ToDoForm from "./components/ToDoForm.jsx";
import DeleteAllButton from "./components/DeleteAllButton.jsx";

// eslint-disable-next-line react/prop-types

const LSKEY = "MyTodoApp";

function ToDoList() {


    const storedTodos = window.localStorage.getItem(LSKEY + ".todos");

    const [todos, setTodos] = useState(storedTodos  ? JSON.parse(storedTodos) : [])
    const [editingId, setEditingId] = useState(null);
    const [allChecked, setAllChecked] = useState(false);

    const handleCheck = index => {
        setTodos(prevTodos => {
            const newTodos = prevTodos.map(todo => {
                if (todo.id === index) {
                    return {
                        ...todo,
                        checked: !todo.checked
                    };
                }
                return todo;
            });

            // Check if all todos are checked
            const allChecked = newTodos.every(todo => todo.checked);
            setAllChecked(allChecked);

            return newTodos;
        });
    };

    const handleCheckAll = () => {
        if (todos.length === 0) return;
        setTodos(todos.map(todo => ({...todo, checked: !allChecked})));
        setAllChecked(!allChecked);
    };

    const handleDelete = index => {
    if (index === undefined) {
        setTodos(todos.filter(todo => !todo.checked));
        if (todos.every(todo => todo.checked)) {
            setAllChecked(false);
        }
    } else {
        const todoIndex = todos.findIndex(todo => todo.id === index);
        const newTodos = [...todos];
        newTodos.splice(todoIndex, 1);
        setTodos(newTodos);
        if (newTodos.length === 0) {
            setAllChecked(false);
        }
    }
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

    function countUnCHeck() {
        const count=  todos.filter(todo => !todo.checked).length;
        return count.toString().padStart(2, '0');
    }

    return (
        <>
            <ToDoForm handleAdd = {handleAdd} />
            <ul className={"allTodo"}>

                <div className={"header"}>
                    <div className={"header-all"}>
                        <div className={"header-check"}>
                            <input type="checkbox" className={"checkAll"} id="checkAll" name="checkAll"  checked={allChecked}
                                   onChange={handleCheckAll}/>
                            <label>All</label>
                        </div>
                        <div className={"header-delete"}>
                            <DeleteAllButton onDelete={() => handleDelete()} todo={todos.map((todo) => todo)} />
                        </div>
                    </div>
                    <div className={"header-title"}>
                        <h2>ToDos</h2>
                    </div>
                    <div className={"header-counter"}>
                        <p className={"count"}>{countUnCHeck()} / {todos.length.toString().padStart(2, '0')}</p>
                    </div>
                </div>

                {todos.map((todo) => (
                    <>
                        <ToDoItem
                            key={todo.id}
                            todo={todo}
                            onCheck={() => handleCheck(todo.id)}
                            onDelete={() => handleDelete(todo.id)}
                            onEdit={()=> handleEdit(todo.id)}
                            onUpdate={handleUpdate}
                            editing={todo.id === editingId}
                        />
                    </>
                ))}
            </ul>
        </>
    );
}

export default ToDoList;