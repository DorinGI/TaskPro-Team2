import React from "react";
import { useSelector } from "react-redux";
import styles from "./ScreensPage.module.css";

const ScreensPage = () => {
  const theme = useSelector((state) => state.theme?.theme || "Light");

  return (
    <div className={`${styles.screensPage} ${styles[theme.toLowerCase()]}`}>
      <h1>Project Office</h1>
      <button className={styles.addColumnButton}>+ Add another Column</button>
    </div>
  );
};

export default ScreensPage;
