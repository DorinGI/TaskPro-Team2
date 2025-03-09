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

  const filteredColumn =
    item.cards && item.cards.filter((card) => card.priority === "show all");

  const columnLength = item.cards?.length || 0;
  const filteredColumnLength = filteredColumn?.length || 0;

  const condition = columnLength;

  return (
    <div className={styles.wrapper}>
      <div className={styles.contentWrapper}>
        <div className={styles.content}>
          <div className={styles.header}>
            <h2 className={styles.title}>{item.title}</h2>
            <div className={styles.iconWrapper}>
              {/* Edit Button */}
              <button
                className={styles.editButton}
                onClick={handleOpenColumnModal}
              >
                <img
                  className={styles.editIcon}
                  src={`${process.env.PUBLIC_URL}/assets/pencil-01.svg`}
                  alt="Edit"
                />
              </button>

              {/* Delete Button */}
              <button
                className={styles.deleteButton}
                onClick={() => dispatch(deleteColumn(item._id))}
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
            {item.cards?.map((card) => (
              <Card key={card._id} item={card} columnName={item.title} />
            ))}
          </ul>
        </div>

        {/* Add Card Button */}
        <button className={styles.addCardButton} onClick={handleOpenCardModal}>
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
