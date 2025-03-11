import Board from '../models/Board.js';
import User from '../models/User.js';
import mongoose from 'mongoose';

// Get all boards
export const getAllBoards = async (req, res) => {
  try {
    const boards = await Board.find({
      user: new mongoose.Types.ObjectId(req.user.userId),
    });

    res.status(200).json(boards);
  } catch (error) {
    res.status(500).json({ msg: 'Server Error' });
  }
};

// Create a board
export const createNewBoard = async (req, res) => {
  try {
    const { userId, title, icon, background } = req.body;

    // Creează un board nou
    const newBoard = new Board({
      title,
      icon,
      background,
      user: new mongoose.Types.ObjectId(userId), // Salvăm ca ObjectId
    });
    await newBoard.save();
    res.status(201).json(newBoard);
  } catch (error) {
    res.status(500).json({ msg: 'Server Error' });
  }
};

// Update a board
export const updateBoard = async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);

    if (!board || board.user.toString() !== req.user.userId) {
      return res.status(403).json({ msg: 'Not authorized' });
    }

    const updatedBoard = await Board.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedBoard);
  } catch (error) {
    res.status(500).json({ msg: 'Server Error' });
  }
};
// Delete a board
export const deleteBoard = async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);

    if (!board || board.user.toString() !== req.user.userId) {
      return res.status(403).json({ msg: 'Not authorized' });
    }

    await Board.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: 'Board successfully deleted' });
  } catch (error) {
    res.status(500).json({ msg: 'Server Error' });
  }
};
