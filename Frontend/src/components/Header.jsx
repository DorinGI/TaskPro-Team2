import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from '../redux/auth/authSlice';
import sprite from '../assets/sprite.svg';
import EditProfileModal from './ModalUser/EditProfileModal';
import styles from './Header.module.css';

const Header = ({ toggleSidebar }) => {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.theme.theme);
  const user = useSelector(state => state.auth.user);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <header className={`${styles.header} ${styles[theme.toLowerCase()]}`}>
      {/* Buton de toggle sidebar */}
      <button onClick={toggleSidebar} className={styles.sidebarToggle}>
        <svg className={styles.boardButtonIcon} aria-hidden="true">
          <use xlinkHref={`${sprite}#icon-menu`} />
        </svg>
      </button>
      <div className={styles.headerRight}>
        <select className={styles.themeSelector}>
          <option>Light</option>
          <option>Violet</option>
          <option>Dark</option>
        </select>
        <div className={styles.userInfo} onClick={() => setIsModalOpen(true)}>
          <img
            src={user?.photo || '/boarder_backgrounds/icon-ballons.png'}
            alt="User"
            className={styles.userPhoto}
          />
          <span>{user?.name || 'Guest'}</span>
        </div>
      </div>

      {/* Afișează modalul dacă este deschis */}
      {isModalOpen && (
        <EditProfileModal closeModal={() => setIsModalOpen(false)} />
      )}
    </header>
  );
};

export default Header;
