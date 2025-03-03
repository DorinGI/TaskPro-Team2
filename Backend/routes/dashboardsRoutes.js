import express from "express";
import {
  getAll,
  getById,
  addNew,
  updateById,
  removeById,
  updateCurrentDashboard,
} from "../controllers/dashboard.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getAll);
router.get("/:dashboardId", authMiddleware, getById);
router.post("/", authMiddleware, addNew);
router.put("/:dashboardId", authMiddleware, updateById);
router.patch("/:dashboardId", authMiddleware, updateCurrentDashboard);
router.delete("/:dashboardId", authMiddleware, removeById);

export default router;
