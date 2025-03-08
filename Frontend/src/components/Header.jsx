import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from '../redux/auth/authSlice';
import { ModalUser } from '../components/ModalUser/ModalUser';
import styles from './Header.module.css';

const Header = () => {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.theme.theme);
  const user = useSelector(state => state.auth.user);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <header className={`${styles.header} ${styles[theme.toLowerCase()]}`}>
      <div className={styles.headerRight}>
        <select className={styles.themeSelector}>
          <option>Light</option>
          <option>Violet</option>
          <option>Dark</option>
        </select>
        <div className={styles.userInfo} onClick={() => setIsModalOpen(true)}>
          <img
            src={user?.photo || '../assets/welcome-icon.png'}
            alt="User"
            className={styles.userPhoto}
          />
          <span>{user?.name || 'Guest'}</span>
        </div>
      </div>

      {/* Afișează modalul dacă este deschis */}
      {isModalOpen && (
        <ModalUser onClose={() => setIsModalOpen(false)}>
          <h2>{user?.name}</h2>
          <p>Email: {user?.email}</p>
          <button onClick={() => setIsModalOpen(false)}>Close</button>
        </ModalUser>
      )}
    </header>
  );
};

export default Header;
