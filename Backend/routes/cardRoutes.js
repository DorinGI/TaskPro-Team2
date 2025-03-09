import express from 'express';
import {
  getCardsByColumn,
  createCard,
  updateCard,
  deleteCard,
} from '../controllers/cardController.js';

const router = express.Router();

router.get('columns/:columnId/cards', getCardsByColumn);
/**
 * @swagger
 * tags:
 *   name: Cards
 *   description: Operațiuni legate de carduri
 */

/**
 * @swagger
 * /api/cards:
 *   post:
 *     summary: Crează un card nou
 *     tags: [Cards]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - priority
 *               - deadline
 *               - columnId
 *             properties:
 *               title:
 *                 type: string
 *                 description: Titlul cardului
 *               description:
 *                 type: string
 *                 description: Descrierea cardului
 *               priority:
 *                 type: string
 *                 enum: [Low, Medium, High]
 *                 default: Low
 *                 description: Prioritatea cardului
 *               deadline:
 *                 type: string
 *                 format: date
 *                 description: >
 *                   Data limită a cardului (format: YYYY-MM-DD)
 *               columnId:
 *                 type: string
 *                 description: ID-ul coloanei căreia îi aparține cardul
 *     responses:
 *       201:
 *         description: Cardul a fost creat cu succes
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Card'
 *       500:
 *         description: Eroare la crearea cardului
 */
router.post('/', createCard);

/**
 * @swagger
 * /api/cards/{id}:
 *   put:
 *     summary: Actualizează un card existent
 *     tags: [Cards]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID-ul cardului de actualizat
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Noul titlu al cardului
 *               description:
 *                 type: string
 *                 description: Noua descriere a cardului
 *               priority:
 *                 type: string
 *                 enum: [Low, Medium, High]
 *                 description: Noua prioritate a cardului
 *               deadline:
 *                 type: string
 *                 format: date
 *                 description: >
 *                   Noua dată limită a cardului (format: YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Cardul a fost actualizat cu succes
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Card'
 *       500:
 *         description: Eroare la actualizarea cardului
 */
router.put('/:id', updateCard);

/**
 * @swagger
 * /api/cards/{id}:
 *   delete:
 *     summary: Șterge un card existent
 *     tags: [Cards]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID-ul cardului de șters
 *     responses:
 *       204:
 *         description: Cardul a fost șters cu succes
 *       500:
 *         description: Eroare la ștergerea cardului
 */
router.delete('/:id', deleteCard);

export default router;
