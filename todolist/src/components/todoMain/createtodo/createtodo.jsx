import { useContext, useRef, useState } from 'react';
import { IsOpenContext } from '../../../contexts/isOpenContext/isOpenContext';
import Cookies from 'js-cookie';
import './style.scss';

function Createtodo({ marker, id }) {

  const [toDate, settoDate] = useState('');
  const { isOpen, setisOpen, renderTodo, setrenderTodo } = useContext(IsOpenContext);

  const todoName = useRef(null);
  const todoText = useRef(null);
  const todoError = useRef(null);
  const todoCreate = useRef(null);

  async function jsonTodo(todoId, todoName, todoText, url) {
    const todo = {
      id: new Date().getTime(),
      name: todoName.current.value,
      text: todoText.current.value,
      date: toDate,
      crDate: new Date().toLocaleDateString(),
      delID: todoId,
      userID: Cookies.get("todoAuth"),
    }
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo)
    });
  }

  function handlerPress() {
    if (todoName.current.value === '' || todoText.current.value === '') {
      todoError.current.style.display = 'block';
      todoCreate.current.style.backgroundColor = 'rgba(252, 78, 78, 0.726)';
      return
    }
    if (marker === 'singleTodo') {
      const todoId = 'todos';
      const url = 'http://localhost/withServer/server/todoGet.php';
      jsonTodo(todoId, todoName, todoText, url);
    } else if (marker === 'listTodo') {
      const todoId = id;
      const url = 'http://localhost/withServer/server/todolist/todolistItems/todolistItemsGet.php';
      jsonTodo(todoId, todoName, todoText, url);
    }

    setisOpen(!isOpen);
    setrenderTodo(renderTodo + 1);
  }
  function blurPress() {
    if (todoError.current && todoCreate.current) {
      todoError.current.style.display = 'none';
      todoCreate.current.style.backgroundColor = '';
    }
  }

  return (
    <div className="">
      <div className='background' onClick={() => { setisOpen(!isOpen) }}></div>
      <div className='createtodo'>
        <div className='exitCreate' ><button onClick={() => { setisOpen(!isOpen) }}>X</button></div>
        <h2>Todo's name:</h2>
        <input type="text" id='createName' ref={todoName} placeholder='Required' />
        <h2>What todo?</h2>
        <textarea id="createText" ref={todoText} placeholder='Required'></textarea>
        <div className='createFooter'>
          <div className='dateObs'>
            <h3>Date todo</h3>
            <input type="date" id='createDate'
              onBlur={(event) => {
                settoDate(event.target.valueAsDate.toLocaleDateString());
              }} />
          </div>
          <div className='createButton'>
            <button className='createB' ref={todoCreate} onBlur={blurPress} onClick={handlerPress}>Create</button>
            <div className='errorMsgCreate' ref={todoError}>Fill required <br /> fields!</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Createtodo;