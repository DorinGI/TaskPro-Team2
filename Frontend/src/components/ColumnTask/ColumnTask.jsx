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

  const handleDeleteColumn = () => {
    dispatch(deleteColumn(column._id));
  };

  const handleAddCard = (newCard) => {
    dispatch(createCard(newCard));
    setOpenCardModal(false);
  };

  return (
    <div className={styles.wrapper}>
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