import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./ModalEditColumn.module.css";

const ModalEditColumn = ({ isOpen, onClose, column, onColumnUpdated }) => {
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (column) {
      setTitle(column.title);
    }
  }, [column]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Title cannot be empty!");
      return;
    }
    try {
      const response = await axios.put(`/api/columns/${column._id}`, { title });
      onColumnUpdated(response.data);
      onClose();
    } catch (error) {
      console.error("Error updating column:", error);
    }
  };

  if (!isOpen || !column) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Edit Column</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalEditColumn;
