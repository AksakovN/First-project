import './style.scss';
import ProfilePageModal from './profilePageModal/profilePageModal';
import { useContext, useEffect, useRef } from 'react';
import { IsOpenContext } from '../../../contexts/isOpenContext/isOpenContext';
import { useNavigate } from 'react-router-dom';


function ProfilePage() {

  const profImage = useRef(null);
  const {avatar, modalAvatar, setmodalAvatar, isLogin} = useContext(IsOpenContext);
  const navigate = useNavigate();

  function onClickHandlerForChangeAvatar() {
    setmodalAvatar(true);
  }

  useEffect(() => {
    if (typeof avatar !== "number") {
      profImage.current.style.backgroundImage = `url(${avatar})`;
    }
  }, [avatar, modalAvatar]);
  useEffect(() => {
    if (isLogin == false) {
      navigate("/");
    }
  }, [isLogin])
  
  
  return (
    <div className='profilePage'>
      <div className='profileBody'>
        <div className="imgPart">
          <div className='profImage' ref={profImage}>
          </div>
          <button onClick={onClickHandlerForChangeAvatar}>Change avatar</button>
        </div>
        <div className='textPart'>
          prof info
          prof email change
        </div>
      </div>
      {modalAvatar && <ProfilePageModal />}
    </div>
  );
}

export default ProfilePage;