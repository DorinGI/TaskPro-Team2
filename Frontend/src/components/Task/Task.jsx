// src/components/Task/Task.jsx
import React from 'react';
import { useDispatch } from 'react-redux';
import styles from './Task.module.css';
import { deleteCard } from '../../redux/cardSlice.js'; // Fixed path

const Task = ({ card, column }) => {
  const dispatch = useDispatch();

  const handleDeleteCard = () => {
    dispatch(deleteCard(card._id));
  };

  return (
    <li className={styles.listItem}>
      <div className={styles.taskContent}>
        <h3 className={styles.title}>{card.title}</h3>
      </div>

      <div className={styles.actions}>
        <button onClick={handleDeleteCard}>
          <img
            src={`${process.env.PUBLIC_URL}/assets/trash-04.svg`}
            alt="Delete"
            className={styles.icon}
          />
        </button>
      </div>
    </li>
  );
};

export default Task;