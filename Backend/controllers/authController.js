import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Înregistrare utilizator
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      console.log("🚨 [SERVER] User already exists!"); // 🛠️ Debugging backend
      return res.status(400).json({ msg: "User already exists" });
    }

    let existingUserName = await User.findOne({ name });
    if (existingUserName) {
      console.log("🚨 [SERVER] Username already taken!"); // 🛠️ Debugging backend
      return res.status(400).json({ msg: "Username is already taken" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({ name, email, password: hashedPassword });
    await user.save();

    console.log("✅ [SERVER] User successfully registered!"); // 🛠️ Debugging backend
    res.status(201).json({ msg: "User successfully registered" });
  } catch (error) {
    console.error("❌ [SERVER ERROR]:", error);
    res.status(500).json({ msg: "Server Error" });
  }
};

// Autentificare utilizator
export const loginUser = async (req, res) => {
  console.log("🔑 [LOGIN REQUEST BODY]:", req.body); // 🔍 Debugging

  const { email, password } = req.body;

  // 🔹 Validăm datele de login
  if (!email || !password) {
    return res.status(400).json({ msg: 'Email and password are required' });
  }

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

    res.json({ token, userId: user._id });
  } catch (error) {
    console.error('❌ [LOGIN ERROR]:', error); // 🔍 Debugging
    res.status(500).json({ msg: 'Server error. Please try again later.' });
  }
};

// Deconectare utilizator
export const logoutUser = (req, res) => {
  console.log("🚪 [LOGOUT] User logged out"); // 🔍 Debugging
  res.json({ msg: 'User disconnected' });
};
