import express from "express";
import {
  createColumn,
  updateColumn,
  deleteColumn,
} from "../controllers/columnController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Columns
 *   description: Operațiuni legate de coloane
 */

/**
 * @swagger
 * /api/columns:
 *   post:
 *     summary: Crează o coloană nouă
 *     tags: [Columns]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - boardId
 *             properties:
 *               title:
 *                 type: string
 *                 description: Titlul coloanei
 *               boardId:
 *                 type: string
 *                 description: ID-ul panoului căruia îi aparține coloana
 *     responses:
 *       201:
 *         description: Coloana a fost creată cu succes
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Column'
 *       500:
 *         description: Eroare la crearea coloanei
 */
router.post("/", createColumn);

/**
 * @swagger
 * /api/columns/{id}:
 *   put:
 *     summary: Actualizează o coloană existentă
 *     tags: [Columns]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID-ul coloanei de actualizat
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Noul titlu al coloanei
 *     responses:
 *       200:
 *         description: Coloana a fost actualizată cu succes
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Column'
 *       500:
 *         description: Eroare la actualizarea coloanei
 */
router.put("/:id", updateColumn);

/**
 * @swagger
 * /api/columns/{id}:
 *   delete:
 *     summary: Șterge o coloană existentă
 *     tags: [Columns]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID-ul coloanei de șters
 *     responses:
 *       204:
 *         description: Coloana a fost ștearsă cu succes
 *       500:
 *         description: Eroare la ștergerea coloanei
 */
router.delete("/:id", deleteColumn);

export default router;
