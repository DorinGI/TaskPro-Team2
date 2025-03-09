import express from "express";

const router = express.Router();

/**
 * @swagger
 * /api/help:
 *   post:
 *     summary: Send a help request
 *     description: Receives help requests from users.
 *     tags:
 *       - Help
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "test@example.com"
 *               comment:
 *                 type: string
 *                 example: "I need help with my account."
 *     responses:
 *       200:
 *         description: Help request received successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Help request received successfully"
 *       400:
 *         description: Missing fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Email and comment are required"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

// Endpoint pentru a primi solicitări de ajutor
router.post("/help", async (req, res) => {
  try {
    const { email, comment } = req.body;

    if (!email || !comment) {
      return res.status(400).json({ message: "Email and comment are required" });
    }

    console.log("Help request received:", req.body);

    res.status(200).json({ message: "Help request received successfully" });
  } catch (error) {
    console.error("Error handling help request:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;