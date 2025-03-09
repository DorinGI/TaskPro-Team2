import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveColumn, fetchColumns } from '../../redux/columnSlice';
import styles from './ModalAddEditColumn.module.css';

const ModalAddColumn = ({ isOpen, onClose, columnToEdit }) => {
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();
  const boardId = useSelector(state => state.boards.selectedBoardId);

  useEffect(() => {
    if (columnToEdit) {
      setTitle(columnToEdit.title);
    } else {
      setTitle('');
    }
  }, [columnToEdit]);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Title cannot be empty!');
      return;
    }
    if (!boardId && !columnToEdit) {
      alert('No board selected!');
      return;
    }

    try {
      await dispatch(
        saveColumn({
          title,
          boardId, // boardId se trimite doar la adăugare
          id: columnToEdit ? columnToEdit._id : undefined, // Dacă facem update, trimitim id-ul coloanei
        })
      );
      dispatch(fetchColumns(boardId));
      onClose();
    } catch (error) {
      console.error('Error saving column:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          ✖
        </button>
        <h2>{columnToEdit ? 'Edit Column' : 'Add Column'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
          <button type="submit">{columnToEdit ? 'Update' : 'Add'}</button>
        </form>
      </div>
    </div>
  );
};

export default ModalAddColumn;
