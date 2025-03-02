import { useDispatch, useSelector } from "react-redux";
import { deleteBoard } from "../redux/boardsSlice";
import CreateBoardModal from "./CreateBoardModal";

const BoardList = () => {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [boardToEdit, setBoardToEdit] = React.useState(null);

  const handleDelete = (id) => {
    dispatch(deleteBoard(id)); // Șterge board-ul din store
  };

  const handleEdit = (board) => {
    setBoardToEdit(board);
    setIsModalOpen(true);
  };

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>Create New Board</button>

      <div>
        {boards.map((board) => (
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
      />
    </div>
  );
};

export default BoardList;
