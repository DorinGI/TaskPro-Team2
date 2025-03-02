import express from 'express';
import Board from '../models/Board.js';
import {
  getAllBoards,
  createNewBoard,
  updateBoard,
  deleteBoard,
} from '../controllers/boardsController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Get all boards
router.get('/', getAllBoards);

// Create a board
router.post('/', createNewBoard);

// Update a board
router.put('/:id', updateBoard);

// Delete a board
router.delete('/:id', deleteBoard);

export default router;
