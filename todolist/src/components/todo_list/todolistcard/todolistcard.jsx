import { useNavigate } from 'react-router-dom';
import './style.scss';

function Todolistcard({ todo }) {

    const navigate = useNavigate();

    return (
        <div className='todoList' onClick={() => { navigate(`/todolist/${todo.name}`) }}>
            <div className='listName'>{todo.name}</div>
            <div className='listDate'>
                <div>
                    <div className='dateName'>Creation date:</div>
                    <div>{todo.crDate}</div>
                </div>
            </div>
        </div>
    );
}

export default Todolistcard;