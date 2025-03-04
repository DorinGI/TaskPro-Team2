import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import sprite from '../../assets/sprite.svg';
import styles from './ColumnTask.module.css';

// Redux action (Ensure this matches the export in boardsSlice.js)
import { deleteBoard } from '../../redux/boardsSlice'; // Ensure correct path and no duplicate imports

const ColumnTask = ({ item }) => {
  const dispatch = useDispatch();

  const [openColumnModal, setOpenColumnModal] = useState(false);
  const [openCardModal, setOpenCardModal] = useState(false);

  const handleOpenColumnModal = () => setOpenColumnModal(true);
  const handleCloseColumnModal = () => setOpenColumnModal(false);

  const handleOpenCardModal = () => setOpenCardModal(true);
  const handleCloseCardModal = () => setOpenCardModal(false);

  const filteredColumn =
    item.cards && item.cards.filter((card) => card.priority === 'show all');

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
                onClick={() => dispatch(deleteBoard(item._id))}
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
        <button
          className={styles.addCardButton}
          onClick={handleOpenCardModal}
        >
          <img
            className={styles.plusIcon}
            src={`${process.env.PUBLIC_URL}/assets/plus.svg`}
            alt="Add"
          />
          Add another card
        </button>
      </div>

      {/* Modals */}
      {/*<BasicModal
        open={openColumnModal}
        closeModal={handleCloseColumnModal}
      >
        <EditColumnModal
          title={item.title}
          columnId={item._id}
          closeModal={handleCloseColumnModal}
        />
      </BasicModal>

      <BasicModal
        open={openCardModal}
        closeModal={handleCloseCardModal}
      >
        <AddCardModal
          columnId={item._id}
          closeModal={handleCloseCardModal}
        />
      </BasicModal>*/}
    </div>
  );
};

export default ColumnTask;