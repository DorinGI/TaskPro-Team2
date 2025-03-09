// src/components/MainDashboard/MainDashboard.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ColumnTask from '../ColumnTask/ColumnTask.jsx';
import ModalAddColumn from '../ModalAddColumn/ModalAddColumn.jsx';
import { createColumn } from '../../redux/columnSlice.js';
import styles from './MainDashboard.module.css';

const MainDashboard = ({ selectedBoardId }) => {
  const dispatch = useDispatch();
  const columns = useSelector(state => state.columns.columns);
  const [isAddColumnModalOpen, setIsAddColumnModalOpen] = useState(false);

  const filteredColumns = columns.filter(
    column => column.boardId === selectedBoardId
  );

  const handleAddColumn = () => {
    setIsAddColumnModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddColumnModalOpen(false);
  };

  const handleColumnAdded = newColumn => {
    dispatch(createColumn(newColumn));
  };

  return (
    <div className={styles.mainDashboard}>
      <button
        className={styles.addColumnButton}
        onClick={handleAddColumn} // Open the modal when clicked
      >
        Add Column
      </button>

      <div className={styles.columnsContainer}>
        {filteredColumns.map(column => (
          <ColumnTask key={column._id} column={column} />
        ))}
      </div>

      {/* Modal for adding column */}
      <ModalAddColumn
        isOpen={isAddColumnModalOpen}
        onClose={handleCloseModal}
        onColumnAdded={handleColumnAdded}
      />
    </div>
  );
};

export default MainDashboard;
