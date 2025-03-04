import React from 'react';
import { useSelector } from 'react-redux';
import MainDashboard from '../MainDashboard/MainDashboard.jsx'; // Corrected import path
import styles from './ScreenPage.module.css'; // Ensure this file exists

const ScreensPage = () => {
  const theme = useSelector((state) => state.theme?.theme || 'Light');

  return (
    <div className={`${styles.screensPage} ${styles[theme.toLowerCase()]}`}>
      <h1>Project Office</h1>
      <MainDashboard /> {/* Render MainDashboard */}
    </div>
  );
};

export default ScreensPage;