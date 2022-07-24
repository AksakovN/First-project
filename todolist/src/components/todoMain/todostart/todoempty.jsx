import './style.scss';
import img from '../../image/plus.png'
import { IsOpenContext } from '../../../contexts/isOpenContext/isOpenContext';
import { useContext } from 'react';
import Cookies from 'js-cookie';
import LoginWindow from '../../autentification/loginWindow/loginWindow';

function Todostart() {

  const { isOpen, setisOpen, modalLogin, setmodalLogin } = useContext(IsOpenContext);

  function modalOpen() {
    if (Cookies.get("todoAuth")) {
      setisOpen(!isOpen);
    } else {
      setmodalLogin(true);
    }
  }
  return (
    <div className="todostart">
      <img src={img} alt="add" onClick={modalOpen} />
      {modalLogin == true ? <LoginWindow /> : ""}
    </div>
  );
}

export default Todostart;