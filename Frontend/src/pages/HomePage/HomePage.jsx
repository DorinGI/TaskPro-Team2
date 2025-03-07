import React from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import styles from './HomePage.module.css';
import ScreenPage from '../../components/ScreenPage/ScreenPage'; // Imported as ScreenPage

const HomePage = () => {
  return (
    <div className={styles.page}>
      <Sidebar />
      <div className={styles.mainCont}>
        <Header />
        {/* Use ScreenPage (singular) instead of ScreensPage */}
        <ScreenPage />
      </div>
    </div>
  );
};

export default HomePage;