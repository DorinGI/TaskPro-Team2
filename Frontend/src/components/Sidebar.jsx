import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBoards, saveBoard, deleteBoard } from '../redux/boardsSlice';
import styles from './Sidebar.module.css';
import CreateBoardModal from './CreateBoardModal';
import HelpModal from './HelpModal';

const Sidebar = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const { boards, loading } = useSelector(state => state.boards);
  const [selectedBoard, setSelectedBoard] = useState(null);

  useEffect(() => {
    dispatch(fetchBoards());
  }, [dispatch]);

  const toggleModal = modalName => {
    if (modalName === 'create') {
      setIsModalOpen(true);
    } else if (modalName === 'help') {
      setIsHelpModalOpen(true);
    }
  };

  const closeModal = modalName => {
    if (modalName === 'create') {
      setIsModalOpen(false);
    } else if (modalName === 'help') {
      setIsHelpModalOpen(false);
    }
  };

  //   const handleCreateBoard = values => {
  //     console.log('Board created ', values);
  //     closeModal('create');
  //   };

  return (
    <aside className={styles.sidebar}>
      <h2>My Boards</h2>
      <button onClick={() => setIsModalOpen(true)}>Create New Board</button>
      {loading && <p>Loading...</p>}
      <ul className={styles.boardList}>
        {boards.map(board => (
          <li key={board.id} className={styles.boardItem}>
            <span className={styles.boardIcon}>{board.icon}</span>
            <span className={styles.boardTitle}>{board.title}</span>
            <button
              className={styles.editButton}
              onClick={() => {
                setSelectedBoard(board);
                setIsModalOpen(true);
              }}
            >
              ✏️
            </button>
            <button
              className={styles.deleteButton}
              onClick={() => dispatch(deleteBoard(board.id))}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
      <button className={styles.needHelp} onClick={() => toggleModal('help')}>
        Need Help?
      </button>
      <button className={styles.logout}>Log Out</button>

      <CreateBoardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={values => dispatch(saveBoard(values))}
        board={selectedBoard}
      />
      <HelpModal isOpen={isHelpModalOpen} onClose={() => closeModal('help')} />
    </aside>
  );
};

export default Sidebar;
