// src/components/MainDashboard/MainDashboard.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ColumnTask from '../ColumnTask/ColumnTask.jsx';
import ModalAddColumn from '../ModalAddEditColumn/ModalAddEditColumn.jsx';
import { fetchColumns, saveColumn } from '../../redux/columnSlice.js';
import styles from './MainDashboard.module.css';

const MainDashboard = () => {
  const dispatch = useDispatch();
  const selectedBoardId = useSelector((state) => state.boards.selectedBoardId);
  const columns = useSelector((state) => state.columns.columns);
  const [isAddColumnModalOpen, setIsAddColumnModalOpen] = useState(false);

  // Fetch columns when the selected board changes
  useEffect(() => {
    if (selectedBoardId) {
      dispatch(fetchColumns(selectedBoardId));
    }
  }, [selectedBoardId, dispatch]);

  // Filter columns by the selected board ID
  const filteredColumns = columns.filter(
    (column) => column.boardId === selectedBoardId
  );

  // Open the modal for adding a new column
  const handleAddColumn = () => {
    setIsAddColumnModalOpen(true);
  };

  // Close the modal
  const handleCloseModal = () => {
    setIsAddColumnModalOpen(false);
  };

  // Handle saving a new column
  const handleColumnAdded = (newColumn) => {
    dispatch(saveColumn({ ...newColumn, boardId: selectedBoardId }));
  };

  return (
    <div className={styles.mainDashboard}>
      {/* Columns Container */}
      <div className={styles.columnsContainer}>
        {/* Render each column */}
        {filteredColumns.map((column) => (
          <ColumnTask key={column._id} column={column} />
        ))}

        {/* Add Column Button */}
        <button className={styles.addColumnButton} onClick={handleAddColumn}>
          <div className={styles.addIconBox}>+</div>
          <span className={styles.addText}>Add another column</span>
        </button>
      </div>

      {/* Modal for Adding a New Column */}
      <ModalAddColumn
        isOpen={isAddColumnModalOpen}
        onClose={handleCloseModal}
        onColumnAdded={handleColumnAdded}
      />
    </div>
  );
};

export default MainDashboard;