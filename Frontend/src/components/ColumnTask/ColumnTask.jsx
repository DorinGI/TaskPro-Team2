import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import sprite from '../../assets/sprite.svg';
import styles from './ColumnTask.module.css';
import CardItem from '../Task/CardItem.jsx';
import ModalAddCard from '../ModalAddEditCard/ModalAddEditCard.jsx';
import { deleteColumn } from '../../redux/columnSlice.js';
import { fetchCards, createCard } from '../../redux/cardSlice.js';
import ModalAddColumn from '../ModalAddEditColumn/ModalAddEditColumn.jsx';

const ColumnTask = ({ column }) => {
  const dispatch = useDispatch();
  const [openCardModal, setOpenCardModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const cards =
    useSelector(state => state.cards.cardsByColumn[column._id]) || [];
  const memoizedCards = useMemo(() => cards, [cards]);

  useEffect(() => {
    console.log('Fetching cards for column:', column._id);
    dispatch(fetchCards(column._id));
  }, [dispatch, column._id]);

  const handleDeleteColumn = () => {
    dispatch(deleteColumn(column._id));
  };
  const handleAddCard = cardData => {
    dispatch(createCard({ ...cardData, columnId: column._id }));
    setOpenCardModal(false);
  };
  const handleEditCard = cardId => {
    console.log('Edit card', cardId);
    // Logică pentru editarea cardului
  };

  const handleDeleteCard = cardId => {
    console.log('Delete card', cardId);
    // Logică pentru ștergerea cardului
  };

  const handleOpenColumnsModal = () => {
    console.log('Open columns modal');
    // Logică pentru deschiderea modalului de coloane
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
                className={styles.editButton}
                onClick={() => setOpenEditModal(true)}
              >
                <img
                  src={`${process.env.PUBLIC_URL}/assets/edit.svg`}
                  alt="Edit"
                />
              </button>

              {/* Delete Button */}
              <button
                className={styles.deleteButton}
                onClick={handleDeleteColumn}
              >
                <img
                  src={`${process.env.PUBLIC_URL}/assets/trash-04.svg`}
                  alt="Delete"
                />
              </button>
            </div>
          </div>

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
          className={styles.addCardButton}
          onClick={() => setOpenCardModal(true)}
        >
          <img
            src={`${process.env.PUBLIC_URL}/assets/plus.svg`}
            alt="Add Card"
            className={styles.icon}
          />
          Add Card
        </button>
      </div>

      {/* Modal pentru editarea coloanei */}
      <ModalAddColumn
        isOpen={openEditModal}
        onClose={() => setOpenEditModal(false)}
        columnToEdit={column}
      />
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
