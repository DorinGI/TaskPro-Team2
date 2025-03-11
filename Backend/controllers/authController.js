import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Înregistrare utilizator
export const registerUser = async (req, res) => {
  console.log("📌 Date primite la backend:", req.body);
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({ name, email, password: hashedPassword });
    await user.save();

    // 🔹 Generăm token-ul pentru autentificare imediată
    const token = jwt.sign(
      { userId: user._id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    console.log("📌 Token generat:", token);

    res.status(201).json({
      msg: "User successfully registered",
      token,
      userId: user._id,
    });
  } catch (error) {
    console.error("❌ Server error:", error);
    res.status(500).json({ msg: "Server Error" });
  }
};

// Autentificare utilizator
export const loginUser = async (req, res) => {
  console.log("📌 Date primite pentru login:", req.body);
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'False user data' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Wrong password' });

    const token = jwt.sign(
      { userId: user._id, name: user.name },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      }
    );

    res.json({
      token,
      userId: user._id,
      user: { _id: user._id, email: user.email, name: user.name },
    });
  } catch (error) {
    console.error("❌ Server error:", error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Deconectare utilizator
export const logoutUser = (req, res) => {
  res.json({ msg: 'User disconnected' });
};
