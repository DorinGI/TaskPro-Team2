import React, { useState } from "react";
import styles from "./Sidebar.module.css";
import CreateBoardModal from "./CreateBoardModal";
import HelpModal from "./HelpModal";

const Sidebar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  const toggleModal = (modalName) => {
    if (modalName === "create") {
      setIsModalOpen(true);
    } else if (modalName === "help") {
      setIsHelpModalOpen(true);
    }
  };

  const closeModal = (modalName) => {
    if (modalName === "create") {
      setIsModalOpen(false);
    } else if (modalName === "help") {
      setIsHelpModalOpen(false);
    }
  };

  const handleCreateBoard = (values) => {
    console.log("Board created ", values);
    closeModal("create");
  };

  return (
    <aside className={styles.sidebar}>
      <h2>My Boards</h2>
      <button
        className={styles.createBoard}
        onClick={() => toggleModal("create")}
      >
        Create New Board
      </button>
      <ul>
        <li>Project Office</li>
        <li>Marketing Plan</li>
      </ul>
      <button className={styles.needHelp} onClick={() => toggleModal("help")}>
        Need Help?
      </button>
      <button className={styles.logout}>Log Out</button>

      <CreateBoardModal
        isOpen={isModalOpen}
        onClose={() => closeModal("create")}
        onCreate={handleCreateBoard}
      />
      <HelpModal isOpen={isHelpModalOpen} onClose={() => closeModal("help")} />
    </aside>
  );
};

export default Sidebar;
