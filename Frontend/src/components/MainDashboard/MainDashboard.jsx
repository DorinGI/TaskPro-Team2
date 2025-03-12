// src/components/MainDashboard/MainDashboard.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext } from '@hello-pangea/dnd';
import ColumnTask from '../ColumnTask/ColumnTask.jsx';
import ModalAddColumn from '../ModalAddEditColumn/ModalAddEditColumn.jsx';
import { fetchColumns, saveColumn, reorderCards, moveCard } from '../../redux/columnSlice.js';
import { createCard, deleteCard } from '../../redux/cardSlice.js';
import styles from './MainDashboard.module.css';

const MainDashboard = () => {
  const dispatch = useDispatch();
  const selectedBoardId = useSelector((state) => state.boards.selectedBoardId);
  const columns = useSelector((state) => state.columns.columns);
  const cardsByColumn = useSelector((state) => state.cards.cardsByColumn);
  const [isAddColumnModalOpen, setIsAddColumnModalOpen] = useState(false);

  useEffect(() => {
    if (selectedBoardId) {
      dispatch(fetchColumns(selectedBoardId));
    }
  }, [selectedBoardId, dispatch]);

  // Handle drag-and-drop events
  const onDragEnd = (result) => {
    const { source, destination } = result;

    // Dropped outside the droppable area
    if (!destination) return;

    // Same column reordering
    if (source.droppableId === destination.droppableId) {
      dispatch(
        reorderCards({
          columnId: source.droppableId,
          startIndex: source.index,
          endIndex: destination.index,
        })
      );
    } else {
      // Moving between columns
      dispatch(
        moveCard({
          sourceColumnId: source.droppableId,
          destColumnId: destination.droppableId,
          sourceIndex: source.index,
          destIndex: destination.index,
        })
      );

      // Sync cardsByColumn state
      const sourceCards = [...cardsByColumn[source.droppableId]];
      const destCards = [...(cardsByColumn[destination.droppableId] || [])];
      const [movedCard] = sourceCards.splice(source.index, 1);
      destCards.splice(destination.index, 0, movedCard);

      dispatch(createCard({ ...movedCard, columnId: destination.droppableId }));
      dispatch(deleteCard(movedCard._id));
    }
  };

  const handleAddColumn = () => {
    setIsAddColumnModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddColumnModalOpen(false);
  };

  const handleColumnAdded = (newColumn) => {
    dispatch(saveColumn({ ...newColumn, boardId: selectedBoardId }));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={styles.mainDashboard}>
        <div className={styles.columnsContainer}>
          {columns.map((column) => (
            <ColumnTask key={column._id} column={column} />
          ))}

          {/* Add Column Button */}
          <button className={styles.addColumnButton} onClick={handleAddColumn}>
            <div className={styles.addIconBox}>+</div>
            <span className={styles.addText}>Add another column</span>
          </button>
        </div>

        {/* Modal for Adding a New Column */}
        {isAddColumnModalOpen && (
          <ModalAddColumn
            isOpen={isAddColumnModalOpen}
            onClose={handleCloseModal}
            onColumnAdded={handleColumnAdded}
          />
        )}
      </div>
    </DragDropContext>
  );
};

export default MainDashboard;