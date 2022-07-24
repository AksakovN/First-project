import { useContext } from 'react';
import { IsOpenContext } from '../../../contexts/isOpenContext/isOpenContext';
import './style.scss';

function Modal({ todoDataKey, marker }) {

  const { modal, setmodal, todoID, setmodalClose, renderTodo, setrenderTodo, setisEdit } = useContext(IsOpenContext);
  async function jsonTodo(todo, url) {
    const newTodo = {
      id: todo.id,
    }
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTodo)
    });
  }

  function handlerDelete() {
    setmodalClose({
      id: todoID,
      swith: 1,
    });
    if (marker === 'singleTodo') {
      const url = 'http://localhost/withServer/server/todoDel.php';
      jsonTodo(todoDataKey, url);
    } else if (marker === 'listTodo') {
      const url = 'http://localhost/withServer/server/todolist/todolistItems/todolistItemsDel.php';
      jsonTodo(todoDataKey, url);
    }
    setmodal(!modal);
    setrenderTodo(renderTodo + 1);
    setisEdit(0);
  }

  return (
    <div>
      <div className='background' onClick={() => { setmodal(!modal); }}></div>
      <div className="modal">
        <h2>Do you want to delete this Todo?</h2>
        <div className='choise'>
          <button onClick={handlerDelete}>Yes</button>
          <button onClick={() => { setmodal(!modal) }}>No</button>
        </div>
      </div>

    </div>
  );
}

export default Modal;