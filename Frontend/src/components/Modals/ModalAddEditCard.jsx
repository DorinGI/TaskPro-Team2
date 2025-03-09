import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import styles from './ModalAddEditCard.module.css';

const labelColors = ['blue', 'red', 'green', 'gray'];

const ModalAddCard = ({ open, onClose, onSave, cardToEdit }) => {
  const formik = useFormik({
    initialValues: {
      title: cardToEdit ? cardToEdit.title : '',
      description: cardToEdit ? cardToEdit.description : '',
      labelColor: cardToEdit ? cardToEdit.labelColor : labelColors[0],
      deadline: cardToEdit ? cardToEdit.deadline : '',
    },
    onSubmit: values => {
      if (!values.title.trim()) return;
      onSave({ ...values, id: cardToEdit ? cardToEdit._id : undefined });
      onClose();
    },
    validate: values => {
      const errors = {};
      if (!values.title.trim()) errors.title = 'Title is required';
      return errors;
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    if (cardToEdit) {
      formik.setValues({
        title: cardToEdit.title,
        description: cardToEdit.description,
        labelColor: cardToEdit.labelColor,
        deadline: cardToEdit.deadline,
      });
    }
  }, [cardToEdit]);

  return (
    <div className={styles.modal} style={{ display: open ? 'block' : 'none' }}>
      <h3>{cardToEdit ? 'Edit Card' : 'New Card'}</h3>
      <form onSubmit={formik.handleSubmit}>
        {/* Title */}
        <input
          name="title"
          placeholder="Card Title"
          value={formik.values.title}
          onChange={formik.handleChange}
          className={`${styles.inputField} ${
            formik.errors.title ? styles.inputFieldError : ''
          }`}
        />
        {formik.errors.title && (
          <div style={{ color: 'red' }}>{formik.errors.title}</div>
        )}

        {/* Description */}
        <textarea
          name="description"
          placeholder="Description"
          value={formik.values.description}
          onChange={formik.handleChange}
          className={styles.inputField}
        />

        {/* Label Color */}
        <div className={styles.labelGroup}>
          <h4>Label Color</h4>
          <div className={styles.radioGroup}>
            {labelColors.map(color => (
              <label key={color} className={styles.radioLabel}>
                <input
                  type="radio"
                  name="labelColor"
                  value={color}
                  checked={formik.values.labelColor === color}
                  onChange={formik.handleChange}
                  className={styles.hiddenRadio}
                />
                <div className={`${styles.labelCircle} ${styles[color]}`}></div>
              </label>
            ))}
          </div>
        </div>

        {/* Deadline */}
        <input
          type="date"
          name="deadline"
          value={formik.values.deadline}
          onChange={formik.handleChange}
          className={styles.inputField}
        />

        {/* Buttons */}
        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.saveButton}>
            {cardToEdit ? 'Update' : 'Create'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className={styles.closeButton}
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

ModalAddCard.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  cardToEdit: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    labelColor: PropTypes.string,
    deadline: PropTypes.string,
  }),
};

export default ModalAddCard;
