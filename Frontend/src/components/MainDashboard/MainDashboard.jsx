// src/components/MainDashboard/MainDashboard.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ColumnTask from '../ColumnTask/ColumnTask.jsx';
import ModalAddColumn from '../ModalAddColumn/ModalAddColumn.jsx';
import { fetchColumns, createColumn } from '../../redux/columnSlice.js';
import styles from './MainDashboard.module.css';

const MainDashboard = () => {
  const dispatch = useDispatch();
  const selectedBoardId = useSelector(state => state.boards.selectedBoardId);
  const columns = useSelector(state => state.columns.columns);
  const [isAddColumnModalOpen, setIsAddColumnModalOpen] = useState(false);

  useEffect(() => {
    if (selectedBoardId) {
      dispatch(fetchColumns(selectedBoardId));
    }
  }, [selectedBoardId, dispatch]);

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
    dispatch(createColumn({ ...newColumn, boardId: selectedBoardId }));
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
        {columns.map(column => (
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
