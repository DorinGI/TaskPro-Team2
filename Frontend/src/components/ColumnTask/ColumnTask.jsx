import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import sprite from '../../assets/sprite.svg';
import styles from './ColumnTask.module.css';
import Task from '../Task/Task.jsx';
import ModalAddCard from '../Modals/ModalAddCard.jsx'; // Fixed path
import { deleteColumn } from '../../redux/columnSlice.js'; // Fixed path
import { createCard } from '../../redux/cardSlice.js'; // Fixed path

const ColumnTask = ({ column }) => {
  const dispatch = useDispatch();
  const [openCardModal, setOpenCardModal] = useState(false);
<<<<<<< Updated upstream

  const handleDeleteColumn = () => {
    dispatch(deleteColumn(column._id));
  };

  const handleAddCard = (newCard) => {
    dispatch(createCard(newCard));
=======
  const [openEditModal, setOpenEditModal] = useState(false);

  const cards = useSelector(state => state.cards.cardsByColumn[column._id]) || [];
  const memoizedCards = useMemo(() => cards, [cards]);

  useEffect(() => {
    dispatch(fetchCards(column._id));
  }, [dispatch, column._id]);

  const handleDeleteColumn = () => dispatch(deleteColumn(column._id));

  const handleAddCard = cardData => {
    dispatch(createCard({ ...cardData, columnId: column._id }));
>>>>>>> Stashed changes
    setOpenCardModal(false);
  };

  return (
    <div className={styles.wrapper}>
<<<<<<< Updated upstream
      <div className={styles.header}>
        <h2 className={styles.title}>{column.title}</h2>
        <button className={styles.deleteButton} onClick={handleDeleteColumn}>
          <img
            src={`${process.env.PUBLIC_URL}/assets/trash-04.svg`}
            alt="Delete"
            className={styles.icon}
          />
        </button>
      </div>

      <ul className={styles.taskList}>
        {column.cards?.map((card) => (
          <Task key={card._id} card={card} column={column} />
        ))}
      </ul>

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

=======
      <div className={styles.contentWrapper}>
        <div className={styles.content}>
          <div className={styles.header}>
            <h2 className={styles.title}>{column.title}</h2>
            <div className={styles.iconWrapper}>
              {/* Edit Button */}
              <button className={styles.icon} onClick={() => setOpenEditModal(true)}>
                <img src={`${process.env.PUBLIC_URL}/public/svg/edit-04.svg`} alt="Edit" />
              </button>

              {/* Delete Button */}
              <button className={styles.icon} onClick={handleDeleteColumn}>
                <img src={`${process.env.PUBLIC_URL}/public/svg/delete-04.svg`} alt="Delete" />
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
        <button className={`${styles.button} ${styles.buttonPlus}`} onClick={() => setOpenCardModal(true)}>
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
>>>>>>> Stashed changes
      <ModalAddCard
        open={openCardModal}
        onClose={() => setOpenCardModal(false)}
        columnId={column._id}
        onSave={handleAddCard}
      />
    </div>
  );
};

export default ColumnTask;