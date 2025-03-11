import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  const [selectedColumn, setSelectedColumn] = useState(null);

  const columns = useSelector(state => state.columns.columns);
  const cards =
    useSelector(state => state.cards.cardsByColumn[column._id]) || [];
  const memoizedCards = useMemo(() => cards, [cards]);

  useEffect(() => {
    dispatch(fetchCards(column._id));
  }, [dispatch, column._id]);

  const handleDeleteColumn = () => dispatch(deleteColumn(column._id));

  const handleAddCard = cardData => {
    dispatch(createCard({ ...cardData, columnId: column._id }));
    setOpenCardModal(false);
  };
  const handleEditCard = cardId => {
    setOpenCardModal(true);
    console.log('Edit card', cardId);
    // Logică pentru editarea cardului (poate fi un set de date pentru modal)
  };

  const handleDeleteCard = cardId => {
    dispatch(deleteCard(cardId));
    console.log('Card deleted', cardId);
  };

  const handleOpenColumnsModal = () => {
    setShowColumnsDropdown(!showColumnsDropdown);
  };

  const handleSelectColumn = columnId => {
    setSelectedColumn(columnId);
    setShowColumnsDropdown(false);
    console.log('Selected column:', columnId);
  };
  console.log('Cards in column:', column._id, cards);

  return (
    <div className={styles.wrapper}>
      <div className={styles.contentWrapper}>
        <div className={styles.content}>
          <div className={styles.header}>
            <h2 className={styles.title}>{column.title}</h2>
            <div className={styles.iconWrapper}>
              {/* Edit Button */}
              <button
                className={styles.icon}
                onClick={() => setOpenEditModal(true)}
              >
                <img
                  src={`${process.env.PUBLIC_URL}/public/svg/edit-04.svg`}
                  alt="Edit"
                />
              </button>

              {/* Delete Button */}
              <button className={styles.icon} onClick={handleDeleteColumn}>
                <img
                  src={`${process.env.PUBLIC_URL}/public/svg/delete-04.svg`}
                  alt="Delete"
                />
              </button>
            </div>
          </div>

          {/* Dropdown pentru coloane */}
          {showColumnsDropdown && (
            <div className={styles.dropdown}>
              <ul>
                {columns.map(col => (
                  <li key={col._id} onClick={() => handleSelectColumn(col._id)}>
                    {col.title}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Task List */}
          <ul className={styles.taskList}>
            {memoizedCards.length > 0 ? (
              memoizedCards.map(card => (
                <CardItem
                  key={card._id}
                  card={card}
                  onEdit={() => handleEditCard(card._id)}
                  onDelete={() => handleDeleteCard(card._id)}
                  onOpenColumnsModal={handleOpenColumnsModal}
                />
              ))
            ) : (
              <p>No cards available</p>
            )}
          </ul>
        </div>

        {/* Add Card Button */}
        <button
          className={`${styles.button} ${styles.buttonPlus}`}
          onClick={() => setOpenCardModal(true)}
        >
          <img
            src={`${process.env.PUBLIC_URL}/public/svg/plus.svg`}
            alt="Add Card"
            className={styles.plusIcon}
          />
          <span>Add Card</span>
        </button>
      </div>

      {/* Modals */}
      <ModalAddColumn
        isOpen={openEditModal}
        onClose={() => setOpenEditModal(false)}
        columnToEdit={column}
      />

      {/* Modal pentru adăugarea cardurilor */}
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
