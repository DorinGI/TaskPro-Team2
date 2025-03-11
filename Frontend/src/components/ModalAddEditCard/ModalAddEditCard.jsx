import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { createCard } from "../../redux/cardSlice";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import styles from "./ModalAddEditCard.module.css";

const labelColors = ["blue", "red", "green", "gray"];

const ModalAddCard = ({ open, onClose, columnId, cardToEdit }) => {
  const dispatch = useDispatch();

  const handleSave = (values) => {
    if (!values.title.trim()) return;

    const cardData = {
      title: values.title,
      description: values.description,
      labelColor: values.labelColor,
      deadline: values.deadline,
      columnId: columnId,
    };

    dispatch(createCard(cardData));
    onClose(); // Închide modalul după trimitere
  };

  const formik = useFormik({
    initialValues: {
      title: cardToEdit ? cardToEdit.title : "",
      description: cardToEdit ? cardToEdit.description : "",
      labelColor: cardToEdit ? cardToEdit.labelColor : labelColors[0],
      deadline: cardToEdit ? cardToEdit.deadline : "",
    },
    onSubmit: handleSave,
    validate: (values) => {
      const errors = {};
      if (!values.title.trim()) errors.title = "Title is required";
      return errors;
    },
    enableReinitialize: true,
  });

  // Efect pentru gestionarea evenimentelor de click în afara modalului și apăsarea tastei ESC
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Verifică dacă click-ul este în afara modalului
      if (event.target.classList.contains(styles.modalOverlay)) {
        onClose();
      }
    };

    const handleEscapeKey = (event) => {
      // Verifică dacă tasta apăsată este ESC
      if (event.key === "Escape") {
        onClose();
      }
    };

    // Adaugă evenimentele dacă modalul este deschis
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscapeKey);
    }

    // Curăță evenimentele când componenta este demontată sau modalul este închis
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [open, onClose]); // Rulează efectul când `open` sau `onClose` se schimbă

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

  if (!open) return null; // Nu afișa modalul dacă nu este deschis

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        {/* Butonul de close în colțul din dreapta sus */}
        <div className={styles.closeButtonContainer}>
          <button className={styles.closeButton} onClick={onClose}>
            ✖
          </button>
        </div>

        <h3>{cardToEdit ? "Edit Card" : "New Card"}</h3>
        <form onSubmit={formik.handleSubmit}>
          {/* Title */}
          <input
            name="title"
            placeholder="Card Title"
            value={formik.values.title}
            onChange={formik.handleChange}
            className={`${styles.inputField} ${
              formik.errors.title ? styles.inputFieldError : ""
            }`}
          />
          {formik.errors.title && (
            <div style={{ color: "red" }}>{formik.errors.title}</div>
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
              {labelColors.map((color) => (
                <label key={color} className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="labelColor"
                    value={color}
                    checked={formik.values.labelColor === color}
                    onChange={formik.handleChange}
                    className={styles.hiddenRadio}
                  />
                  <div
                    className={`${styles.labelCircle} ${styles[color]}`}
                  ></div>
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

          {/* Butoanele de Save */}
          <div className={styles.buttonContainer}>
            <button type="submit" className={styles.saveButton}>
              {cardToEdit ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

ModalAddCard.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  columnId: PropTypes.string.isRequired,
  cardToEdit: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    labelColor: PropTypes.string,
    deadline: PropTypes.string,
  }),
};

export default ModalAddCard;
