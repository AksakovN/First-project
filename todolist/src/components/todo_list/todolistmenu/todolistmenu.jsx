import './style.scss';
import pen from '../../image/pen.png';
import del from '../../image/delete.png';
import { useContext, useRef, useState } from 'react';
import DeleteTodoList from './deletetodolist/deletetodolist';
import { IsOpenContext } from '../../../contexts/isOpenContext/isOpenContext';
import Cookies from 'js-cookie';

function Todolistmenu({ id }) {

    const { todoListArr } = useContext(IsOpenContext);

    let newTodoItem = todoListArr.find(item => item.name == id);
    const [nameChange, setnameChange] = useState(newTodoItem.name);
    const [textChange, settextChange] = useState(newTodoItem.text);
    const { listDelete, setlistDelete } = useContext(IsOpenContext);
    const todoName = useRef(null);
    const todoText = useRef(null);
    const todoMenuButton = useRef(null);
    const todoMenuDel = useRef(null);

    function startEdit() {
        todoName.current.readOnly = false;
        todoName.current.style.textAlign = 'start';
        todoName.current.focus();
        todoText.current.readOnly = false;
        todoMenuButton.current.style.display = 'block';
        todoMenuDel.current.style.display = 'none';
    }

    async function jsonTodo(newTodoItem, todoName, todoText) {
        const newTodo = {
            id: newTodoItem.id,
            name: todoName.current.value,
            text: todoText.current.value,
            crDate: newTodoItem.crDate,
            userID: Cookies.get("todoAuth"),
        }
        await fetch('http://localhost/withServer/server/todolist/todolistChange.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTodo)
        });
    }
    function endEdit() {
        if (todoName.current.value == '') {
            return
        }
        todoName.current.readOnly = true;
        todoName.current.style.textAlign = 'center';
        todoText.current.readOnly = true;
        todoMenuButton.current.style.display = 'none';
        todoMenuDel.current.style.display = 'block';

        jsonTodo(newTodoItem, todoName, todoText);
    }

    return (
        <div className='todoListMenu'>
            <div className='todoListMenuItem'>
                <h3>Todo's list name:</h3>
                <input type="text" className='listMenuName' ref={todoName} value={nameChange} name='listName' placeholder='Required' readOnly onChange={(event) => { setnameChange(event.value) }} />
                <h3>Was created: {newTodoItem.crDate}</h3>
            </div>
            <div className='todoListMenuItem'>
                <h3>Todo's list description:</h3>
                <textarea name='listText' className='listMenuText' ref={todoText} value={textChange} readOnly onChange={(event) => { settextChange(event.value) }}></textarea>
            </div>
            <div className='todoListMenuItem imgItem'>
                <div>
                    <img src={pen} alt="change" onClick={startEdit} />
                </div>
                <div>
                    <button className='listMenuButton' ref={todoMenuButton} onClick={endEdit}>Done!</button>
                    <img src={del} className='listMenuDel' ref={todoMenuDel} alt='delete' onClick={() => setlistDelete(!listDelete)} />
                </div>
            </div>
            {listDelete && <DeleteTodoList id={id} />}
        </div>

    );
}

export default Todolistmenu;