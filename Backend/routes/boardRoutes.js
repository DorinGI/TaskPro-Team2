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
router.get('/', authMiddleware, getAllBoards);

// Create a board
router.post('/', authMiddleware, createNewBoard);

// Update a board
router.put('/:id', authMiddleware, updateBoard);

// Delete a board
router.delete('/:id', authMiddleware, deleteBoard);

export default router;
