import express from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
} from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @swagger
 * tags:
 *   name: Register - Login - Logout
 *   description: Register - Login - Logout APIs
 */

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register user
 *     tags: [Register]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User succesfully registered
 *       201:
 *         description: Unauthorized (invalid token)
 *       500:
 *         description: Server Error
 */
// Get the current user's data
router.post('/register', registerUser);
/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Login user
 *     tags: [Login]
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
router.post('/login', loginUser);
/**
 * @swagger
 * /api/logout:
 *   post:
 *     summary: Logout user
 *     tags: [Logout]
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
router.post('/logout', logoutUser);

export default router;
