// src/components/MainDashboard/MainDashboard.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ColumnTask from '../ColumnTask/ColumnTask.jsx';
import { createColumn } from '../../redux/columnSlice.js'; // Fixed path
import styles from './MainDashboard.module.css';

const MainDashboard = () => {
  const dispatch = useDispatch();
  const columns = useSelector(state => state.columns.columns); // Ensure state is correct

  const handleAddColumn = () => {
    const newColumnData = {
      title: 'New Column',
      boardId: 'current-board-id', // Replace with actual logic
    };
    dispatch(createColumn(newColumnData));
  };

  return (
    <div className={styles.mainDashboard}>
      <button 
        className={styles.addColumnButton} 
        onClick={handleAddColumn}
      >
        Add Column
      </button>

      <div className={styles.columnsContainer}>
        {columns.map((column) => (
          <ColumnTask key={column._id} column={column} />
        ))}
      </div>
    </div>
  );
};

export default MainDashboard;