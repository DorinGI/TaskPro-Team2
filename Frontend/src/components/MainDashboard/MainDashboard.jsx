import React, { useState } from 'react';
import ColumnTask from '../ColumnTask/ColumnTask.jsx';
import styles from './MainDashboard.module.css'; 

const MainDashboard = () => {
  const [columns, setColumns] = useState([
    { id: 1, title: 'To Do', cards: [] },
    { id: 2, title: 'In Progress', cards: [] },
    { id: 3, title: 'Done', cards: [] },
  ]);

  const addColumn = () => {
    const newColumnId = columns.length + 1;
    setColumns([
      ...columns,
      { id: newColumnId, title: `Column ${newColumnId}`, cards: [] },
    ]);
  };

  return (
    <div className={styles.mainDashboard}>
      {/* Add Column Button */}
      <button className={styles.addColumnButton} onClick={addColumn}>
        <img
          className={styles.plusIcon}
          src={`${process.env.PUBLIC_URL}/assets/plus.svg`}
          alt="Add"
        />
        Add another Column
      </button>

      {/* Column Container */}
      <div className={styles.columnContainer}>
        {columns.map((column) => (
          <ColumnTask key={column.id} item={column} />
        ))}
      </div>
    </div>
  );
};

export default MainDashboard;