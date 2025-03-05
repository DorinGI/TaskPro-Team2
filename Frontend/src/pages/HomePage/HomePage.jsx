import React from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import ScreensPage from '../../components/ScreensPage';
import styles from './HomePage.module.css';

const HomePage = () => {
  return (
    <div className={styles.page}>
      <Sidebar />
      <div className={styles.mainCont}>
        <Header />
        <ScreensPage />
      </div>
    </div>
  );
};

export default HomePage;
