import { useContext, useEffect, useState } from 'react';
import { IsOpenContext } from '../../contexts/isOpenContext/isOpenContext';
import Todo from '../todoMain/todocard/todo';
import Cookies from 'js-cookie';
import './style.scss';
import LoginWindow from '../autentification/loginWindow/loginWindow';

function Search() {

  const [searchValue, setsearchValue] = useState('');
  const [searchRes, setsearchRes] = useState(false);
  const [searchDate, setsearchDate] = useState('');
  const { searchOpen, setsearchOpen, searchResult, setsearchResult, isLogin, modalLogin, setmodalLogin } = useContext(IsOpenContext);

  const [todoData, settodoData] = useState([]);

  async function jsonTodo(searchResult) {
    const newTodo = {
      word: searchResult,
      userID: Cookies.get("todoAuth"),
    }
    let response = await fetch('http://localhost/withServer/server/todoSearchFilter.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTodo)
    });
    let json = await response.json();
    if (json == "err") {
      setsearchRes(true);
      setsearchOpen(false);
      settodoData([]);
      return;
    } else if (json.length) {
      settodoData(json);
    } else if (json == '') {
      setsearchRes(true);
    }else {
      settodoData(todoData => [...todoData, json]);
    }
    setsearchRes(false);
    setsearchResult(null);
    setsearchOpen(true);
  }

  function loginCheck() {
    if (isLogin == false) {
      setmodalLogin(true);
    }
  }
  function handlerKey() {
    loginCheck();
    if (searchDate) {
      jsonTodo(searchDate);
    } else if (searchValue) {
      jsonTodo(searchValue);
    }
    return;
  }
  function handlerKey1(event) {
    loginCheck();
    if (searchValue === '') {
      return
    }
    if (event.key === "Enter") {
      jsonTodo(searchValue);
    }
  }

  useEffect(() => {
    if (searchResult) {
      jsonTodo(searchResult);
      setsearchOpen(true);
    }
  }, [todoData]);
  useEffect(() => { 
    setsearchRes(false);
  }, [])
  useEffect(() => {

  }, [isLogin, modalLogin])
  


  return (
    <div className="main">
      <div className="box">
        <div className='boxText'>
          <h3>Search by todo's name:</h3>
          <input type="text" onChange={(event) => { setsearchValue(event.target.value.trim()) }} onKeyDown={handlerKey1} placeholder='Press Enter to search...' />
        </div>
        <div className='boxDate'>
          <h3>Search by todo's date:</h3>
          <input type="date" onBlur={(event) => { setsearchDate(event.target.valueAsDate.toLocaleDateString()) }} />
        </div>
        <button onClick={handlerKey}>Search!</button>
      </div>
      <div className='searchBody'>
        {searchRes && <div className='searchError'>0 mathes found!</div>}
        {searchOpen && todoData.map((todo) => <Todo key={todo.id} todo={todo} />)}
        {modalLogin && <LoginWindow />}
      </div>
    </div>
  );
}

export default Search;