import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './ColumnTask.module.css';
import CardItem from '../Task/CardItem';
import ModalAddCard from '../ModalAddEditCard/ModalAddEditCard';
import { deleteColumn } from '../../redux/columnSlice';
import { fetchCards, createCard } from '../../redux/cardSlice';
import ModalAddColumn from '../ModalAddEditColumn/ModalAddEditColumn';

const ColumnTask = ({ column }) => {
  const dispatch = useDispatch();
  const [openCardModal, setOpenCardModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const cards = useSelector(state => state.cards.cardsByColumn[column._id]) || [];
  const memoizedCards = useMemo(() => cards, [cards]);

  useEffect(() => {
    dispatch(fetchCards(column._id));
  }, [dispatch, column._id]);

  const handleDeleteColumn = () => dispatch(deleteColumn(column._id));

  const handleAddCard = (cardData) => {
    dispatch(createCard({ ...cardData, columnId: column._id }));
    setOpenCardModal(false);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.contentWrapper}>
        <div className={styles.content}>
          <div className={styles.header}>
            <h2 className={styles.title}>{column.title}</h2>
            <div className={styles.iconWrapper}>
              {/* Edit Button */}
              <button className={styles.icon} onClick={() => setOpenEditModal(true)}>
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

          {/* Task List */}
          <ul className={styles.taskList}>
            {memoizedCards.length > 0 ? (
              memoizedCards.map((card) => (
                <CardItem
                  key={card._id}
                  card={card}
                  onEdit={() => console.log('Edit card', card._id)}
                  onDelete={() => console.log('Delete card', card._id)}
                  onOpenColumnsModal={() => console.log('Open columns modal')}
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