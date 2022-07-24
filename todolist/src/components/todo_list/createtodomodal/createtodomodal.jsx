import './style.scss';
import Cookies from 'js-cookie';
import { useContext, useRef } from 'react';
import { IsOpenContext } from '../../../contexts/isOpenContext/isOpenContext';

function Createtodomodal() {

  const { listIsOpen, setlistIsOpen, renderTodo, setrenderTodo } = useContext(IsOpenContext);
  const todoName = useRef(null);
  const todoText = useRef(null);
  const todoPress = useRef(null);
  const todoError = useRef(null);

  async function jsonTodoList(todoName, todoText) {
    const todo = {
      id: new Date().getTime(),
      name: todoName.current.value,
      text: todoText.current.value,
      crDate: new Date().toLocaleDateString(),
      userID: Cookies.get("todoAuth"),
    }
    console.log(JSON.stringify(todo));
    await fetch('http://localhost/withServer/server/todolist/todolistGet.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo)
    });
  }

  function handlerPress() {
    if (todoName.current.value === '') {
      todoError.current.style.display = 'block';
      todoPress.current.style.backgroundColor = 'rgba(252, 78, 78, 0.726)';
      return
    }

    jsonTodoList(todoName, todoText);

    setlistIsOpen(!listIsOpen);
    setTimeout(() => {
      setrenderTodo(renderTodo + 1);
    }, 100);
  }
  function blurPress() {
    if (todoError.current && todoPress.current) {
      todoError.current.style.display = 'none';
      todoPress.current.style.backgroundColor = '';
    }
  }

  return (
    <div className="createTodoModal">
      <div className='background' onClick={() => { setlistIsOpen(!listIsOpen) }}></div>
      <div className='createtodo'>
        <div className='exitCreate' ><button onClick={() => { setlistIsOpen(!listIsOpen) }}>X</button></div>
        <h2>New todo's list name:</h2>
        <input type="text" id='createName' ref={todoName} placeholder='Required' />
        <h2>New todo's list description:</h2>
        <textarea id="createText" ref={todoText}></textarea>
        <div className='createFooter'>
          <div className='createButton'>
            <button className='createPress' ref={todoPress} onBlur={blurPress} onClick={handlerPress}>Create</button>
            <div className='errorMsgCreate' ref={todoError}>Fill required <br /> fields!</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Createtodomodal;