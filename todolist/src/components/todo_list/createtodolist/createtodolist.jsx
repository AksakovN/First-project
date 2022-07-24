import './style.scss';
import img from '../../image/plus.png'
import { useContext, useEffect } from 'react';
import { IsOpenContext } from '../../../contexts/isOpenContext/isOpenContext';
import LoginWindow from '../../autentification/loginWindow/loginWindow';

function Createtodolist() {

    const { listIsOpen, setlistIsOpen, isLogin, modalLogin, setmodalLogin } = useContext(IsOpenContext);

    useEffect(() => {
        if (isLogin == true) {
            setmodalLogin(false);
        }
    }, [isLogin, modalLogin])

    return (
        <div className="createTodoList">
            <img src={img} alt="add" onClick={() => { if (isLogin == false) {setmodalLogin(true);} else {setlistIsOpen(!listIsOpen);} }} />
            {modalLogin && <LoginWindow />}
        </div>
    );
}

export default Createtodolist;