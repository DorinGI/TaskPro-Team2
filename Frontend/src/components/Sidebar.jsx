import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchBoards,
  saveBoard,
  deleteBoard,
  setSelectedBoardId,
  resetSelectedBoardId,
} from '../redux/boardsSlice';
import { logout } from '../redux/auth/authSlice';
import { Icon } from '../components/Icon/Icon';
import sprite from '../assets/sprite.svg';
import styles from './Sidebar.module.css';
import CreateBoardModal from './CreateBoardModal';
import HelpModal from './HelpModal';

const Sidebar = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const { boards, loading, selectedBoardId } = useSelector(
    state => state.boards
  );
  const [selectedBoard, setSelectedBoard] = useState(null);

  useEffect(() => {
    dispatch(fetchBoards());
  }, [dispatch]);

  useEffect(() => {
    if (selectedBoardId) {
      const board = boards.find(board => board._id === selectedBoardId);
      setSelectedBoard(board);
    }
  }, [selectedBoardId, boards]);

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

  const handleLogout = async () => {
    await dispatch(logout());
  };

  const handleBoardClick = boardId => {
    dispatch(setSelectedBoardId(boardId));
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoCont}>
        <Icon id="logo" size={32} />
        <p className={styles.logoName}>Task Pro</p>
      </div>

      <h2>My Boards</h2>
      <div className={styles.boardHeader}>
        <span className={styles.createBoardText}>Create New Board</span>
        <button
          className={styles.plusButton}
          onClick={() => setIsModalOpen(true)}
        >
          +
        </button>
      </div>
      {loading && <p>Loading...</p>}
      <ul className={styles.boardList}>
        {boards.map(board => (
          <li
            key={board._id}
            className={`${styles.boardItem} ${
              selectedBoardId === board._id ? styles.selectedBoard : ''
            }`}
            onClick={() => handleBoardClick(board._id)}
          >
            <svg className={styles.boardIcon} aria-hidden="true">
              <use xlinkHref={`${sprite}#${board.icon}`} />
            </svg>
            <span className={styles.boardTitle}>{board.title}</span>
            <button
              className={styles.editButton}
              onClick={() => {
                dispatch(setSelectedBoardId(board._id));
                setIsModalOpen(true);
              }}
            >
              <svg className={styles.boardButtonIcon} aria-hidden="true">
                <use xlinkHref={`${sprite}#icon-pencil`} />
              </svg>
            </button>
            <button
              className={styles.deleteButton}
              onClick={() => dispatch(deleteBoard(board._id))}
            >
              <svg className={styles.boardButtonIcon} aria-hidden="true">
                <use xlinkHref={`${sprite}#icon-trash`} />
              </svg>
            </button>
          </li>
        ))}
      </ul>
      <button className={styles.needHelp} onClick={() => toggleModal('help')}>
        Need Help?
      </button>
      <button className={styles.logout} onClick={handleLogout}>
        Log Out
      </button>

      <CreateBoardModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          dispatch(resetSelectedBoardId());
        }}
        onCreate={values => dispatch(saveBoard(values))}
        boardToEdit={selectedBoard}
      />
      <HelpModal isOpen={isHelpModalOpen} onClose={() => closeModal('help')} />
    </aside>
  );
};

export default Sidebar;
