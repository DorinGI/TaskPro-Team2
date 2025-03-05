import React from "react";
import PropTypes from "prop-types";
import styles from "./Modal.module.css";

const Modal = ({ title, isOpen, onClose, children, className }) => {
  if (!isOpen) return null;

  return (
    <div className={`${styles.overlay} ${className || ""}`}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        {title && <h2 className={styles.title}>{title}</h2>}
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Modal;
