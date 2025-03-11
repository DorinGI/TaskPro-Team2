import React from 'react';
import sprite from '../../assets/sprite.svg';
import styles from './CardItem.module.css';

const CardItem = ({ card, onEdit, onDelete, onOpenColumnsModal }) => {
  const formatDate = dateString => {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  return (
    <div className={styles.cardWrapper}>
      {/* Title */}
      <h2 className={styles.cardTitle}>{card.title}</h2>

      {/* Description */}
      <p className={styles.cardDescription}>{card.description}</p>

      {/* Priority și Deadline */}
      <div className={styles.cardInfo}>
        <div className={styles.priorityDeadlineWrapper}>
          {/* Priority */}
          <div className={styles.cardPriorityWrapper}>
            <span className={styles.priorityText}>Priority</span>
            <div
              className={styles.priorityCircle}
              style={{ backgroundColor: card.priorityColor }}
            ></div>
            <span className={styles.cardPriority}>{card.priority}</span>
          </div>

          {/* Deadline */}
          <div className={styles.cardDeadlineWrapper}>
            <span className={styles.deadlineText}>Deadline</span>
            <span className={styles.cardDeadline}>
              {formatDate(card.deadline)}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className={styles.cardActions}>
          <button onClick={onOpenColumnsModal} className={styles.editButton}>
            <svg className={styles.boardButtonIcon} aria-hidden="true">
              <use xlinkHref={`${sprite}#icon-arrow-circle-broken-right`} />
            </svg>
          </button>
          <button onClick={onEdit} className={styles.editButton}>
            <svg className={styles.boardButtonIcon} aria-hidden="true">
              <use xlinkHref={`${sprite}#icon-pencil`} />
            </svg>
          </button>
          <button onClick={onDelete} className={styles.editButton}>
            <svg className={styles.boardButtonIcon} aria-hidden="true">
              <use xlinkHref={`${sprite}#icon-trash`} />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardItem;
