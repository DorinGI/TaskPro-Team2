import React from 'react';
import { useSelector } from 'react-redux';
import styles from './Header.module.css';

const Header = () => {
  const theme = useSelector(state => state.theme.theme);
  const user = { name: 'John Doe', photo: '../assets/welcome-icon.png' };
  return (
    <header className={`${styles.header} ${styles[theme.toLowerCase()]}`}>
      <div className={styles.logo}>TaskPro</div>
      <div className={styles.headerRight}>
        <select className={styles.themeSelector}>
          <option>Light</option>
          <option>Violet</option>
          <option>Dark</option>
        </select>
        <div className={styles.userInfo}>
          <img src={user.photo} alt="User" className={styles.userPhoto} />
          <span>{user.name}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
