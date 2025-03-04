import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Header from './components/Header.jsx'; 
import Sidebar from './components/Sidebar.jsx'; 
import ScreensPage from './components/ScreenPage/ScreenPage.jsx'; 
import styles from './App.module.css';

function App() {
  return (
    <Router>
      <div className={styles.app}>
        <Header />
        <div className={styles.mainContainer}>
          <Sidebar />
          <Routes>
            <Route path="/home" element={<ScreensPage />} />
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;