import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import sprite from '../../assets/sprite.svg';
import styles from './ColumnTask.module.css';
import CardsList from '../Task/CardsList.jsx';
import ModalAddCard from '../Modals/ModalAddEditCard.jsx';
import { deleteColumn } from '../../redux/columnSlice.js';
import { createCard } from '../../redux/cardSlice.js';

const ColumnTask = ({ column }) => {
  const dispatch = useDispatch();
  const [openCardModal, setOpenCardModal] = useState(false);

  const handleDeleteColumn = () => {
    dispatch(deleteColumn(column._id));
  };
  const handleAddCard = cardData => {
    dispatch(createCard({ ...cardData, columnId: column._id }));
    setOpenCardModal(false);
  };
  const filteredColumn =
    column.cards && column.cards.filter(card => card.priority === 'show all');

  const columnLength = column.cards?.length || 0;
  // const filteredColumnLength = filteredColumn?.length || 0;

  // const condition = columnLength;

  return (
    <div className={styles.wrapper}>
      <div className={styles.contentWrapper}>
        <div className={styles.content}>
          <div className={styles.header}>
            <h2 className={styles.title}>{column.title}</h2>
            <div className={styles.iconWrapper}>
              {/* Delete Button */}
              <button
                className={styles.deleteButton}
                onClick={handleDeleteColumn}
              >
                <img
                  className={styles.deleteIcon}
                  src={`${process.env.PUBLIC_URL}/assets/trash-04.svg`}
                  alt="Delete"
                />
              </button>
            </div>
          </div>

          {/* Task List */}
          <ul className={styles.taskList}>
            {column.cards?.map(card => (
              <CardsList key={card._id} card={card} column={column} />
            ))}
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
