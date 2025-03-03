import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getById,
  updateById,
  addNew,
  removeById,
} from "../controllers/column.js";

const router = express.Router();

router.get("/:columnId", authMiddleware, getById);
router.post("/:dashboardId", authMiddleware, addNew);
router.put("/:columnId", authMiddleware, updateById);
router.delete("/:columnId", authMiddleware, removeById);

export default router;
