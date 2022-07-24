import { useContext, useEffect, useState } from 'react';
import { IsOpenContext } from '../../contexts/isOpenContext/isOpenContext';
import Createtodolist from './createtodolist/createtodolist';
import Createtodomodal from './createtodomodal/createtodomodal';
import './style.scss';
import Todolistcard from './todolistcard/todolistcard';
import Cookies from 'js-cookie';

function Todolist() {

  const { listIsOpen, renderTodo, setTodoListArr, listDelete, modalLogin, isLogin } = useContext(IsOpenContext);
  const [todoData, settodoData] = useState([]);

  async function jsonTodo() {
    const newTodo = {
      userID: Cookies.get("todoAuth"),
    }
    let response = await fetch('http://localhost/withServer/server/todolist/todolistGive.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTodo),
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
  }, [renderTodo, listDelete, modalLogin]);
  useEffect(() => {
    setTodoListArr(todoData);
  }, [todoData]);
  
  

  return (
    <div className="main">
      <div className="wrapper">
        {!!todoData && todoData.map((todo) => <Todolistcard key={todo.id} todo={todo} />)}
        <Createtodolist />
        {listIsOpen && <Createtodomodal />}
      </div>

    </div>
  );
}

export default Todolist;