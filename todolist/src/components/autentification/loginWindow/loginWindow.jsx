import { useContext, useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie';
import './style.scss';
import { IsOpenContext } from '../../../contexts/isOpenContext/isOpenContext';

function LoginWindow() {

    const { setmodalLogin, setisLogin } = useContext(IsOpenContext);

    const username = useRef(null);
    const password = useRef(null);
    const email = useRef(null);
    const reppassword = useRef(null);
    const regMargin = useRef(null);
    const error = useRef(null);
    const userExist = useRef(null);
    const incorrectUser = useRef(null);
    const incorrectPassword = useRef(null);

    const [isReg, setIsReg] = useState(false);
    const [inpClass, setinpClass] = useState('loginModalInput');
    const [errorMsg, seterrorMsg] = useState(false);
    const [isExist, setisExist] = useState(false);
    const [incUser, setincUser] = useState(false);
    const [incPass, setincPass] = useState(false);
    const [loginData, setloginData] = useState('');

    function closeModal() {
        setmodalLogin(false);
    }
    function setRegister() {
        setIsReg(true);
    }

    async function jsonTodo(newTodo, url) {
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTodo)
        });
        let json = await response.json();
        if (json) {
            setloginData(json);
        }
    }

    function sendData() {
        const user = username.current;
        const pass = password.current;
        if (user.value.trim() == "" || pass.value.trim() == "") {
            if (user.value.trim() == "") {
                user.style.boxShadow = "0 0 8px 3px red";
            } else {
                pass.style.boxShadow = "0 0 8px 3px red";
            }
            error.current.style.display = "block";
            return;
        }
        if (isReg == false) {
            const newTodo = {
                username: user.value,
                password: pass.value,
            }
            const url = 'http://localhost/withServer/server/users/usersLogin.php';
            jsonTodo(newTodo, url);
        } else {
            if (password.current.value == reppassword.current.value && email.current.value.trim() !== "") {
                const newTodo = {
                    username: username.current.value,
                    email: email.current.value,
                    password: password.current.value,
                }
                const url = 'http://localhost/withServer/server/users/usersRegister.php';
                jsonTodo(newTodo, url);
            } else {
                seterrorMsg(true);
                password.current.value = "";
                reppassword.current.value = "";
                error.current.style.display = "block";
            }

        }
    }
    function errorBlur() {
        if ( error.current && userExist.current && incorrectUser.current && incorrectPassword.current
            && password.current && username.current) {
                error.current.style.display = "none";
                userExist.current.style.display = "none";
                incorrectUser.current.style.display = "none";
                incorrectPassword.current.style.display = "none";
                password.current.style.boxShadow = "none";
                username.current.style.boxShadow = "none";
        }
        seterrorMsg(false);
        setisExist(false);
        setincUser(false);
        setincPass(false);
    }

    useEffect(() => {
        if (isReg == true) {
            setinpClass('loginModalInput regModalInput');
            regMargin.current.style.marginBottom = "20px";
        }
    }, [isReg])
    useEffect(() => {
        if (loginData == "Er1") { // user already taken
            setisExist(true);
            userExist.current.style.display = "block";
            setloginData('');
        } else if (loginData == "Er2") { // user doesn't exist
            setincUser(true);
            incorrectUser.current.style.display = "block";
            username.current.style.boxShadow = "0 0 8px 3px red";
            setloginData('');
        } else if (loginData == "Er3") { // invalid password
            setincPass(true);
            incorrectPassword.current.style.display = "block";
            password.current.style.boxShadow = "0 0 8px 3px red";
            setloginData('');
        } else if (loginData !== '') {
            const expDate = new Date(new Date().getTime() + 30 * 60 * 1000);
            Cookies.set("todoAuth", loginData, { expires: expDate });
            setloginData('');
            setmodalLogin(false);
            setisLogin(true);
        }
    }, [loginData])

    return (
        <div className='loginModal'>
            <div className='background'></div>
            <div className='loginModal'>
                <div className='exitCreate' onClick={closeModal}><button>X</button></div>
                <h2 ref={regMargin}>{isReg == true ? "Register" : "Login"}</h2>
                <div className={inpClass}>
                    <h2>Username:</h2>
                    <input type="text" ref={username} placeholder='Required' />
                </div>
                {isReg && <div className={inpClass}>
                    <h2>Email:</h2>
                    <input type="email" ref={email} placeholder='Required' />
                </div>}
                <div className={inpClass}>
                    <h2>Password:</h2>
                    <input type="password" ref={password} placeholder='Required' />
                </div>
                {isReg && <div className={inpClass}>
                    <h2>Repeat password:</h2>
                    <input type="password" ref={reppassword} placeholder='Required' />
                </div>}
                <div className='loginModalFooter'>
                    {isReg == false ? <div className='loginRegister'>
                        Don't have an account?
                        <a onClick={setRegister}>Register now!</a>
                    </div> : ""}
                    <div className="loginB">
                        <button onClick={sendData} onBlur={errorBlur}>{isReg == true ? "Register" : "Login"}</button>
                        <div className='errorMsgCreate' ref={error} >{errorMsg == true ? "Passwords dosen't match!" : "Fill required fields!"}</div>
                        <div className='errorMsgCreate' ref={userExist}>{isExist == true ? "User already exist!" : ""}</div>
                        <div className='errorMsgCreate' ref={incorrectUser}>{incUser == true ? "User doesn't exist!" : ""}</div>
                        <div className='errorMsgCreate' ref={incorrectPassword}>{incPass == true ? "Invalid password!" : ""}</div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default LoginWindow;
