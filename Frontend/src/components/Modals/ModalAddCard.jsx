import React from 'react';
import styles from './ModalAddCard.module.css';

const ModalAddCard = ({ open, onClose, columnId, onSave }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    const newCard = {
      title,
      description: '',
      priority: 'Low',
      deadline: '',
      columnId,
    };
    onSave(newCard);
    onClose();
  };

  return (
    <div className={styles.modal} style={{ display: open ? 'block' : 'none' }}>
      <h3>Add New Card</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Card Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.input}
        />
        <button type="submit" className={styles.saveButton}>
          Save
        </button>
        <button type="button" onClick={onClose} className={styles.closeButton}>
          Close
        </button>
      </form>
    </div>
  );
};

export default ModalAddCard;