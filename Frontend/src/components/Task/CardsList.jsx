// src/components/Task/Task.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './CardsList.module.css';
import { fetchCards, deleteCard } from '../../redux/cardSlice.js'; // Fixed path

const CardsList = ({ columnId }) => {
  const dispatch = useDispatch();
  const cards = useSelector(state => state.cards.cardsByColumn[columnId] || []);

  useEffect(() => {
    dispatch(fetchCards(columnId));
  }, [dispatch, columnId]);

  const handleDeleteCard = () => {
    dispatch(deleteCard(card._id));
  };

  return (
    // <li className={styles.listItem}>
    //   <div className={styles.taskContent}>
    //     <h3 className={styles.title}>{card.title}</h3>
    //   </div>

    //   <div className={styles.actions}>
    //     <button onClick={handleDeleteCard}>
    //       <img
    //         src={`${process.env.PUBLIC_URL}/assets/trash-04.svg`}
    //         alt="Delete"
    //         className={styles.icon}
    //       />
    //     </button>
    //   </div>
    // </li>
    <div className={styles.cardList}>
      {cards.map(card => (
        <div key={card._id} className={styles.cardCard}>
          <p>{card.title}</p>
          <button onClick={handleDeleteCard}>
            <img
              src={`${process.env.PUBLIC_URL}/assets/trash-04.svg`}
              alt="Delete"
              className={styles.icon}
            />
          </button>
        </div>
      ))}
    </div>
  );
};

export default CardsList;
