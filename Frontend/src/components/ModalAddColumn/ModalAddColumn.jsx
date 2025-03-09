import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import styles from './ModalAddColumn.module.css';

const ModalAddColumn = ({ isOpen, onClose, onColumnAdded }) => {
  const [title, setTitle] = useState('');
  const boardId = useSelector(state => state.boards.selectedBoardId);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Title cannot be empty!');
      return;
    }

    if (!boardId) {
      alert('No board selected!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/columns', {
        title,
        boardId,
      });
      onColumnAdded(response.data);
      onClose();
    } catch (error) {
      console.error('Error adding column:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Add Column</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
          <button type="submit">Add</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalAddColumn;
