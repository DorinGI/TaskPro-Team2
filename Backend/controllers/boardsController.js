import Board from '../models/Board.js';

// Get all boards
export const getAllBoards = async (req, res) => {
  try {
    const boards = await Board.find();

    res.status(201).json(boards);
  } catch (error) {
    res.status(500).json({ msg: 'Server Error' });
  }
};

// Create a board
export const createNewBoard = async (req, res) => {
  const newBoard = new Board(req.body);
  try {
    await newBoard.save();

    res.status(201).json(newBoard);
  } catch (error) {
    res.status(500).json({ msg: 'Server Error' });
  }
};

// Update a board
export const updateBoard = async (req, res) => {
  try {
    const updatedBoard = await Board.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(201).json(updatedBoard);
  } catch (error) {
    res.status(500).json({ msg: 'Server Error' });
  }
};
// Delete a board
export const deleteBoard = async (req, res) => {
  try {
    await Board.findByIdAndDelete(req.params.id);

    res.status(200).json({ msg: 'Board succesfully deleted' });
  } catch (error) {
    res.status(500).json({ msg: 'Server Error' });
  }
};
