import { useContext, useEffect, useState } from 'react';
import { IsOpenContext } from '../../../contexts/isOpenContext/isOpenContext';
import Createtodo from '../createtodo/createtodo';
import Todo from '../todocard/todo';
import Todostart from '../todostart/todoempty';
import './style.scss';
import Cookies from 'js-cookie';

function Main() {

  const { isOpen, renderTodo, modalLogin, isLogin } = useContext(IsOpenContext);
  const marker = 'singleTodo';

  const [todoData, settodoData] = useState([]);
  async function jsonTodo() {
    const newTodo = {
      userID: Cookies.get("todoAuth"),
    }
    let response = await fetch('http://localhost/withServer/server/todoGive.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTodo)
    });
    let json = await response.json();
    if (json.length) {
      settodoData(json);
    } else if(json == '') {
      settodoData([]);
    } else {
      settodoData(todoData => [...todoData, json]);
    }
  }

  useEffect(() => {
    settodoData([]);
  }, [isLogin])
  useEffect(() => {
    setTimeout(() => {
      jsonTodo();
    }, 100);
  }, [renderTodo, modalLogin]);
  
  

  return (
    <div className="main">
      <div className='container'>
        {!!todoData && todoData.map((todo) => <Todo key={todo.id} todo={todo} marker={marker} />)}
        <Todostart />
        {isOpen && <Createtodo marker={marker} />}
      </div>
    </div>
  );
}

export default Main;