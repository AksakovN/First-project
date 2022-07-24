import './App.scss';
import Menu from './components/menu/menu';
import { Routes, Route } from "react-router-dom";
import Main from './components/todoMain/all_window/main';
import Search from './components/search_window/search';
import Todolist from './components/todo_list/todolist';
import Todolistmain from './components/todo_list/todolistmain/todolistmain';
import ProfilePage from './components/autentification/profilePage/profilePage';

function App() {

  return (
    <div className="App">
      <Menu />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/todolist' element={<Todolist />} />
        <Route path='/todolist/:id' element={<Todolistmain />} />
        <Route path='/search' element={<Search />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='*' element={<div>Page not found</div>} />
      </Routes>
    </div>
  );
}

export default App;
