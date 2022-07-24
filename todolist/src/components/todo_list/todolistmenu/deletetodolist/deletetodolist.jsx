import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { IsOpenContext } from '../../../../contexts/isOpenContext/isOpenContext';
import './style.scss';

function DeleteTodoList({ id }) {

  console.log(id);
  const navigate = useNavigate()
  const { listDelete, setlistDelete } = useContext(IsOpenContext);

  async function jsonTodo(todo) {
    const newTodo = {
      name: todo,
    }
    await fetch('http://localhost/withServer/server/todolist/todolistDel.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTodo)
    });
  }
  function handlerDelete() {
    jsonTodo(id);
    setlistDelete(!listDelete);
    navigate('/todolist');
  }

  return (
    <div>
      <div className='background' onClick={() => setlistDelete(!listDelete)}></div>
      <div className="modal">
        <h2>Do you want to delete this Todo list?</h2>
        <div className='choise'>
          <button onClick={handlerDelete}>Yes</button>
          <button onClick={() => setlistDelete(!listDelete)}>No</button>
        </div>
      </div>

    </div>
  );
}

export default DeleteTodoList;