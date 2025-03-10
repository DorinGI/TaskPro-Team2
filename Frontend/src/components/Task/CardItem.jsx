import React from 'react';
import styles from './CardItem.module.css';

const CardItem = ({ card, onEdit, onDelete, onOpenColumnsModal }) => {
  return (
    <li className={styles.listItem}>
      {/* Title */}
      <h3 className={styles.title}>{card.title}</h3>

      {/* Description */}
      <p className={styles.textHidden}>{card.description}</p>

      {/* Divider */}
      <div className={styles.span} />

      {/* Footer */}
      <div className={styles.wrap}>
        {/* Left Side (Priority/Deadline) */}
        <div className={styles.infoContainer}>
          <div className={styles.subText}>
            <span className={styles.subTitle}>Priority:</span> 
            <span className={styles.value}>{card.priority}</span>
          </div>
          <div className={styles.subText}>
            <span className={styles.subTitle}>Deadline:</span> 
            <span className={styles.value}>{card.deadline}</span>
          </div>
        </div>

        {/* Right Side (Icons) */}
        <div className={styles.icons}>
          <img
            src={`${process.env.PUBLIC_URL}/assets/columns.svg`}
            alt="Move"
            className={`${styles.arrowIcon} ${styles.icon}`}
            onClick={onOpenColumnsModal}
          />
          <img
            src={`${process.env.PUBLIC_URL}/assets/edit.svg`}
            alt="Edit"
            className={`${styles.pensilIcon} ${styles.icon}`}
            onClick={onEdit}
          />
          <img
            src={`${process.env.PUBLIC_URL}/assets/trash-04.svg`}
            alt="Delete"
            className={`${styles.trashIcon} ${styles.icon}`}
            onClick={onDelete}
          />
        </div>
      </div>
    </li>
  );
};

export default CardItem;