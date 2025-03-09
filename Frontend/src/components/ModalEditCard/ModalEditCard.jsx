// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import styles from "./ModalEditCard.module.css";

// const ModalEditCard = ({ isOpen, onClose, card, onCardUpdated }) => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [priority, setPriority] = useState("Low");
//   const [deadline, setDeadline] = useState(new Date());

//   useEffect(() => {
//     if (card) {
//       setTitle(card.title);
//       setDescription(card.description);
//       setPriority(card.priority);
//       setDeadline(new Date(card.deadline));
//     }
//   }, [card]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!title.trim() || !description.trim() || !deadline) {
//       alert("All fields are required!");
//       return;
//     }
//     try {
//       const response = await axios.put(`/api/cards/${card._id}`, {
//         title,
//         description,
//         priority,
//         deadline,
//       });
//       onCardUpdated(response.data);
//       onClose();
//     } catch (error) {
//       console.error("Error updating card:", error);
//     }
//   };

//   if (!isOpen || !card) return null;

//   return (
//     <div className={styles.modalOverlay}>
//       <div className={styles.modalContent}>
//         <h2>Edit Card</h2>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             placeholder="Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//           <textarea
//             placeholder="Description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             required
//           />
//           <select
//             value={priority}
//             onChange={(e) => setPriority(e.target.value)}
//             required
//           >
//             <option value="Low">Low</option>
//             <option value="Medium">Medium</option>
//             <option value="High">High</option>
//           </select>
//           <DatePicker
//             selected={deadline}
//             onChange={(date) => setDeadline(date)}
//             minDate={new Date()}
//             dateFormat="yyyy-MM-dd"
//             required
//           />
//           <button type="submit">Save</button>
//           <button type="button" onClick={onClose}>
//             Cancel
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ModalEditCard;
