import React from 'react';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <h2>My Boards</h2>
      <button className={styles.createBoard}>Create New Board</button>
      <ul>
        <li>Project Office</li>
        <li>Marketing Plan</li>
      </ul>
      <button className={styles.needHelp}>Need Help?</button>
      <button className={styles.logout}>Log Out</button>
    </aside>
  );
};

export default Sidebar;
