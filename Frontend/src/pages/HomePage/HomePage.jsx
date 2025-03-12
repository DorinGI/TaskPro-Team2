import React, { useState } from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import styles from './HomePage.module.css';
import ScreenPage from '../../components/ScreenPage/ScreenPage'; // Imported as ScreenPage

const HomePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(prevState => !prevState);
  };
  return (
    <div className={styles.page}>
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={styles.mainCont}>
        <Header toggleSidebar={toggleSidebar} />
        <ScreenPage />
      </div>
    </div>
  );
};

export default HomePage;
