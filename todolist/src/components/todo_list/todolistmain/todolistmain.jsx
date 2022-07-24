import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IsOpenContext } from '../../../contexts/isOpenContext/isOpenContext';
import Createtodo from '../../todoMain/createtodo/createtodo';
import Todo from '../../todoMain/todocard/todo';
import Todostart from '../../todoMain/todostart/todoempty';
import Todolistmenu from '../todolistmenu/todolistmenu';
import Cookies from 'js-cookie';
import './style.scss';

function Todolistmain() {

  const { id } = useParams();
  const { isOpen, renderTodo, isLogin } = useContext(IsOpenContext);
  const marker = 'listTodo';
  const [todoData, settodoData] = useState([]);
  const [renderData, setRenderData] = useState([]);
  const navigate = useNavigate();

  async function jsonTodo() {
    const newTodo = {
      userID: Cookies.get("todoAuth"),
    }
    let response = await fetch('http://localhost/withServer/server/todolist/todolistItems/todolistItemsGive.php', {
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
    }else {
      settodoData(todoData => [...todoData, json]);
    }
  }

  useEffect(() => {
    if (isLogin == false) {
      navigate("/todolist");
    } 
  }, [isLogin])
  useEffect(() => {
    setTimeout(() => {
      jsonTodo();
    }, 100);
  }, [renderTodo]);
  useEffect(() => {
    let filter = todoData.filter(todo => todo.delID == id);
    setRenderData(filter);
  }, [todoData])

  return (
    <div className="main">
      <Todolistmenu id={id} />
      <div className='container'>
        {!!renderData && renderData.map((todo) => <Todo key={todo.id} todo={todo} marker={marker} />)}
        <Todostart />
        {isOpen && <Createtodo marker={marker} id={id} />}
      </div>
    </div>
  );
}

export default Todolistmain;