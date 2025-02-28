import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management APIs
 */

/**
 * @swagger
 * /api/user/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user profile
 *       401:
 *         description: Unauthorized (invalid token)
 *       404:
 *         description: User not found
 */

// 📌 Obține datele utilizatorului
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user)
      return res.status(404).json({ message: 'Utilizator inexistent!' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Eroare la obținerea utilizatorului!' });
  }
});

/**
 * @swagger
 * /api/user/profile:
 *   put:
 *     summary: Update user profile
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "john@example.com"
 *               password:
 *                 type: string
 *                 example: "newpassword123"
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       400:
 *         description: Bad request (validation error)
 *       401:
 *         description: Unauthorized (invalid token)
 *       500:
 *         description: Server error
 */
// 📌 Actualizare profil utilizator
router.put('/profile', authMiddleware, async (req, res) => {
  try {
    let updates = req.body;
    if (updates.password) {
      updates.password = bcrypt.hashSync(updates.password, 10);
    }

    const user = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true,
    });
    if (!user)
      return res.status(404).json({ message: 'Utilizator inexistent!' });

    res.json({ message: 'Profil actualizat!', user });
  } catch (err) {
    res.status(500).json({ message: 'Eroare la actualizare!' });
  }
});

export default router;
