import {useEffect, useRef, useState} from "react";
import DeleteButton from './DeleteButton';

// eslint-disable-next-line react/prop-types
export default function ToDoItem({ todo, onCheck, onDelete, onEdit, onUpdate, editing }) {

    const [editText, setEditText] = useState(todo.text);
    const inputRef = useRef(null);

    useEffect(() => {
        if (editing) {
            inputRef.current.focus();
        }
    }, [editing]);

    const handleSubmit = (e) => {
        if (editText.trim() === '') return onUpdate(todo.id, todo.text);
        e.preventDefault();
        onUpdate(todo.id, editText);
    };


    return (
        <li className={"todo"}>
            <input className={"check"} type="checkbox" id={todo.id} name={todo.text} checked={todo.checked} onChange={onCheck}/>
            {(editing) ? (
                <>
                    <form className={"editForm"} onSubmit={handleSubmit}>
                        <input className={"editTodo"}
                               type="text"
                               value={editText}
                               onChange={(e) => setEditText(e.target.value)}
                               onBlur={handleSubmit}
                               ref={inputRef}
                        />
                        <button className={"validate"} type="submit">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                                <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
                            </svg>
                        </button>
                    </form>


                </>
            ) : (
                <>
                    <p className={todo.checked ? "text checked" : "text"} onClick={() => !todo.checked && onEdit(todo.id)}>{todo.text}</p>

                    <button className={"edit"} onClick={onEdit} disabled={todo.checked}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                            <path
                                d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
                        </svg>
                    </button>
                    <DeleteButton onDelete={onDelete} todo={todo} />
                </>
            )}

        </li>
    )
}
