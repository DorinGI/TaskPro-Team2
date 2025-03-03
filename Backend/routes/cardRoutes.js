import express from "express";
import {
  getById,
  updateById,
  addNew,
  removeById,
  setNewCardOwner,
} from "../controllers/card.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:cardId", authMiddleware, getById);
router.post("/:columnId", authMiddleware, addNew);
router.put("/:cardId", authMiddleware, updateById);
router.delete("/:cardId", authMiddleware, removeById);
router.patch("/:cardId/owner/:columnId", authMiddleware, setNewCardOwner);

export default router;
