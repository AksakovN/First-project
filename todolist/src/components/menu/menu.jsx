import "./menu.scss";
import { Link, useNavigate } from "react-router-dom";
import search from '../image/search.png'
import { useContext, useEffect, useRef, useState } from "react";
import { IsOpenContext } from "../../contexts/isOpenContext/isOpenContext";
import Cookies from 'js-cookie';
import LoginWindow from "../autentification/loginWindow/loginWindow";

function Menu() {

    const [searchValue, setsearchValue] = useState('');
    const { setisEdit, setsearchOpen, setsearchResult, modalLogin, setmodalLogin, isLogin, setisLogin, avatar, setavatar, modalAvatar } = useContext(IsOpenContext);
    const navigate = useNavigate();
    const searchText = useRef(null);
    const menu = useRef(null);
    const profile = useRef(null);
    const [menuToggle, setmenuToggle] = useState(false);
    const [avatarData, setavatarData] = useState('');
    const [fix, setfix] = useState(false);

    function allClose() {
        setisEdit(0);
        setsearchOpen(false);
    }
    function seacrhRedirect() {
        if (searchValue === '') {
            return
        }
        searchText.current.value = "";
        setsearchResult(searchValue);
        navigate('/search');
    }
    function handlerKey1(event) {
        if (event.key === "Enter") {
            seacrhRedirect();
        }
    }

    function getLogin() {
        setmodalLogin(true);
    }
    function unsetLogin() {
        Cookies.remove('todoAuth');
        setisLogin(false);
    }
    function menuDown() {
        setmenuToggle(!menuToggle);
        menu.current.style.top = "0";
    }
    async function jsonGetAvatar() {
        const newTodo = {
            userID: Cookies.get("todoAuth"),
        }

        let response = await fetch('http://localhost/withServer/server/users/usersAvatar/usersAvatarGive.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTodo)
        });
        let json = await response.json();
        if (json == '') {
            return;
        }
        setavatarData(json);
    }
    useEffect(() => {
        if (Cookies.get("todoAuth")) {
            setisLogin(true);
        } else {
            setisLogin(false);
        }
        if (menuToggle == false) {
            menu.current.style.top = "-200px";
        }
    }, [modalLogin, isLogin, menuToggle])
    useEffect(() => {  
        if (isLogin == false) {
            profile.current.style.width = "0";
            profile.current.style.height = "0";         
            setfix(false);
            setavatarData('');
          }
        if (Cookies.get("todoAuth")) {
            setfix(true);
            if (avatarData == '') {          
                profile.current.style.width = "40px";
                profile.current.style.height = "40px";       
                jsonGetAvatar();
            } else if(avatarData == 'error2') {
                profile.current.style.backgroundImage = 'src(/image/user.png)';
            } else {
                jsonGetAvatar();            
                profile.current.style.backgroundImage = `url(${avatarData})`;
                setavatar(avatarData);
            }
        }
    }, [avatar, avatarData, isLogin, modalLogin, modalAvatar, fix]);   
    

    return (
        <nav className="menu">
            <div className="menuSpace">
                <div className="menuToggle"><input type="checkbox" id="toggleCheckbox" onClick={menuDown} />
                    <label className="toggleCheckbox" htmlFor="toggleCheckbox"><span></span></label>
                </div>
                <div className="menuRoute" ref={menu}>
                    <ul>
                        <li>
                            <Link to='/' onClick={allClose}>
                                All todo
                            </Link>
                        </li>
                        <li>
                            <Link to='/todolist' onClick={allClose}>
                                Todo's list
                            </Link>
                        </li>
                        <li>
                            <Link to='/search' onClick={allClose}>
                                Search todo
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="menuSearch">
                    <input type="text" ref={searchText} onChange={(event) => { setsearchValue(event.target.value.trim()) }} onKeyDown={handlerKey1} />
                    <div className="inputButton">
                        <img src={search} alt="search" onClick={seacrhRedirect} />
                    </div>
                </div>
                <div className="auth">
                    <Link to='/profile' className="profile" ref={profile}></Link>
                    <a onClick={isLogin == true ? unsetLogin : getLogin}>{isLogin == true ? "Logout" : "Login"}</a>
                    {modalLogin == true ? <LoginWindow /> : ""}

                </div>
            </div>


        </nav>
    );
}

export default Menu;