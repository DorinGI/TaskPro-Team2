import React from 'react';
import { useSelector } from 'react-redux';
import MainDashboard from '../MainDashboard/MainDashboard.jsx';
import styles from './ScreenPage.module.css';

const ScreenPage = () => {
  const theme = useSelector((state) => state.theme?.theme || 'Light');

  return (
    <div className={`${styles.screenPage} ${styles[theme.toLowerCase()]}`}>
      <h1 className={styles.title}>Project Office</h1>
      <MainDashboard />
    </div>
  );
};

export default ScreenPage;