import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx";
import ScreensPage from "./components/ScreenPage/ScreenPage.jsx";

import PrivateRoute from "./components/PrivateRoute";
import RestrictedRoute from "./components/RestrictedRoute";
import HomePage from "./pages/HomePage/HomePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
import styles from "./App.module.css";

function App() {
  return (
    <Router>
      <div className={styles.app}>
        <Routes>
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/auth/:id"
            element={
              <RestrictedRoute>
                <AuthPage />
              </RestrictedRoute>
            }
          />
          <Route
            path="/welcome"
            element={
              <RestrictedRoute>
                <WelcomePage />
              </RestrictedRoute>
            }
          />
          <Route
            path="/home/:boardId"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          ></Route>
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </Router>
  );
}

export default App;
