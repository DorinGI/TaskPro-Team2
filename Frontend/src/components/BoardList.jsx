import { useDispatch, useSelector } from 'react-redux';
import { fetchBoards, deleteBoard } from '../redux/boardsSlice';
import CreateBoardModal from './CreateBoardModal';

const BoardList = () => {
  const dispatch = useDispatch();
  const boards = useSelector(state => state.boards.boards);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [boardToEdit, setBoardToEdit] = React.useState(null);

  useEffect(() => {
    dispatch(fetchBoards());
  }, [dispatch]);

  const refreshBoards = () => {
    dispatch(fetchBoards());
  };

  const handleDelete = id => {
    dispatch(deleteBoard(id));
  };

  const handleEdit = board => {
    setBoardToEdit(board);
    setIsModalOpen(true);
  };
  console.log('Boards from store:', boards);
  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>Create New Board</button>

      <div>
        {boards.map(board => (
          <div key={board.id}>
            <h3>{board.title}</h3>
            <button onClick={() => handleEdit(board)}>Edit</button>
            <button onClick={() => handleDelete(board.id)}>Delete</button>
          </div>
        ))}
      </div>

      <CreateBoardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        boardToEdit={boardToEdit}
        onBoardSaved={refreshBoards}
      />
    </div>
  );
};

export default BoardList;
