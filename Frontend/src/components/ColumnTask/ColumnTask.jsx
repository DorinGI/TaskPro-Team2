// src/components/ColumnTask/ColumnTask.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import sprite from '../../assets/sprite.svg';
import styles from './ColumnTask.module.css';
import CardItem from '../Task/CardItem.jsx';
import ModalAddCard from '../ModalAddEditCard/ModalAddEditCard.jsx';
import { deleteColumn } from '../../redux/columnSlice.js';
import { fetchCards, createCard, deleteCard } from '../../redux/cardSlice.js';
import ModalAddColumn from '../ModalAddEditColumn/ModalAddEditColumn.jsx';

const ColumnTask = ({ column }) => {
  const dispatch = useDispatch();
  const [openCardModal, setOpenCardModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [showColumnsDropdown, setShowColumnsDropdown] = useState(false);

  const columns = useSelector((state) => state.columns.columns);
  const cards =
    useSelector((state) => state.cards.cardsByColumn[column._id]) || [];
  const memoizedCards = useMemo(() => cards, [cards]);

  useEffect(() => {
    dispatch(fetchCards(column._id));
  }, [dispatch, column._id]);

  const handleDeleteColumn = () => dispatch(deleteColumn(column._id));

  const handleAddCard = (cardData) => {
    dispatch(createCard({ ...cardData, columnId: column._id }));
    setOpenCardModal(false);
  };

  const handleEditCard = (cardId) => {
    setOpenCardModal(true);
    console.log('Edit card', cardId);
  };

  const handleDeleteCard = (cardId) => {
    dispatch(deleteCard(cardId));
    console.log('Card deleted', cardId);
  };

  const handleOpenColumnsModal = () => {
    setShowColumnsDropdown(!showColumnsDropdown);
  };

  return (
    <div className={styles.wrapper}>
      {/* Column Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>{column.title}</h2>
        <div className={styles.iconWrapper}>
          {/* Edit Button */}
          <button
            className={styles.editButton}
            onClick={() => setOpenEditModal(true)}
          >
            <svg className={styles.boardButtonIcon} aria-hidden="true">
              <use xlinkHref={`${sprite}#icon-pencil`} />
            </svg>
          </button>

          {/* Delete Button */}
          <button
            className={styles.deleteButton}
            onClick={handleDeleteColumn}
          >
            <svg className={styles.boardButtonIcon} aria-hidden="true">
              <use xlinkHref={`${sprite}#icon-trash`} />
            </svg>
          </button>
        </div>
      </div>

      {/* Dropdown for Columns */}
      {showColumnsDropdown && (
        <div className={styles.dropdown}>
          <ul>
            {columns.map((col) => (
              <li key={col._id} onClick={() => console.log('Selected:', col._id)}>
                {col.title}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Task List */}
      <Droppable droppableId={column._id}>
        {(provided) => (
          <ul
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={styles.taskList}
          >
            {memoizedCards.map((card, index) => (
              <CardItem
                key={card._id}
                card={card}
                index={index}
                onEdit={() => handleEditCard(card._id)}
                onDelete={() => handleDeleteCard(card._id)}
                onOpenColumnsModal={handleOpenColumnsModal}
              />
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>

      {/* Add Card Button */}
      <button
        className={styles.addCardButton}
        onClick={() => setOpenCardModal(true)}
      >
        <div className={styles.addCardIconBox}>+</div>
        <span className={styles.addCardText}>Add another card</span>
      </button>

      {/* Modals */}
      <ModalAddColumn
        isOpen={openEditModal}
        onClose={() => setOpenEditModal(false)}
        columnToEdit={column}
      />

      {/* Modal for Adding Cards */}
      <ModalAddCard
        open={openCardModal}
        onClose={() => setOpenCardModal(false)}
        onSave={handleAddCard}
        columnId={column._id}
      />
    </div>
  );
};

export default ColumnTask;