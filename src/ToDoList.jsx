import { useState } from 'react';

// eslint-disable-next-line react/prop-types
function TodoItem({ todo, onCheck, onDelete, onEdit }) {
  return (
      <li className={"todo"}>
          <input className={"check"} type="checkbox" id={todo.id} name={todo.text} checked={todo.checked} onChange={onCheck}/>
          <p className={todo.checked ? "text checked" : "text"}>{todo.text}</p>
          <button className={"edit"} onClick={onEdit}>
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                  <path
                        d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
              </svg>
          </button>
          <button className={"delete"} onClick={onDelete} disabled={todo.checked}>
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                  <path
                        d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
              </svg>
          </button>
      </li>
  );
}

function TodoList() {
    const initialTodos = [ {
        id: 0,
        text: 'Learn React',
        checked: false
    }];
    const [todos, setTodos] = useState(initialTodos);
    const [newTodo, setNewTodo] = useState('');

    const addTodo = () => {
        if (newTodo.trim() === '') return;

        setTodos([...todos, {id: todos.length, text: newTodo, checked: false}]);
        setNewTodo('');
    };

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

    const deleteTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    //setTodos(todos.filter((todo) => todo.id !== index));
    };

    const editTodo = index => {
      const newTodos = [...todos];
      const newText = prompt("Edit Todo", newTodos[index].text);
      if (newText !== null && newText.trim() !== ''){
        newTodos[index].text = newText;
        setTodos(newTodos);
      }
    };

  return (
    <>
      <div className={"app"}>
        <input
            className={"newTodo"}
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
        />
        <button className={"add"} onClick={addTodo}>Add Todo</button>
      </div>
      <ul className={"allTodo"}>
        <h2>ToDos</h2>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onCheck={() => handleCheck(todo.id)} onDelete={() => deleteTodo(todo.id)} onEdit={()=> editTodo(todo.id)} />
        ))}
      </ul>
    </>
  );
}

export default TodoList;