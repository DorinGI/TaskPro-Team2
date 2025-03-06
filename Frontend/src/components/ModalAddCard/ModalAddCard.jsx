import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./ModalAddCard.module.css";

const ModalAddCard = ({ isOpen, onClose, columnId, onCardAdded }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [deadline, setDeadline] = useState(new Date());

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !deadline) {
      alert("All fields are required!");
      return;
    }
    try {
      const response = await axios.post("/api/cards", {
        title,
        description,
        priority,
        deadline,
        columnId,
      });
      onCardAdded(response.data);
      onClose();
    } catch (error) {
      console.error("Error adding card:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Add Card</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            required
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <DatePicker
            selected={deadline}
            onChange={(date) => setDeadline(date)}
            minDate={new Date()}
            dateFormat="yyyy-MM-dd"
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

export default ModalAddCard;
