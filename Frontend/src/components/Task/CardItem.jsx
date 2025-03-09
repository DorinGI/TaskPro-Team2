import React from 'react';
import styles from './CardItem.module.css'; // Să presupunem că ai un fișier CSS separat pentru carduri

const CardItem = ({ card, onEdit, onDelete, onOpenColumnsModal }) => {
  return (
    <div className={styles.cardWrapper}>
      {/* Title */}
      <h2 className={styles.cardTitle}>{card.title}</h2>

      {/* Description */}
      <p className={styles.cardDescription}>{card.description}</p>

      {/* Priority și Deadline */}
      <div className={styles.cardInfo}>
        <span className={styles.cardPriority}>{card.priority}</span>
        <span className={styles.cardDeadline}>{card.deadline}</span>
      </div>

      {/* Action Buttons */}
      <div className={styles.cardActions}>
        <button onClick={onOpenColumnsModal} className={styles.cardButton}>
          <img
            src={`${process.env.PUBLIC_URL}/assets/columns.svg`}
            alt="Columns"
            className={styles.cardIcon}
          />
        </button>
        <button onClick={onEdit} className={styles.cardButton}>
          <img
            src={`${process.env.PUBLIC_URL}/assets/edit.svg`}
            alt="Edit"
            className={styles.cardIcon}
          />
        </button>
        <button onClick={onDelete} className={styles.cardButton}>
          <img
            src={`${process.env.PUBLIC_URL}/assets/trash-04.svg`}
            alt="Delete"
            className={styles.cardIcon}
          />
        </button>
      </div>
    </div>
  );
};

export default CardItem;
