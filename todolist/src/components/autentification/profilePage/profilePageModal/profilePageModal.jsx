import './style.scss';
import { useContext, useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie';
import { IsOpenContext } from '../../../../contexts/isOpenContext/isOpenContext';

function ProfilePageModal() {

  const { avatar, setavatar, setmodalAvatar } = useContext(IsOpenContext);
  const form = useRef(null);
  const butt = useRef(null);
  const [isReady, setisReady] = useState(false);
  async function jsonSetAvatar(file) {
    const newTodo = {
      userID: Cookies.get("todoAuth"),
    }
    let formData = new FormData;
    formData.append("avatar", file);
    await fetch('http://localhost/withServer/server/users/usersAvatar/usersAvatarSet.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTodo)
    });
    await fetch('http://localhost/withServer/server/users/usersAvatar/usersAvatarGet.php', {
      method: 'POST',
      body: formData,
    });
  }

  function onClickHandlerForSubmit() {
    if (form.current.files[0]) {
      console.log(form.current.files[0]);
      const file =  form.current.files[0];
      jsonSetAvatar(file);  
      setisReady(false);  
      setTimeout(() => {
        setmodalAvatar(false);
        setavatar(avatar + 1);
      }, 200);
      
    }
  }
  function onClickHandlerForExitCreate() {
    setisReady(false);
    setmodalAvatar(false);
  }

  useEffect(() => {
    if (isReady == true) {
      butt.current.style.backgroundColor = "rgba(5, 185, 5, 0.705)";
    }
  }, [isReady])
  



  return (
    <div className='profilePageModal'>
      <div className='background'></div>
      <form className='profilePageModal'>
        <div className='exitCreate'><button onClick={onClickHandlerForExitCreate}>X</button></div>
        <div className='profilePageBody'>
          <input type="file" ref={form} onChange={() => {setisReady(true)}} id="fileInput" />
          <label className='button' htmlFor="fileInput">Choose avatar</label>
        </div>
        <input type="button" ref={butt} onClick={onClickHandlerForSubmit} value="Submit" />
      </form>
    </div>
  );
}

export default ProfilePageModal;