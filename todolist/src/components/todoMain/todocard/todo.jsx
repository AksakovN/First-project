import './style.scss';
import pen from '../../image/pen.png'
import del from '../../image/delete.png'
import { useContext, useRef, useState } from 'react';
import Modal from '../modalforclose/modalforclose';
import { IsOpenContext } from '../../../contexts/isOpenContext/isOpenContext';
import Cookies from 'js-cookie';

function Todo({ todo, marker }) {

    const todoDataKey = todo;
    const [toDate, settoDate] = useState('');
    const { modal, setmodal, settodoID, isEdit, setisEdit } = useContext(IsOpenContext);
    const [nameChange, setnameChange] = useState(todo.name);
    const [textChange, settextChange] = useState(todo.text);
    const [dateChange, setdateChange] = useState(todo.date);

    const todoName = useRef(null);
    const todoText = useRef(null);
    const todoApply = useRef(null);
    const todoDel = useRef(null);
    const todoLastDate = useRef(null);
    const todoDateChange = useRef(null);
    const todoToDate = useRef(null);
    const todoErrorMsg = useRef(null);
    const todoTodo = useRef(null);


    function startEdit() {
        if (isEdit === 1) {
            return
        }
        setisEdit(1);
        todoName.current.readOnly = false;
        todoName.current.style.textAlign = 'start';
        todoName.current.focus();
        todoText.current.readOnly = false;
        todoApply.current.style.display = 'flex';
        todoDel.current.style.display = 'block';
        todoLastDate.current.style.display = 'none';
        todoDateChange.current.style.display = 'block';
        todoToDate.current.style.display = 'none';
    }

    async function jsonTodo(todo, todoName, todoText, url) {
        const newTodo = {
            id: todo.id,
            name: todoName.current.value,
            text: todoText.current.value,
            date: toDate,
            crDate: new Date().toLocaleDateString(),
            delID: todo.delID,
            userID: Cookies.get("todoAuth"),
        }
        console.log(JSON.stringify(todo));
        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTodo)
        });
    }

    function endEdit() {
        setisEdit(0);
        if (todoName.current.value === '' || todoText.current.value === '') {
            todoErrorMsg.current.style.display = 'block';
            return
        }
        todoName.current.readOnly = true;
        todoName.current.style.textAlign = 'center';
        todoText.current.readOnly = true;

        if (todo.delID == 'todos') {
            const url = 'http://localhost/withServer/server/todoChange.php';
            jsonTodo(todo, todoName, todoText, url);
        } else {
            const url = 'http://localhost/withServer/server/todolist/todolistItems/todolistItemsChange.php';
            jsonTodo(todo, todoName, todoText, url);
        }

        todoApply.current.style.display = 'none';
        todoDel.current.style.display = 'none';
        todoLastDate.current.style.display = 'block';
        todoDateChange.current.style.display = 'none';
        todoToDate.current.style.display = 'block';
    }

    function blurEndEdit() {
        todoErrorMsg.current.style.display = 'none';
    }
    function openModal() {
        setmodal(!modal);
        settodoID(todo.id);
    }

    function textareaChangeOnInput(event) {
        event.target.style.height = "50px";
        event.target.style.height = event.target.scrollHeight + "px";
    }
    function textareaChangeOnClick(event) {
        event.target.style.height = "50px";
        event.target.style.height = event.target.scrollHeight + "px";
    }

    return (
        <div>
            <form className={`todo todo${todo.id} `} ref={todoTodo}>
                <div className='todoName'>
                    <input type="text" name='todo' value={nameChange} ref={todoName} onChange={(event) => { setnameChange(event.value) }} className={`name name${todo.id}`} readOnly required placeholder='Required' />
                    <div><img src={pen} alt="pen" onClick={() => startEdit(todo.id)} /></div>
                </div>
                <textarea className={`text text${todo.id}`} ref={todoText} name='todo' value={textChange} onChange={(event) => { settextChange(event.value) }} readOnly required placeholder='Required'
                    onInput={(event) => {
                        textareaChangeOnInput(event);
                    }}
                    onClick={(event) => {
                        textareaChangeOnClick(event);
                    }}
                    onBlur={(event) => {
                        event.target.style.height = '50px';
                    }}
                ></textarea>
                <div className='dateHolder'>
                    <div className='to'>
                        <div className={`toDate toDate${todo.id}`} ref={todoToDate}>
                            {!!dateChange && <div className={`toDateText toDateText${todo.id}`}>Todo to:</div>}{dateChange}</div>
                        <div className={`toDateChange toDateChange${todo.id}`} ref={todoDateChange}>
                            <input type="date" onChange={(event) => { setdateChange(event.target.valueAsDate.toLocaleDateString()) }}
                                onBlur={(event) => {
                                    settoDate(event.target.valueAsDate.toLocaleDateString());
                                }} />
                        </div>
                    </div>
                    <div className='from'>
                        <img src={del} className={`del del${todo.id}`} ref={todoDel} alt="delete" onClick={openModal} />
                        <div className={`lastDate lastDate${todo.id}`} ref={todoLastDate}><div className={`toDateText toDateText${todo.id}`}>Creation:</div>
                            {todo.crDate}</div>
                    </div>
                </div>
                <div className={`apply apply${todo.id}`} ref={todoApply}>
                    <input name='todo' onClick={() => endEdit(todo.id)} onBlur={blurEndEdit} type="button" value="Done!" />
                    <div className={`errorMsg errorMsg${todo.id}`} ref={todoErrorMsg}>Fill required <br /> fields!</div>
                </div>
            </form>
            {modal && <Modal todoDataKey={todoDataKey} marker={marker} />}
        </div>
    );
}

export default Todo;